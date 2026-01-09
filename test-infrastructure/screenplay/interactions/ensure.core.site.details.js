import { expect } from 'chai'
import { formatDateObjectToDisplay } from '../../helpers/date-formatter.js'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureCoreSiteDetails extends Task {
  static areCorrect() {
    return new EnsureCoreSiteDetails()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!siteDetails) {
      expect.fail("Unable to determine site details from actor's memory")
    }

    if (siteDetails?.coordinatesEntryMethod === 'file-upload') {
      await this.verifyFileUploadSiteDetails(browseTheWeb, actor)
    } else {
      await this.verifyManualEntrySiteDetails(browseTheWeb, actor)
    }
  }

  async verifyFileUploadSiteDetails(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails
    const expectedFileType = siteDetails?.fileType

    this.validateFileType(expectedFileType, siteDetails)

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.fileTypeValue,
      expectedFileType
    )

    await this.verifyUploadedFileName(browseTheWeb)
    await this.verifyExtractedCoordinates(browseTheWeb, actor)
    await this.verifyMultiSiteIncompleteFields(browseTheWeb, siteDetails)
  }

  async verifyUploadedFileName(browseTheWeb) {
    const fileUploadedElement = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.fileUploadedValue
    )
    const fileName = await fileUploadedElement.getText()

    if (!fileName || fileName.trim() === '') {
      expect.fail('Uploaded file name should be displayed but was empty')
    }
  }

  async verifyManualEntrySiteDetails(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    await browseTheWeb.isDisplayed(ReviewSiteDetailsPage.coordinateSystemValue)
    await this.verifyCoordinateSystem(browseTheWeb, siteDetails)
    await this.verifyCoordinateDisplayBySiteType(browseTheWeb, siteDetails)
  }

  async verifyCoordinateSystem(browseTheWeb, siteDetails) {
    const coordinateSystem = siteDetails.sites?.[0]?.coordinateSystem
    if (!coordinateSystem) {
      return
    }

    const expectedDisplayText =
      this._mapCoordinateSystemToDisplayText(coordinateSystem)
    const actualText = await browseTheWeb.getText(
      ReviewSiteDetailsPage.coordinateSystemValue
    )

    const normalizedActual = actualText.trim().replaceAll('\n', ' ')
    if (normalizedActual !== expectedDisplayText) {
      expect.fail(
        `Coordinate system mismatch on Review Site Details page. Expected: "${expectedDisplayText}", but found: "${actualText}"`
      )
    }
  }

  _mapCoordinateSystemToDisplayText(coordinateSystem) {
    const mappings = {
      WGS84: 'WGS84 (World Geodetic System 1984) Latitude and longitude',
      OSGB36: 'British National Grid (OSGB36) Eastings and Northings'
    }
    return mappings[coordinateSystem] || coordinateSystem
  }

  async verifyCoordinateDisplayBySiteType(browseTheWeb, siteDetails) {
    const firstSiteType = siteDetails.sites[0].siteType

    if (firstSiteType === 'circle') {
      await this.verifyCircleSiteDisplay(browseTheWeb)
      return
    }

    if (firstSiteType === 'boundary') {
      await this.verifyBoundarySiteDisplay(browseTheWeb, siteDetails)
      return
    }

    expect.fail(`Unexpected site type: ${firstSiteType}`)
  }

  async verifyCircleSiteDisplay(browseTheWeb) {
    await browseTheWeb.isDisplayed(
      ReviewSiteDetailsPage.coordinatesAtCentreOfSiteValue
    )
    await browseTheWeb.isDisplayed(ReviewSiteDetailsPage.widthValue)
  }

  async verifyBoundarySiteDisplay(browseTheWeb, siteDetails) {
    const coordinates = this.getCoordinatesFromSiteDetails(siteDetails)

    await browseTheWeb.isDisplayed(ReviewSiteDetailsPage.startAndEndPointsValue)
    await this.verifyStartAndEndPointsContent(browseTheWeb, coordinates)

    for (let i = 1; i < coordinates.length; i++) {
      const pointNumber = i + 1
      const coordinate = coordinates[i]

      await browseTheWeb.isDisplayed(
        ReviewSiteDetailsPage.getPolygonPointValue(pointNumber)
      )

      await this.verifyCoordinatePointContent(
        browseTheWeb,
        pointNumber,
        coordinate
      )
    }
  }

  async verifyStartAndEndPointsContent(browseTheWeb, coordinates) {
    if (coordinates.length === 0) return

    const startPoint = coordinates[0]
    const expectedStartText = this.formatCoordinateForDisplay(startPoint)

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.startAndEndPointsValue,
      expectedStartText
    )
  }

  async verifyCoordinatePointContent(browseTheWeb, pointNumber, coordinate) {
    const expectedText = this.formatCoordinateForDisplay(coordinate)

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.getPolygonPointValue(pointNumber),
      expectedText
    )
  }

  formatCoordinateForDisplay(coordinate) {
    if (coordinate.latitude && coordinate.longitude) {
      return `${coordinate.latitude}, ${coordinate.longitude}`
    } else if (coordinate.eastings && coordinate.northings) {
      return `${coordinate.eastings}, ${coordinate.northings}`
    }
    throw new Error(`Invalid coordinate format: ${JSON.stringify(coordinate)}`)
  }

  async verifyExtractedCoordinates(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const expectedCoordinates = exemption?.siteDetails?.expectedCoordinates
    const expectedSites = exemption?.siteDetails?.expectedSites

    if (expectedSites) {
      await this.verifyMultiSiteExtractedCoordinates(
        browseTheWeb,
        expectedSites
      )
      return
    }

    this.validateExpectedCoordinates(expectedCoordinates)

    const actualGeoJSON = await this.getActualCoordinatesFromDOM(browseTheWeb)
    const actualCoordinates = this.extractCoordinatesFromGeoJSON(actualGeoJSON)

    expect(actualCoordinates).to.deep.equal(expectedCoordinates)
  }

  async verifyMultiSiteExtractedCoordinates(browseTheWeb, expectedSites) {
    for (let i = 0; i < expectedSites.length; i++) {
      const expectedSite = expectedSites[i]
      const siteIndex = i + 1
      const geoJSONVarName = `geoJSON${siteIndex}`

      const actualGeoJSON = await browseTheWeb.browser.execute((varName) => {
        return typeof window[varName] !== 'undefined' ? window[varName] : null
      }, geoJSONVarName)

      if (!actualGeoJSON) {
        expect.fail(
          `No ${geoJSONVarName} found for site "${expectedSite.siteName}"`
        )
      }

      const actualCoordinates =
        this.extractCoordinatesFromGeoJSON(actualGeoJSON)
      this.assertCoordinatesWithinTolerance(
        actualCoordinates,
        expectedSite.extractedCoordinates,
        `Coordinates mismatch for site "${expectedSite.siteName}" (${geoJSONVarName})`
      )
    }
  }

  async verifyMultiSiteIncompleteFields(browseTheWeb, siteDetails) {
    if (!siteDetails?.multipleSitesEnabled || !siteDetails?.expectedSites) {
      return
    }

    const hasDifferentDates = siteDetails.sameActivityDates === false
    const hasDifferentDescriptions =
      siteDetails.sameActivityDescription === false

    const numberOfSites = siteDetails.expectedSites.length

    for (let i = 0; i < numberOfSites; i++) {
      const siteNumber = i + 1
      const expectedSite = siteDetails.sites[i]

      await this.verifySiteFields(browseTheWeb, {
        siteNumber,
        expectedSite,
        hasDifferentDates,
        hasDifferentDescriptions
      })
    }
  }

  async verifySiteFields(browseTheWeb, options) {
    const {
      siteNumber,
      expectedSite,
      hasDifferentDates,
      hasDifferentDescriptions
    } = options

    const siteNameElement = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteName(siteNumber)
    )
    const actualSiteName = await siteNameElement.getText()
    expect(actualSiteName.trim()).to.equal(
      expectedSite.siteName,
      `Site ${siteNumber} name mismatch`
    )

    if (hasDifferentDates) {
      await this.verifyActivityDates(browseTheWeb, siteNumber, expectedSite)
    }

    if (hasDifferentDescriptions) {
      await this.verifyActivityDescription(
        browseTheWeb,
        siteNumber,
        expectedSite
      )
    }
  }

  async verifyActivityDates(browseTheWeb, siteNumber, expectedSite) {
    const datesElement = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteActivityDates(siteNumber)
    )
    const actualDatesText = await datesElement.getText()
    const expectedDatesText = this.formatActivityDatesForDisplay(
      expectedSite.activityDates
    )
    expect(actualDatesText.trim()).to.equal(
      expectedDatesText,
      `Site ${siteNumber} activity dates mismatch`
    )
  }

  async verifyActivityDescription(browseTheWeb, siteNumber, expectedSite) {
    const descriptionElement = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteActivityDescription(siteNumber)
    )
    const actualDescription = await descriptionElement.getText()
    expect(actualDescription.trim()).to.equal(
      expectedSite.activityDescription,
      `Site ${siteNumber} activity description mismatch`
    )
  }

  formatActivityDatesForDisplay(activityDates) {
    if (!this.hasValidActivityDatesStructure(activityDates)) {
      return ''
    }

    const formattedStart = formatDateObjectToDisplay(activityDates.startDate)
    const formattedEnd = formatDateObjectToDisplay(activityDates.endDate)

    return `${formattedStart} to ${formattedEnd}`
  }

  hasValidActivityDatesStructure(activityDates) {
    if (!activityDates) {
      return false
    }

    if (!activityDates.startDate || !activityDates.endDate) {
      return false
    }

    return (
      this.hasValidDateObject(activityDates.startDate) &&
      this.hasValidDateObject(activityDates.endDate)
    )
  }

  hasValidDateObject(dateObject) {
    return dateObject.day && dateObject.month && dateObject.year
  }

  validateFileType(expectedFileType, siteDetails) {
    if (!expectedFileType) {
      expect.fail(
        `Unable to determine expected file type from actor's memory. Site details: ${JSON.stringify(siteDetails)}`
      )
    }
  }

  validateExpectedCoordinates(expectedCoordinates) {
    if (!expectedCoordinates) {
      expect.fail(
        'No expected coordinates found in actor memory for verification'
      )
    }
  }

  async getActualCoordinatesFromDOM(browseTheWeb) {
    try {
      const geoJSON = await browseTheWeb.browser.execute(() => {
        // eslint-disable-next-line no-undef
        return typeof geoJSON1 !== 'undefined' ? geoJSON1 : null
      })

      if (geoJSON) {
        return geoJSON
      }
    } catch (error) {
      expect.fail('No coordinates were extracted from the file')
    }

    expect.fail('No coordinate data found in geoJSON1 variable')
  }

  extractCoordinatesFromGeoJSON(geoJSON) {
    this.validateGeoJSONStructure(geoJSON)

    if (geoJSON.features.length === 0) {
      expect.fail('Invalid GeoJSON structure: no features found')
    }

    const feature = geoJSON.features[0]
    if (!feature.geometry || !feature.geometry.coordinates) {
      expect.fail('Invalid GeoJSON structure: missing geometry coordinates')
    }

    const coordinates = feature.geometry.coordinates
    const geometryType = feature.geometry.type

    switch (geometryType) {
      case 'LineString':
        return coordinates
      case 'Polygon':
        return coordinates[0]
      case 'Point':
        return [coordinates]
      default:
        expect.fail(`Unsupported geometry type: ${geometryType}`)
    }
  }

  getCoordinatesFromSiteDetails(siteDetails) {
    return (
      siteDetails?.polygonData?.coordinates || siteDetails?.coordinates || []
    )
  }

  validateGeoJSONStructure(geoJSON) {
    if (!geoJSON) {
      expect.fail('Invalid GeoJSON structure: missing geoJSON')
    }
    if (!geoJSON.features) {
      expect.fail('Invalid GeoJSON structure: missing features')
    }
    if (!Array.isArray(geoJSON.features)) {
      expect.fail('Invalid GeoJSON structure: features is not an array')
    }
  }

  assertCoordinatesWithinTolerance(actual, expected, message) {
    if (actual.length !== expected.length) {
      expect.fail(
        `${message}: coordinate count mismatch (actual: ${actual.length}, expected: ${expected.length})`
      )
    }

    for (let i = 0; i < actual.length; i++) {
      const actualCoord = actual[i]
      const expectedCoord = expected[i]

      if (actualCoord.length !== expectedCoord.length) {
        expect.fail(
          `${message}: coordinate ${i} dimension mismatch (actual: ${actualCoord.length}, expected: ${expectedCoord.length})`
        )
      }

      for (let j = 0; j < actualCoord.length; j++) {
        const diff = Math.abs(actualCoord[j] - expectedCoord[j])
        // Use relative tolerance for floating point comparison
        const tolerance =
          Math.max(Math.abs(actualCoord[j]), Math.abs(expectedCoord[j])) *
          Number.EPSILON *
          10
        if (diff > tolerance) {
          expect.fail(
            `${message}: coordinate[${i}][${j}] differs by ${diff} (actual: ${actualCoord[j]}, expected: ${expectedCoord[j]})`
          )
        }
      }
    }
  }
}

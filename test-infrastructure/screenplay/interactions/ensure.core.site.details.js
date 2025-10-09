import { expect } from 'chai'
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
    await this.verifyCoordinateDisplayBySiteType(browseTheWeb, siteDetails)
  }

  async verifyCoordinateDisplayBySiteType(browseTheWeb, siteDetails) {
    const firstSiteType = siteDetails.sites[0].siteType

    if (firstSiteType === 'circle') {
      await this.verifyCircleSiteDisplay(browseTheWeb)
      return
    }

    if (firstSiteType === 'triangle') {
      await this.verifyTriangleSiteDisplay(browseTheWeb, siteDetails)
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

  async verifyTriangleSiteDisplay(browseTheWeb, siteDetails) {
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

    // Handle multi-site verification
    if (expectedSites) {
      await this.verifyMultiSiteExtractedCoordinates(
        browseTheWeb,
        expectedSites
      )
      return
    }

    // Handle single-site verification
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
      expect(actualCoordinates).to.deep.equal(
        expectedSite.extractedCoordinates,
        `Coordinates mismatch for site "${expectedSite.siteName}" (${geoJSONVarName})`
      )
    }
  }

  async verifyMultiSiteIncompleteFields(browseTheWeb, siteDetails) {
    // Only verify "Incomplete" fields for multi-site file uploads with different dates/descriptions
    if (!siteDetails?.multipleSitesEnabled || !siteDetails?.expectedSites) {
      return
    }

    const hasDifferentDates = siteDetails.sameActivityDates === false
    const hasDifferentDescriptions =
      siteDetails.sameActivityDescription === false

    // If dates and descriptions are the same, EnsureActivityDetailsCard will verify them
    if (!hasDifferentDates && !hasDifferentDescriptions) {
      return
    }

    // Verify incomplete fields on individual sites (only when dates/descriptions are different)
    const numberOfSites = siteDetails.expectedSites.length

    for (let i = 1; i <= numberOfSites; i++) {
      await this.verifySiteIncompleteFields(
        browseTheWeb,
        i,
        hasDifferentDates,
        hasDifferentDescriptions
      )
    }
  }

  async verifySiteIncompleteFields(
    browseTheWeb,
    siteNumber,
    hasDifferentDates,
    hasDifferentDescriptions
  ) {
    // Verify Site name is Incomplete (always incomplete for file uploads until ML-361)
    const siteNameElement = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteName(siteNumber)
    )
    const siteNameText = await siteNameElement.getText()
    expect(siteNameText.trim()).to.equal(
      'Incomplete',
      `Site ${siteNumber} name should be "Incomplete"`
    )

    // Verify Activity dates is Incomplete (if different dates were selected)
    if (hasDifferentDates) {
      const datesElement = await browseTheWeb.getElement(
        ReviewSiteDetailsPage.getSiteActivityDates(siteNumber)
      )
      const datesText = await datesElement.getText()
      expect(datesText.trim()).to.equal(
        'Incomplete',
        `Site ${siteNumber} activity dates should be "Incomplete"`
      )
    }

    // Verify Activity description is Incomplete (if different descriptions were selected)
    if (hasDifferentDescriptions) {
      const descriptionElement = await browseTheWeb.getElement(
        ReviewSiteDetailsPage.getSiteActivityDescription(siteNumber)
      )
      const descriptionText = await descriptionElement.getText()
      expect(descriptionText.trim()).to.equal(
        'Incomplete',
        `Site ${siteNumber} activity description should be "Incomplete"`
      )
    }
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
        // Polygon coordinates are [outerRing, hole1, hole2, ...]
        // We only need the outer ring
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
}

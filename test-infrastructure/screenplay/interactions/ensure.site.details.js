import { expect } from 'chai'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureSiteDetails extends Task {
  static areCorrect() {
    return new EnsureSiteDetails()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await this.verifyMethodOfProvidingSiteLocationDisplayed(browseTheWeb, actor)
    await this.verifySiteDetailsAreDisplayed(browseTheWeb, actor)
  }

  async verifyMethodOfProvidingSiteLocationDisplayed(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails
    const expectedMethod = this.determineExpectedMethod(siteDetails)

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.methodOfProvidingSiteLocationValue,
      expectedMethod
    )
  }

  async verifySiteDetailsAreDisplayed(browseTheWeb, actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

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

    if (!siteDetails) {
      expect.fail(
        "Unable to determine expected coordinate entry details from actor's memory"
      )
    }

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

    this.validateExpectedCoordinates(expectedCoordinates)

    const actualGeoJSON = await this.getActualCoordinatesFromDOM(browseTheWeb)
    const actualCoordinates = this.extractCoordinatesFromGeoJSON(actualGeoJSON)

    expect(actualCoordinates).to.deep.equal(expectedCoordinates)
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

  determineExpectedMethod(siteDetails) {
    if (siteDetails?.coordinatesEntryMethod === 'file-upload') {
      return 'Upload a file with the coordinates of the site'
    }

    const firstSiteType = siteDetails?.sites?.[0]?.siteType

    if (firstSiteType === 'circle') {
      return 'Manually enter one set of coordinates and a width to create a circular site'
    }

    if (firstSiteType === 'triangle') {
      return 'Manually enter multiple sets of coordinates to mark the boundary of the site'
    }

    expect.fail(
      `Unable to determine expected method from actor's memory. Site details: ${JSON.stringify(siteDetails)}`
    )
  }

  async getActualCoordinatesFromDOM(browseTheWeb) {
    try {
      const siteDetailsElement = await browseTheWeb.getElement(
        ReviewSiteDetailsPage.siteDetailsDataScript
      )
      const siteDetailsHTML = await siteDetailsElement.getHTML(false)

      if (siteDetailsHTML && siteDetailsHTML.trim()) {
        const siteDetailsData = JSON.parse(siteDetailsHTML.trim())
        if (siteDetailsData?.geoJSON) {
          return siteDetailsData.geoJSON
        }
      }
    } catch (error) {
      expect.fail('No coordinates were extracted from the file')
    }

    expect.fail('No coordinate data found in #site-details-data script element')
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
        return coordinates
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

import { expect } from 'chai'
import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import ReviewSiteDetailsPage from '~/test-infrastructure/pages/review.site.details.page.js'
import Task from './task.js'

export default class NotificationSummaryBase extends Task {
  async _validateProjectDetails(browseTheWeb, exemptionData) {
    if (exemptionData.projectName) {
      await browseTheWeb.expectElementToHaveExactText(
        CheckYourAnswersPage.locators.projectDetails.projectNameValue,
        exemptionData.projectName
      )
    }
  }

  async _validateActivityDates(browseTheWeb, exemptionData) {
    if (exemptionData.activityDates) {
      await this._validateDateField(
        browseTheWeb,
        exemptionData.activityDates,
        'startDate'
      )
      await this._validateDateField(
        browseTheWeb,
        exemptionData.activityDates,
        'endDate'
      )
    }
  }

  async _validateDateField(browseTheWeb, activityDates, dateField) {
    if (activityDates[dateField]) {
      const locator =
        CheckYourAnswersPage.locators.activityDates[`${dateField}Value`]
      const expectedDate = this._formatDateObjectToDisplay(
        activityDates[dateField]
      )
      await browseTheWeb.expectElementToHaveExactText(locator, expectedDate)
    }
  }

  _formatDateObjectToDisplay(dateObject) {
    if (this._isValidDateObject(dateObject)) {
      const day = parseInt(dateObject.day, 10)
      const month = parseInt(dateObject.month, 10)
      const year = parseInt(dateObject.year, 10)

      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      return `${day} ${monthNames[month - 1]} ${year}`
    }
    return String(dateObject)
  }

  _isValidDateObject(dateObject) {
    return dateObject && dateObject.day && dateObject.month && dateObject.year
  }

  async _validateActivityDetails(browseTheWeb, exemptionData) {
    if (exemptionData.activityDetails?.description) {
      await browseTheWeb.expectElementToContainText(
        CheckYourAnswersPage.locators.activityDetails.activityDescriptionValue,
        exemptionData.activityDetails.description
      )
    }
  }

  async _validateSiteDetails(browseTheWeb, exemptionData) {
    if (exemptionData.siteDetails) {
      await this._validateMethodOfProvidingSiteLocation(
        browseTheWeb,
        exemptionData.siteDetails
      )

      if (this._isFileUpload(exemptionData.siteDetails)) {
        await this._validateFileUploadDetails(
          browseTheWeb,
          exemptionData.siteDetails
        )
      } else {
        await this._validateCoordinateSystem(
          browseTheWeb,
          exemptionData.siteDetails
        )
        await this.verifyCoordinateDisplayBySiteType(
          browseTheWeb,
          exemptionData.siteDetails
        )
      }
    }
  }

  async verifyCoordinateDisplayBySiteType(browseTheWeb, siteDetails) {
    if (siteDetails.siteType === 'circle') {
      await this.verifyCircleSiteDisplay(browseTheWeb, siteDetails)
      return
    }

    if (siteDetails.siteType === 'triangle') {
      await this.verifyTriangleSiteDisplay(browseTheWeb, siteDetails)
      return
    }

    expect.fail(`Unexpected site type: ${siteDetails.siteType}`)
  }

  async verifyCircleSiteDisplay(browseTheWeb, siteDetails) {
    await this._validateCoordinates(browseTheWeb, siteDetails)
    await this._validateCircularSiteWidth(browseTheWeb, siteDetails)
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

  async _validateMethodOfProvidingSiteLocation(browseTheWeb, siteDetails) {
    let expectedText

    if (this._isFileUpload(siteDetails)) {
      expectedText = 'Upload a file with the coordinates of the site'
    } else if (siteDetails.siteType === 'triangle') {
      expectedText =
        'Manually enter multiple sets of coordinates to mark the boundary of the site'
    } else {
      expectedText =
        'Manually enter one set of coordinates and a width to create a circular site'
    }

    await browseTheWeb.expectElementToContainText(
      CheckYourAnswersPage.locators.siteDetails
        .methodOfProvidingSiteLocationValue,
      expectedText
    )
  }

  async _validateCoordinateSystem(browseTheWeb, siteDetails) {
    if (siteDetails.coordinateSystem) {
      const expectedDisplayText = this._mapCoordinateSystemToDisplayText(
        siteDetails.coordinateSystem
      )

      const actualText = await browseTheWeb.getText(
        CheckYourAnswersPage.locators.siteDetails.coordinateSystemValue
      )

      if (actualText.trim().replaceAll('\n', ' ') !== expectedDisplayText) {
        expect.fail(
          `Coordinate system mismatch. Expected: "${expectedDisplayText}", but found: "${actualText}"`
        )
      }
    }
  }

  _mapCoordinateSystemToDisplayText(coordinateSystem) {
    const mappings = {
      WGS84: 'WGS84 (World Geodetic System 1984) Latitude and longitude',
      OSGB36: 'OSGB36 (National Grid) Eastings and Northings'
    }
    return mappings[coordinateSystem] || coordinateSystem
  }

  async _validateCoordinates(browseTheWeb, siteDetails) {
    if (siteDetails.circleData) {
      const { circleData, coordinateSystem } = siteDetails

      const expectedCoordinates = this._formatCoordinatesForDisplay(
        circleData,
        coordinateSystem
      )
      if (expectedCoordinates) {
        await browseTheWeb.expectElementToContainText(
          CheckYourAnswersPage.locators.siteDetails.coordinatesAtCentreValue,
          expectedCoordinates
        )
      }
    }
  }

  async _validateCircularSiteWidth(browseTheWeb, siteDetails) {
    if (siteDetails.circleData?.width) {
      const expectedWidth = `${siteDetails.circleData.width} metres`
      await browseTheWeb.expectElementToContainText(
        CheckYourAnswersPage.locators.siteDetails.widthOfCircularSiteValue,
        expectedWidth
      )
    }
  }

  _formatCoordinatesForDisplay(circleData, coordinateSystem) {
    if (this._isWGS84CoordinateSystem(circleData, coordinateSystem)) {
      return `${circleData.latitude}, ${circleData.longitude}`
    }
    if (this._isOSGB36CoordinateSystem(circleData, coordinateSystem)) {
      return `${circleData.eastings}, ${circleData.northings}`
    }
    return null
  }

  _isWGS84CoordinateSystem(circleData, coordinateSystem) {
    return (
      coordinateSystem === 'WGS84' &&
      circleData.latitude &&
      circleData.longitude
    )
  }

  _isOSGB36CoordinateSystem(circleData, coordinateSystem) {
    return (
      coordinateSystem === 'OSGB36' &&
      circleData.eastings &&
      circleData.northings
    )
  }

  async _validatePublicRegister(browseTheWeb, exemptionData) {
    if (exemptionData.publicRegister) {
      const expectedConsent = exemptionData.publicRegister.consent
        ? 'No'
        : 'Yes'
      await browseTheWeb.expectElementToContainText(
        CheckYourAnswersPage.locators.publicRegister.informationWithheldValue,
        expectedConsent
      )
    }
  }

  _isFileUpload(siteDetails) {
    return siteDetails.fileType || siteDetails.filePath
  }

  async _validateFileUploadDetails(browseTheWeb, siteDetails) {
    if (siteDetails.fileType) {
      const expectedFileType = this._mapFileTypeToDisplayText(
        siteDetails.fileType
      )
      await browseTheWeb.expectElementToContainText(
        CheckYourAnswersPage.locators.siteDetails.fileTypeValue,
        expectedFileType
      )
    }

    if (siteDetails.filePath) {
      const filename = this._extractFilenameFromPath(siteDetails.filePath)
      await browseTheWeb.expectElementToContainText(
        CheckYourAnswersPage.locators.siteDetails.fileUploadedValue,
        filename
      )
    }
  }

  _mapFileTypeToDisplayText(fileType) {
    const mappings = {
      kml: 'KML',
      KML: 'KML',
      shapefile: 'Shapefile',
      Shapefile: 'Shapefile'
    }
    return mappings[fileType] || fileType
  }

  _extractFilenameFromPath(filePath) {
    return filePath.split('/').pop()
  }

  getCoordinatesFromSiteDetails(siteDetails) {
    const allCoordinates =
      siteDetails?.polygonData?.coordinates || siteDetails?.coordinates || []
    return this._limitTriangleCoordinates(siteDetails, allCoordinates)
  }

  _limitTriangleCoordinates(siteDetails, coordinates) {
    if (siteDetails?.siteType === 'triangle' && coordinates.length > 3) {
      return coordinates.slice(0, 3)
    }
    return coordinates
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
}

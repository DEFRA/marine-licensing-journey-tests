import { expect } from 'chai'
import {
  formatDateObjectToDisplay,
  formatSubmissionDateForDisplay
} from '~/test-infrastructure/helpers/date-formatter.js'
import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import ReviewSiteDetailsPage from '~/test-infrastructure/pages/review.site.details.page.js'
import { getActivityPurposeDisplay } from '~/test-infrastructure/screenplay/factories/iat-constants.js'
import Task from './task.js'

export default class NotificationSummaryBase extends Task {
  _getPageLocators() {
    return CheckYourAnswersPage.locators
  }

  async _validateProjectSummary(browseTheWeb, exemptionData) {
    const pageLocators = this._getPageLocators()

    await browseTheWeb.expectElementToContainText(
      pageLocators.projectSummary.activityTypeValue,
      exemptionData.iatContext.activityType.display
    )

    const expectedPurpose = getActivityPurposeDisplay(
      exemptionData.iatContext.activityType.code,
      exemptionData.iatContext.articleCode.code
    )

    if (expectedPurpose) {
      await browseTheWeb.expectElementToHaveExactText(
        pageLocators.projectSummary.activityPurposeValue,
        expectedPurpose
      )
    } else {
      await browseTheWeb.isNotDisplayed(
        pageLocators.projectSummary.activityPurposeTerm
      )
    }

    await browseTheWeb.expectElementToContainText(
      pageLocators.projectSummary.exemptionReasonValue,
      `Article ${exemptionData.iatContext.articleCode.code} of the Marine Licensing (Exempted Activities) Order 2011`
    )

    await browseTheWeb.isDisplayed(pageLocators.projectSummary.pdfDownloadLink)
  }

  async _validateSubmissionDetails(browseTheWeb, exemptionData) {
    const pageLocators = this._getPageLocators()

    const currentUrl = await browseTheWeb.browser.getUrl()
    const isCheckYourAnswersPage = currentUrl.includes('/check-your-answers')

    if (isCheckYourAnswersPage) {
      if (exemptionData.applicationReference) {
        await browseTheWeb.expectElementToContainText(
          pageLocators.applicationReference,
          exemptionData.applicationReference
        )
      }

      if (exemptionData.submissionDate || exemptionData.dateSubmitted) {
        const submissionDate =
          exemptionData.submissionDate || exemptionData.dateSubmitted
        const expectedDate = formatSubmissionDateForDisplay(submissionDate)

        await browseTheWeb.expectElementToContainText(
          pageLocators.submissionDate,
          expectedDate
        )
      }
    }
  }

  async _validateActivityDates(browseTheWeb, exemptionData) {
    // Use top-level activityDates (what check your answers displays)
    // not site-specific dates
    const activityDates = exemptionData.activityDates
    if (activityDates) {
      await this._validateDateField(browseTheWeb, activityDates, 'startDate')
      await this._validateDateField(browseTheWeb, activityDates, 'endDate')
    }
  }

  async _validateDateField(browseTheWeb, activityDates, dateField) {
    if (activityDates[dateField]) {
      const pageLocators = this._getPageLocators()
      const locator = pageLocators.activityDates[`${dateField}Value`]
      const expectedDate = formatDateObjectToDisplay(activityDates[dateField])
      await browseTheWeb.expectElementToHaveExactText(locator, expectedDate)
    }
  }

  async _validateActivityDetails(browseTheWeb, exemptionData) {
    const pageLocators = this._getPageLocators()

    const activityDescription =
      exemptionData.siteDetails.sites[0].activityDescription
    if (activityDescription) {
      await browseTheWeb.expectElementToContainText(
        pageLocators.activityDetails.activityDescriptionValue,
        activityDescription
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
    const firstSiteType = siteDetails.sites[0].siteType

    if (firstSiteType === 'circle') {
      await this.verifyCircleSiteDisplay(browseTheWeb, siteDetails)
      return
    }

    if (firstSiteType === 'triangle') {
      await this.verifyTriangleSiteDisplay(browseTheWeb, siteDetails)
      return
    }

    expect.fail(`Unexpected site type: ${firstSiteType}`)
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
    const pageLocators = this._getPageLocators()
    let expectedText

    if (this._isFileUpload(siteDetails)) {
      expectedText = 'Upload a file with the coordinates of the site'
    } else if (siteDetails.sites[0].siteType === 'triangle') {
      expectedText =
        'Manually enter multiple sets of coordinates to mark the boundary of the site'
    } else {
      expectedText =
        'Manually enter one set of coordinates and a width to create a circular site'
    }

    await browseTheWeb.expectElementToContainText(
      pageLocators.siteDetails.methodOfProvidingSiteLocationValue,
      expectedText
    )
  }

  async _validateCoordinateSystem(browseTheWeb, siteDetails) {
    if (siteDetails.coordinateSystem) {
      const pageLocators = this._getPageLocators()
      const expectedDisplayText = this._mapCoordinateSystemToDisplayText(
        siteDetails.coordinateSystem
      )

      const actualText = await browseTheWeb.getText(
        pageLocators.siteDetails.coordinateSystemValue
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
      const pageLocators = this._getPageLocators()
      const { circleData, coordinateSystem } = siteDetails

      const expectedCoordinates = this._formatCoordinatesForDisplay(
        circleData,
        coordinateSystem
      )
      if (expectedCoordinates) {
        await browseTheWeb.expectElementToContainText(
          pageLocators.siteDetails.coordinatesAtCentreValue,
          expectedCoordinates
        )
      }
    }
  }

  async _validateCircularSiteWidth(browseTheWeb, siteDetails) {
    if (siteDetails.circleData?.width) {
      const pageLocators = this._getPageLocators()
      const expectedWidth = `${siteDetails.circleData.width} metres`
      await browseTheWeb.expectElementToContainText(
        pageLocators.siteDetails.widthOfCircularSiteValue,
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
      const pageLocators = this._getPageLocators()
      const expectedConsent = exemptionData.publicRegister.consent
        ? 'No'
        : 'Yes'
      await browseTheWeb.expectElementToContainText(
        pageLocators.publicRegister.informationWithheldValue,
        expectedConsent
      )
    }
  }

  _isFileUpload(siteDetails) {
    return siteDetails.fileType || siteDetails.filePath
  }

  async _validateFileUploadDetails(browseTheWeb, siteDetails) {
    const pageLocators = this._getPageLocators()

    if (siteDetails.fileType) {
      const expectedFileType = this._mapFileTypeToDisplayText(
        siteDetails.fileType
      )
      await browseTheWeb.expectElementToContainText(
        pageLocators.siteDetails.fileTypeValue,
        expectedFileType
      )
    }

    if (siteDetails.filePath) {
      const filename = this._extractFilenameFromPath(siteDetails.filePath)
      await browseTheWeb.expectElementToContainText(
        pageLocators.siteDetails.fileUploadedValue,
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

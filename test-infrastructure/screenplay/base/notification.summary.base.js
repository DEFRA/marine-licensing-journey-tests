import { expect } from 'chai'
import {
  formatDateObjectToDisplay,
  formatSubmissionDateForDisplay
} from '~/test-infrastructure/helpers/date-formatter.js'
import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import NotificationSummaryBasePage from '~/test-infrastructure/pages/notification.summary.base.page.js'
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
    const isMultiSite = this._isMultiSite(exemptionData.siteDetails)

    if (isMultiSite) {
      return
    }

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
    const isMultiSite = this._isMultiSite(exemptionData.siteDetails)

    if (isMultiSite) {
      return
    }

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
    if (!exemptionData.siteDetails) {
      return
    }

    const isMultiSite = this._isMultiSite(exemptionData.siteDetails)

    if (isMultiSite) {
      await this._validateProvidingSiteLocationCard(
        browseTheWeb,
        exemptionData.siteDetails
      )
      await this._validateActivityDetailsCardMultiSite(
        browseTheWeb,
        exemptionData
      )
      await this._validateMultipleSiteDetailsCards(
        browseTheWeb,
        exemptionData.siteDetails
      )
    } else {
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

  _isMultiSite(siteDetails) {
    return siteDetails.sites && siteDetails.sites.length > 1
  }

  async verifyCoordinateDisplayBySiteType(browseTheWeb, siteDetails) {
    const firstSiteType = siteDetails.sites[0].siteType

    if (firstSiteType === 'circle') {
      await this.verifyCircleSiteDisplay(browseTheWeb, siteDetails)
      return
    }

    if (firstSiteType === 'boundary') {
      await this.verifyBoundarySiteDisplay(browseTheWeb, siteDetails)
      return
    }

    expect.fail(`Unexpected site type: ${firstSiteType}`)
  }

  async verifyCircleSiteDisplay(browseTheWeb, siteDetails) {
    await this._validateCoordinates(browseTheWeb, siteDetails)
    await this._validateCircularSiteWidth(browseTheWeb, siteDetails)
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

  async _validateMethodOfProvidingSiteLocation(browseTheWeb, siteDetails) {
    const pageLocators = this._getPageLocators()
    let expectedText

    if (this._isFileUpload(siteDetails)) {
      expectedText = 'Upload a file with the coordinates of the site'
    } else {
      expectedText = 'Enter the coordinates of the site manually'
    }

    await browseTheWeb.expectElementToContainText(
      pageLocators.siteDetails.methodOfProvidingSiteLocationValue,
      expectedText
    )
  }

  async _validateCoordinateSystem(browseTheWeb, siteDetails) {
    const coordinateSystem =
      siteDetails.coordinateSystem || siteDetails.sites?.[0]?.coordinateSystem
    if (coordinateSystem) {
      const pageLocators = this._getPageLocators()
      const expectedDisplayText =
        this._mapCoordinateSystemToDisplayText(coordinateSystem)

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
      OSGB36: 'British National Grid (OSGB36) Eastings and Northings'
    }
    return mappings[coordinateSystem] || coordinateSystem
  }

  async _validateCoordinates(browseTheWeb, siteDetails) {
    const firstSite = siteDetails.sites?.[0]
    const circleData = siteDetails.circleData || firstSite?.circleData
    const coordinateSystem =
      siteDetails.coordinateSystem || firstSite?.coordinateSystem

    if (circleData) {
      const pageLocators = this._getPageLocators()

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
    const firstSite = siteDetails.sites?.[0]
    const circleData = siteDetails.circleData || firstSite?.circleData

    if (circleData?.width) {
      const pageLocators = this._getPageLocators()
      const expectedWidth = `${circleData.width} metres`
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
        ? 'Yes'
        : 'No'
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
    const allCoordinates = this._extractCoordinates(siteDetails)
    return this._limitBoundaryCoordinates(siteDetails, allCoordinates)
  }

  _extractCoordinates(siteDetails) {
    const topLevelCoordinates = this._getTopLevelCoordinates(siteDetails)
    if (topLevelCoordinates.length > 0) {
      return topLevelCoordinates
    }

    const siteSpecificCoordinates =
      this._getSiteSpecificCoordinates(siteDetails)
    return siteSpecificCoordinates
  }

  _getTopLevelCoordinates(siteDetails) {
    return (
      siteDetails?.polygonData?.coordinates || siteDetails?.coordinates || []
    )
  }

  _getSiteSpecificCoordinates(siteDetails) {
    const firstSite = siteDetails.sites?.[0]
    return firstSite?.polygonData?.coordinates || []
  }

  _limitBoundaryCoordinates(siteDetails, coordinates) {
    const siteType = this._getSiteType(siteDetails)

    if (siteType === 'boundary' && coordinates.length > 3) {
      return coordinates.slice(0, 3)
    }
    return coordinates
  }

  _getSiteType(siteDetails) {
    if (siteDetails?.siteType) {
      return siteDetails.siteType
    }
    const firstSite = siteDetails.sites?.[0]
    return firstSite?.siteType
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

  async _validateProvidingSiteLocationCard(browseTheWeb, siteDetails) {
    const pageLocators = this._getPageLocators()

    await browseTheWeb.isDisplayed(pageLocators.providingSiteLocation.heading)

    await this._validateMethodOfProvidingSiteLocation(browseTheWeb, siteDetails)

    if (this._isFileUpload(siteDetails)) {
      await this._validateFileUploadDetails(browseTheWeb, siteDetails)
    } else {
      await browseTheWeb.expectElementToContainText(
        pageLocators.providingSiteLocation.moreThanOneSiteValue,
        'Yes'
      )
    }
  }

  async _validateActivityDetailsCardMultiSite(browseTheWeb, exemptionData) {
    const pageLocators = this._getPageLocators()
    const siteDetails = exemptionData.siteDetails

    await browseTheWeb.isDisplayed(pageLocators.activityDetails.heading)

    await this._validateSameActivityDatesQuestion(browseTheWeb, siteDetails)
    await this._validateSameActivityDescriptionQuestion(
      browseTheWeb,
      siteDetails
    )

    if (siteDetails.sameActivityDates && exemptionData.activityDates) {
      await this._validateActivityDatesMultiSite(
        browseTheWeb,
        exemptionData.activityDates
      )
    }

    if (
      siteDetails.sameActivityDescription &&
      exemptionData.activityDescription
    ) {
      await browseTheWeb.expectElementToContainText(
        pageLocators.activityDetails.activityDescriptionValue,
        exemptionData.activityDescription
      )
    }
  }

  async _validateActivityDatesMultiSite(browseTheWeb, activityDates) {
    const pageLocators = this._getPageLocators()
    const startDate = formatDateObjectToDisplay(activityDates.startDate)
    const endDate = formatDateObjectToDisplay(activityDates.endDate)
    const expectedText = `${startDate} to ${endDate}`
    await browseTheWeb.expectElementToHaveExactText(
      pageLocators.activityDetails.activityDatesValue,
      expectedText
    )
  }

  async _validateSameActivityDatesQuestion(browseTheWeb, siteDetails) {
    const pageLocators = this._getPageLocators()
    const sameActivityDates = siteDetails.sameActivityDates ? 'Yes' : 'No'
    await browseTheWeb.expectElementToHaveExactText(
      pageLocators.activityDetails.sameActivityDatesValue,
      sameActivityDates
    )
  }

  async _validateSameActivityDescriptionQuestion(browseTheWeb, siteDetails) {
    const pageLocators = this._getPageLocators()
    const sameActivityDescription = siteDetails.sameActivityDescription
      ? 'Yes'
      : 'No'
    await browseTheWeb.expectElementToHaveExactText(
      pageLocators.activityDetails.sameActivityDescriptionValue,
      sameActivityDescription
    )
  }

  async _validateMultipleSiteDetailsCards(browseTheWeb, siteDetails) {
    for (let i = 0; i < siteDetails.sites.length; i++) {
      const siteNumber = i + 1
      const site = siteDetails.sites[i]

      await browseTheWeb.isDisplayed(
        NotificationSummaryBasePage.getSiteDetailsCard(siteNumber)
      )

      await this._validateSiteCard(browseTheWeb, siteNumber, site, siteDetails)
    }
  }

  async _validateSiteCard(browseTheWeb, siteNumber, site, siteDetails) {
    await this._validateSiteName(browseTheWeb, siteNumber, site)
    await this._validateSiteActivityDates(
      browseTheWeb,
      siteNumber,
      site,
      siteDetails
    )
    await this._validateSiteActivityDescription(
      browseTheWeb,
      siteNumber,
      site,
      siteDetails
    )

    if (!this._isFileUpload(siteDetails)) {
      await this._validateSiteCoordinateSystem(browseTheWeb, siteNumber, site)
      await this._validateSiteCoordinates(browseTheWeb, siteNumber, site)
    }
  }

  async _validateSiteName(browseTheWeb, siteNumber, site) {
    if (!site.siteName) return

    const siteNameValue = NotificationSummaryBasePage.getSiteDetailsCardField(
      siteNumber,
      'Site name'
    )
    await browseTheWeb.expectElementToHaveExactText(
      siteNameValue,
      site.siteName
    )
  }

  async _validateSiteActivityDates(
    browseTheWeb,
    siteNumber,
    site,
    siteDetails
  ) {
    if (siteDetails.sameActivityDates || !site.activityDates) return

    const datesValue = NotificationSummaryBasePage.getSiteDetailsCardField(
      siteNumber,
      'Activity dates'
    )
    const expectedDates = `${formatDateObjectToDisplay(site.activityDates.startDate)} to ${formatDateObjectToDisplay(site.activityDates.endDate)}`
    await browseTheWeb.expectElementToContainText(datesValue, expectedDates)
  }

  async _validateSiteActivityDescription(
    browseTheWeb,
    siteNumber,
    site,
    siteDetails
  ) {
    if (siteDetails.sameActivityDescription || !site.activityDescription) return

    const descriptionValue =
      NotificationSummaryBasePage.getSiteDetailsCardField(
        siteNumber,
        'Activity description'
      )
    await browseTheWeb.expectElementToContainText(
      descriptionValue,
      site.activityDescription
    )
  }

  async _validateSiteCoordinateSystem(browseTheWeb, siteNumber, site) {
    if (!site.coordinateSystem) return

    const coordinateSystemValue =
      NotificationSummaryBasePage.getSiteDetailsCardField(
        siteNumber,
        'Coordinate system'
      )
    const expectedDisplayText = this._mapCoordinateSystemToDisplayText(
      site.coordinateSystem
    )
    const actualText = await browseTheWeb.getText(coordinateSystemValue)
    const normalizedText = actualText.trim().replaceAll('\n', ' ')

    expect(normalizedText).to.equal(expectedDisplayText)
  }

  async _validateSiteCoordinates(browseTheWeb, siteNumber, site) {
    if (site.siteType !== 'circle' || !site.circleData) return

    const coordinatesValue =
      NotificationSummaryBasePage.getSiteDetailsCardField(
        siteNumber,
        'Coordinates at centre of site'
      )
    const expectedCoordinates = this._formatCoordinatesForDisplay(
      site.circleData,
      site.coordinateSystem
    )
    if (expectedCoordinates) {
      await browseTheWeb.expectElementToContainText(
        coordinatesValue,
        expectedCoordinates
      )
    }

    if (site.circleData.width) {
      const widthValue = NotificationSummaryBasePage.getSiteDetailsCardField(
        siteNumber,
        'Width of circular site'
      )
      await browseTheWeb.expectElementToContainText(
        widthValue,
        `${site.circleData.width} metres`
      )
    }
  }
}

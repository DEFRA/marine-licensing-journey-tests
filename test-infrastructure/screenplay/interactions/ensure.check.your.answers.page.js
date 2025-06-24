import { expect } from 'chai'
import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import Task from '../base/task.js'

export default class EnsureCheckYourAnswersPage extends Task {
  static showsAllAnswers() {
    return new EnsureCheckYourAnswersPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemptionData = actor.recalls('exemption')

    // Validate Project Details section
    await this._validateProjectDetails(browseTheWeb, exemptionData)

    // Validate Activity Dates section
    await this._validateActivityDates(browseTheWeb, exemptionData)

    // Validate Activity Details section
    await this._validateActivityDetails(browseTheWeb, exemptionData)

    // Validate Site Details section
    await this._validateSiteDetails(browseTheWeb, exemptionData)

    // Validate Public Register section
    await this._validatePublicRegister(browseTheWeb, exemptionData)
  }

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
      return `${dateObject.day}/${dateObject.month}/${dateObject.year}`
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
      await this._validateCoordinateSystem(
        browseTheWeb,
        exemptionData.siteDetails
      )
      await this._validateCoordinates(browseTheWeb, exemptionData.siteDetails)
      await this._validateCircularSiteWidth(
        browseTheWeb,
        exemptionData.siteDetails
      )
    }
  }

  async _validateMethodOfProvidingSiteLocation(browseTheWeb, siteDetails) {
    // AC6: Method of providing site location - fixed text for circular sites
    const expectedText =
      'Manually enter one set of coordinates and a width to create a circular site'

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

      // Use Chai fallback for complex error message with expected vs actual
      const actualText = await browseTheWeb.getText(
        CheckYourAnswersPage.locators.siteDetails.coordinateSystemValue
      )

      if (actualText.trim() !== expectedDisplayText) {
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

      // AC6: Validate "Coordinates at centre of site" field
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
      // AC6: Width should be displayed as "<width> metres" in "Width of circular site" field
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
        ? 'Yes'
        : 'No'
      await browseTheWeb.expectElementToContainText(
        CheckYourAnswersPage.locators.publicRegister.informationWithheldValue,
        expectedConsent
      )
    }
  }
}

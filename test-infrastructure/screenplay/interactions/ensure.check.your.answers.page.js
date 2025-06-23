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
    // Check section heading exists
    await browseTheWeb.expectElementToContainText(
      CheckYourAnswersPage.locators.projectDetails.heading,
      'Project details'
    )

    // Validate project name
    if (exemptionData.projectName) {
      const actualProjectName = await browseTheWeb.getText(
        CheckYourAnswersPage.locators.projectDetails.projectNameValue
      )
      if (actualProjectName.trim() !== exemptionData.projectName.trim()) {
        expect.fail(
          `Project name mismatch. Expected: "${exemptionData.projectName}", but found: "${actualProjectName}"`
        )
      }
    }
  }

  async _validateActivityDates(browseTheWeb, exemptionData) {
    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(
      CheckYourAnswersPage.locators.activityDates.heading
    )

    // Validate activity dates if they exist
    if (exemptionData.activityDates) {
      if (exemptionData.activityDates.startDate) {
        const actualStartDate = await browseTheWeb.getText(
          CheckYourAnswersPage.locators.activityDates.startDateValue
        )
        const expectedStartDate = this._formatDateForDisplay(
          exemptionData.activityDates.startDate
        )
        if (actualStartDate.trim() !== expectedStartDate) {
          expect.fail(
            `Start date mismatch. Expected: "${expectedStartDate}", but found: "${actualStartDate}"`
          )
        }
      }

      if (exemptionData.activityDates.endDate) {
        const actualEndDate = await browseTheWeb.getText(
          CheckYourAnswersPage.locators.activityDates.endDateValue
        )
        const expectedEndDate = this._formatDateForDisplay(
          exemptionData.activityDates.endDate
        )
        if (actualEndDate.trim() !== expectedEndDate) {
          expect.fail(
            `End date mismatch. Expected: "${expectedEndDate}", but found: "${actualEndDate}"`
          )
        }
      }
    }
  }

  async _validateActivityDetails(browseTheWeb, exemptionData) {
    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(
      CheckYourAnswersPage.locators.activityDetails.heading
    )

    // Validate activity description
    if (exemptionData.activityDescription) {
      const actualDescription = await browseTheWeb.getText(
        CheckYourAnswersPage.locators.activityDetails.activityDescriptionValue
      )
      if (
        actualDescription.trim() !== exemptionData.activityDescription.trim()
      ) {
        expect.fail(
          `Activity description mismatch. Expected: "${exemptionData.activityDescription}", but found: "${actualDescription}"`
        )
      }
    }
  }

  async _validateSiteDetails(browseTheWeb, exemptionData) {
    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(
      CheckYourAnswersPage.locators.siteDetails.heading
    )

    // Validate site details if they exist
    if (exemptionData.siteDetails) {
      // Validate coordinates type
      if (exemptionData.siteDetails.coordinatesType) {
        const actualCoordinatesType = await browseTheWeb.getText(
          CheckYourAnswersPage.locators.siteDetails.coordinatesTypeValue
        )
        if (
          actualCoordinatesType.trim() !==
          exemptionData.siteDetails.coordinatesType
        ) {
          expect.fail(
            `Coordinates type mismatch. Expected: "${exemptionData.siteDetails.coordinatesType}", but found: "${actualCoordinatesType}"`
          )
        }
      }

      // Validate coordinates entry method
      if (exemptionData.siteDetails.coordinatesEntry) {
        const actualCoordinatesEntry = await browseTheWeb.getText(
          CheckYourAnswersPage.locators.siteDetails.coordinatesEntryValue
        )
        if (
          actualCoordinatesEntry.trim() !==
          exemptionData.siteDetails.coordinatesEntry
        ) {
          expect.fail(
            `Coordinates entry mismatch. Expected: "${exemptionData.siteDetails.coordinatesEntry}", but found: "${actualCoordinatesEntry}"`
          )
        }
      }

      // Validate coordinate system - map short format to expected display text
      if (exemptionData.siteDetails.coordinateSystem) {
        const actualCoordinateSystem = await browseTheWeb.getText(
          CheckYourAnswersPage.locators.siteDetails.coordinateSystemValue
        )

        // Map the stored short format to what should be displayed per AC
        let expectedCoordinateSystem
        if (exemptionData.siteDetails.coordinateSystem === 'WGS84') {
          expectedCoordinateSystem =
            'WGS84 (World Geodetic System 1984) Latitude and longitude'
        } else if (exemptionData.siteDetails.coordinateSystem === 'OSGB36') {
          expectedCoordinateSystem =
            'OSGB36 (National Grid) Eastings and Northings'
        } else {
          expectedCoordinateSystem = exemptionData.siteDetails.coordinateSystem
        }

        if (actualCoordinateSystem.trim() !== expectedCoordinateSystem) {
          expect.fail(
            `Coordinate system mismatch. Expected: "${expectedCoordinateSystem}", but found: "${actualCoordinateSystem}"`
          )
        }
      }

      // Validate coordinates
      if (exemptionData.siteDetails.coordinates) {
        const actualCoordinates = await browseTheWeb.getText(
          CheckYourAnswersPage.locators.siteDetails.coordinatesValue
        )
        const expectedCoordinates = this._formatCoordinatesForDisplay(
          exemptionData.siteDetails.coordinates
        )
        if (actualCoordinates.trim() !== expectedCoordinates) {
          expect.fail(
            `Coordinates mismatch. Expected: "${expectedCoordinates}", but found: "${actualCoordinates}"`
          )
        }
      }

      // Validate circle width (for circular sites)
      if (exemptionData.siteDetails.width) {
        const actualWidth = await browseTheWeb.getText(
          CheckYourAnswersPage.locators.siteDetails.circleWidthValue
        )
        if (actualWidth.trim() !== exemptionData.siteDetails.width.toString()) {
          expect.fail(
            `Circle width mismatch. Expected: "${exemptionData.siteDetails.width}", but found: "${actualWidth}"`
          )
        }
      }
    }
  }

  async _validatePublicRegister(browseTheWeb, exemptionData) {
    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(
      CheckYourAnswersPage.locators.publicRegister.heading
    )

    // Validate public register consent
    if (exemptionData.publicRegister) {
      const actualConsent = await browseTheWeb.getText(
        CheckYourAnswersPage.locators.publicRegister.informationWithheldValue
      )
      const expectedConsent =
        exemptionData.publicRegister.consent === 'no' ? 'Yes' : 'No'
      if (actualConsent.trim() !== expectedConsent) {
        expect.fail(
          `Public register consent mismatch. Expected: "${expectedConsent}", but found: "${actualConsent}"`
        )
      }
    }
  }

  /**
   * Format date object for display comparison
   * Expected format: DD/MM/YYYY
   */
  _formatDateForDisplay(dateObj) {
    if (!dateObj) return ''

    const day = dateObj.day?.toString().padStart(2, '0') || '01'
    const month = dateObj.month?.toString().padStart(2, '0') || '01'
    const year = dateObj.year?.toString() || '2025'

    return `${day}/${month}/${year}`
  }

  /**
   * Format coordinates for display comparison
   * Expected format: "latitude, longitude"
   */
  _formatCoordinatesForDisplay(coordinates) {
    if (!coordinates) return ''

    const lat = coordinates.latitude || coordinates.lat || ''
    const lon = coordinates.longitude || coordinates.lon || ''

    return `${lat}, ${lon}`
  }
}

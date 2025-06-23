import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import { expect } from 'chai'
import Task from '../base/task.js'
import Memory from '../memory.js'

export default class EnsureCheckYourAnswersPage extends Task {
  static showsAllAnswers() {
    return new EnsureCheckYourAnswersPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemptionData = Memory.getExemption()

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
    const projectSection = CheckYourAnswersPage.getProjectDetailsSection()

    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(projectSection.heading)

    // Validate project name
    if (exemptionData.projectName) {
      const actualProjectName = await browseTheWeb.getText(
        projectSection.projectName.value
      )
      if (actualProjectName.trim() !== exemptionData.projectName.trim()) {
        expect.fail(
          `Project name mismatch. Expected: "${exemptionData.projectName}", but found: "${actualProjectName}"`
        )
      }
    }
  }

  async _validateActivityDates(browseTheWeb, exemptionData) {
    const datesSection = CheckYourAnswersPage.getActivityDatesSection()

    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(datesSection.heading)

    // Validate activity dates if they exist
    if (exemptionData.activityDates) {
      if (exemptionData.activityDates.startDate) {
        const actualStartDate = await browseTheWeb.getText(
          datesSection.startDate.value
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
          datesSection.endDate.value
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
    const detailsSection = CheckYourAnswersPage.getActivityDetailsSection()

    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(detailsSection.heading)

    // Validate activity description
    if (exemptionData.activityDescription) {
      const actualDescription = await browseTheWeb.getText(
        detailsSection.activityDescription.value
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
    const siteSection = CheckYourAnswersPage.getSiteDetailsSection()

    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(siteSection.heading)

    // Validate site details if they exist
    if (exemptionData.siteDetails) {
      // Validate coordinates type
      if (exemptionData.siteDetails.coordinatesType) {
        const actualCoordinatesType = await browseTheWeb.getText(
          siteSection.coordinatesType.value
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
          siteSection.coordinatesEntry.value
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

      // Validate coordinate system
      if (exemptionData.siteDetails.coordinateSystem) {
        const actualCoordinateSystem = await browseTheWeb.getText(
          siteSection.coordinatesSystem.value
        )
        if (
          actualCoordinateSystem.trim() !==
          exemptionData.siteDetails.coordinateSystem
        ) {
          expect.fail(
            `Coordinate system mismatch. Expected: "${exemptionData.siteDetails.coordinateSystem}", but found: "${actualCoordinateSystem}"`
          )
        }
      }

      // Validate coordinates
      if (exemptionData.siteDetails.coordinates) {
        const actualCoordinates = await browseTheWeb.getText(
          siteSection.coordinates.value
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
          siteSection.circleWidth.value
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
    const registerSection = CheckYourAnswersPage.getPublicRegisterSection()

    // Check section heading exists
    await browseTheWeb.expectElementToBePresent(registerSection.heading)

    // Validate public register consent
    if (exemptionData.publicRegister) {
      const actualConsent = await browseTheWeb.getText(
        registerSection.informationWithheld.value
      )
      const expectedConsent = exemptionData.publicRegister.consent
        ? 'No'
        : 'Yes'
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

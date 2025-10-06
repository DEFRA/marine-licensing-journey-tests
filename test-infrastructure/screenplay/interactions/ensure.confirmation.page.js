import { expect } from 'chai'
import ConfirmationPage from '~/test-infrastructure/pages/confirmation.page.js'
import Task from '../base/task.js'

export default class EnsureConfirmationPage extends Task {
  static isDisplayedWithApplicationReference() {
    return new EnsureConfirmationPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    // Verify the confirmation page is displayed
    await browseTheWeb.expectElementToContainText(
      ConfirmationPage.locators.panelTitle,
      'Application complete'
    )

    // Get and validate the application reference format
    const referenceText = await browseTheWeb.getText(
      ConfirmationPage.locators.applicationReference
    )

    this._validateApplicationReferenceFormat(referenceText)

    await browseTheWeb.isDisplayed(ConfirmationPage.locators.feedbackLink)
    await browseTheWeb.expectElementToContainText(
      ConfirmationPage.locators.feedbackLink,
      'What did you think of this service?'
    )
    await browseTheWeb.expectElementToHaveAttribute(
      ConfirmationPage.locators.feedbackLink,
      'href',
      ConfirmationPage.expectedFeedbackUrl
    )
  }

  _validateApplicationReferenceFormat(referenceText) {
    // Expected format: EXE/{current year}/{number > 10000}
    const currentYear = new Date().getFullYear()
    const expectedPattern = new RegExp(`^EXE/${currentYear}/\\d{5,}$`)

    if (!expectedPattern.test(referenceText)) {
      expect.fail(
        `Application reference format is invalid. Expected format: EXE/${currentYear}/{number > 10000}, but got: "${referenceText}"`
      )
    }

    // Extract and validate the number part
    const numberPart = parseInt(referenceText.split('/')[2])
    if (numberPart <= 10000) {
      expect.fail(
        `Application reference number should be greater than 10000, but got: ${numberPart}`
      )
    }
  }
}

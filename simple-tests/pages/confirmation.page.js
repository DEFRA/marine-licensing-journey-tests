import { expect } from '@playwright/test'

// Reuses locators from test-infrastructure/pages/confirmation.page.js
export class ConfirmationPage {
  static selectors = {
    panel: '.govuk-panel',
    panelTitle: '.govuk-panel__title',
    applicationReference: '.govuk-panel__body strong',
    feedbackLink: '.govuk-grid-row a[href*="forms.office.com"]'
  }

  static expectedFeedbackUrl =
    'https://forms.office.com/pages/responsepage.aspx?id=UCQKdycCYkyQx044U38RAjXEiYXnHG1DvkWr_VjRfzZURFMxRkhCSzQyVlRKQzdZNDEyVDhSMFdSNy4u&route=shorturl'

  static async verifyApplicationReference(page) {
    const reference = await page
      .locator(this.selectors.applicationReference)
      .textContent()
    expect(reference).toMatch(/^EXE\/\d{4}\/\d{5}$/)
    return reference
  }

  static async verifyFeedbackLink(page) {
    const link = page.locator(this.selectors.feedbackLink)
    await expect(link).toBeVisible()
    const href = await link.getAttribute('href')
    expect(href).toBe(this.expectedFeedbackUrl)
  }
}

import { expect } from '@playwright/test'

export default class ConfirmationPage {
  constructor(page) {
    this.page = page
    this.panelTitle = page.locator('.govuk-panel__title')
    this.applicationReference = page.locator('.govuk-panel__body strong')
    this.feedbackLink = page.locator(
      '.govuk-grid-row a[href*="forms.office.com"]'
    )
  }

  async expectIsDisplayed() {
    await expect(this.panelTitle).toContainText('Application complete', {
      timeout: 30_000
    })
  }

  async getApplicationReference() {
    return (await this.applicationReference.textContent()).trim()
  }

  async expectValidReference() {
    const reference = await this.getApplicationReference()
    const currentYear = new Date().getFullYear()
    const pattern = new RegExp(`^EXE/${currentYear}/\\d{5,}$`)
    expect(reference).toMatch(pattern)
  }

  async expectFeedbackLink() {
    await expect(this.feedbackLink).toBeVisible()
  }
}

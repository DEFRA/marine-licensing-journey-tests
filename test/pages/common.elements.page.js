import { expect } from '@playwright/test'

export default class CommonElementsPage {
  constructor(page) {
    this.page = page
    this.mainHeading = page.locator('h1, h2').first()
    this.backLink = page.locator('a:text("Back")')
    this.cancelLink = page.locator('a:text("Cancel")')
    this.submitButton = page.locator(
      'button[type="submit"]:not([name="analytics"])'
    )
    this.serviceName = page.locator('.govuk-service-navigation__service-name')
    this.organisationName = page.locator('.app-border-bottom .govuk-body-s')
  }

  async expectHeading(text) {
    await expect(this.mainHeading).toContainText(text)
  }

  async expectHeadingExact(text) {
    await expect(this.mainHeading).toHaveText(text)
  }

  async clickBack() {
    await this.backLink.click()
  }

  async clickCancel() {
    await this.cancelLink.click()
  }

  async clickSubmit() {
    await this.submitButton.click()
  }
}

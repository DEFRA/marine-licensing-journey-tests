import { expect } from '@playwright/test'

export default class ProjectNamePage {
  static path = '/'

  constructor(page) {
    this.page = page
    this.projectNameInput = page.locator('#projectName')
    this.projectNameError = page.locator('#projectName-error')
    this.saveAndContinue = page.locator(
      'button[type="submit"]:not([name="analytics"])'
    )
    this.caption = page.locator('.govuk-caption-l, .govuk-caption-xl')
  }

  async enterProjectName(name) {
    await this.projectNameInput.click()
    await this.projectNameInput.fill(name)
    await this.saveAndContinue.click()
  }

  async expectError(message) {
    await expect(this.projectNameError).toContainText(message)
  }

  async expectProjectNameValue(name) {
    await expect(this.projectNameInput).toHaveValue(name)
  }

  async expectCaptionText(text) {
    await expect(this.caption).toContainText(text)
  }
}

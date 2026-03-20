import { expect } from '@playwright/test'

export default class CookiesPolicyPage {
  constructor(page) {
    this.page = page
    this.heading = page.locator('h1')
    this.analyticsYesRadio = page.locator(
      'input[name="analytics"][value="yes"]'
    )
    this.analyticsNoRadio = page.locator('input[name="analytics"][value="no"]')
    this.saveButton = page.locator('button[type="submit"]')
    this.confirmationBanner = page.locator('.govuk-notification-banner')
    this.successBanner = page.locator('.govuk-notification-banner--success')
  }

  async expectIsDisplayed() {
    await expect(this.page).toHaveURL(/\/help\/cookies/)
    await expect(this.heading).toContainText(
      'Cookies on Get permission for marine work'
    )
  }

  async selectAndSave(choice) {
    if (choice === 'Yes') {
      await this.analyticsYesRadio.click()
    } else {
      await this.analyticsNoRadio.click()
    }
    await this.saveButton.click()
  }

  async expectConfirmationBanner() {
    await expect(this.successBanner).toBeVisible()
    await expect(this.confirmationBanner).toContainText(
      'Your cookie preferences were saved'
    )
    await expect(this.confirmationBanner).toContainText(
      'Go back to the previous page'
    )
  }

  async expectRadioSelected(option) {
    if (option === 'Yes') {
      await expect(this.analyticsYesRadio).toBeChecked()
    } else {
      await expect(this.analyticsNoRadio).toBeChecked()
    }
  }

  async expectAnalyticsCookiesState(enabled) {
    const cookies = await this.page.context().cookies()

    const preferencesSet = cookies.find(
      (c) => c.name === 'cookies_preferences_set'
    )
    expect(preferencesSet?.value).toBe('true')

    const policyCookie = cookies.find((c) => c.name === 'cookies_policy')
    expect(policyCookie).toBeTruthy()

    const decoded = Buffer.from(policyCookie.value, 'base64').toString('utf-8')
    const policyData = JSON.parse(decoded)

    expect(policyData.analytics).toBe(enabled)
    expect(policyData.essential).toBe(true)
  }
}

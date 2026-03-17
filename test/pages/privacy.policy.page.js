import { expect } from '@playwright/test'

export default class PrivacyPolicyPage {
  constructor(page) {
    this.page = page
    this.heading = page.locator('h1')
  }

  async expectIsDisplayed() {
    await expect(this.page).toHaveURL(/\/help\/privacy/)
    await expect(this.heading).toContainText('Privacy')
  }
}

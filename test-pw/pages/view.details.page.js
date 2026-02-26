import { expect } from '@playwright/test'

export default class ViewDetailsPage {
  constructor(page) {
    this.page = page
    this.heading = page.locator('h1')
  }

  async expectIsDisplayed() {
    await expect(this.heading).toBeVisible({ timeout: 30_000 })
  }
}

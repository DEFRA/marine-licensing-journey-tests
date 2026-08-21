import { expect } from '@playwright/test'

export const EXEMPTION_TYPE = 'Exempt activity notification'

export default class ViewDetailsPage {
  constructor(page) {
    this.page = page
    this.heading = page.locator('h1')
    this.caption = page.locator('.govuk-caption-l')
    this.applicationDetailsCard = page.locator('#application-details-card')
  }

  cardRowValue(key) {
    return this.applicationDetailsCard.locator(
      `xpath=.//dt[normalize-space(text())="${key}"]/following-sibling::dd[1]`
    )
  }

  async expectIsDisplayed() {
    await expect(this.heading).toBeVisible({ timeout: 30_000 })
  }
}

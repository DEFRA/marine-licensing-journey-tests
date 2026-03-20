import { expect } from '@playwright/test'

export default class CheckYourAnswersPage {
  constructor(page) {
    this.page = page
  }

  projectNameChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Project summary")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(text(), "Project name")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  providingSiteLocationChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Providing the site location")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[text()="Change"]'
    )
  }

  activityDetailsChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[contains(text(), "Change")]'
    )
  }

  publicRegisterChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Sharing your project information publicly") or contains(text(), "Sharing your information publicly")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[text()="Change"]'
    )
  }

  siteDetailsChangeLink(siteNumber, totalSites = 1) {
    const cardHeading =
      totalSites === 1 ? 'Site details' : `Site ${siteNumber} details`
    return this.page.locator(
      `xpath=//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "${cardHeading}")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[contains(text(), "Change")]`
    )
  }

  async expectHeading() {
    await expect(
      this.page.locator('h1, h2, .govuk-heading-l, .govuk-heading-xl').first()
    ).toContainText('Check your answers before sending your information', {
      timeout: 30_000
    })
  }
}

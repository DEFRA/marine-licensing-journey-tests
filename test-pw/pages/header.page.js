import { expect } from '@playwright/test'

export default class HeaderPage {
  constructor(page) {
    this.page = page
  }

  async expectLinksDisplayed(expectedLinks) {
    for (const linkText of expectedLinks) {
      await expect(
        this.page.locator(`//nav//a[normalize-space(text())="${linkText}"]`)
      ).toBeVisible()
    }
  }

  async expectNoNavigationLinks() {
    const navLinks = this.page.locator(
      '.govuk-service-navigation__list .govuk-service-navigation__link'
    )
    await expect(navLinks).toHaveCount(0)
  }
}

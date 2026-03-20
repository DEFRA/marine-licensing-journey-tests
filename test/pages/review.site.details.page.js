import { expect } from '@playwright/test'

export default class ReviewSiteDetailsPage {
  constructor(page) {
    this.page = page
  }

  // Activity details card
  activityDatesChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity dates")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  activityDescriptionChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity description")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  sameActivityDatesChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Are the activity dates the same for every site?")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  sameActivityDescriptionChangeLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Is the activity description the same for every site?")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  // Site-level change links
  siteActivityDatesChangeLink(siteNumber) {
    return this.page.locator(
      `xpath=//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity dates")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]`
    )
  }

  siteActivityDescriptionChangeLink(siteNumber) {
    return this.page.locator(
      `xpath=//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity description")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]`
    )
  }

  siteNameChangeLink(siteNumber) {
    return this.page.locator(
      `xpath=//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Site name")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]`
    )
  }

  // Site geometry change links
  coordinateSystemChangeLink() {
    return this.page.locator(
      'xpath=//dt[contains(text(), "Coordinate system")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  singleOrMultipleCoordinatesChangeLink() {
    return this.page.locator(
      'xpath=//dt[contains(text(), "Single or multiple sets of coordinates")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  coordinatesAtCentreChangeLink() {
    return this.page.locator(
      'xpath=//dt[contains(text(), "Coordinates at centre of site")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  widthChangeLink() {
    return this.page.locator(
      'xpath=//dt[contains(text(), "Width")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  startAndEndPointsChangeLink() {
    return this.page.locator(
      'xpath=//dt[contains(text(), "Start and end points")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]'
    )
  }

  deleteAllSiteDetailsLink() {
    return this.page.locator(
      'xpath=//h2[contains(text(), "Providing the site location")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[contains(text(), "Delete all site details")]'
    )
  }

  async expectHeading() {
    await expect(
      this.page.locator('h1, h2, .govuk-heading-l, .govuk-heading-xl').first()
    ).toContainText('Review site details', { timeout: 30_000 })
  }
}

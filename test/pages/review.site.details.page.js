import { expect } from '@playwright/test'

export default class ReviewSiteDetailsPage {
  constructor(page) {
    this.page = page
  }

  // Activity details card
  activityDatesChangeLink() {
    return this.page.locator(
      '#activity-details-card .govuk-summary-list__row:has(dt:text-is("Activity dates")) a:text("Change")'
    )
  }

  activityDescriptionChangeLink() {
    return this.page.locator(
      '#activity-details-card .govuk-summary-list__row:has(dt:text-is("Activity description")) a:text("Change")'
    )
  }

  sameActivityDatesChangeLink() {
    return this.page.locator(
      '#activity-details-card .govuk-summary-list__row:has(dt:text("Are the activity dates the same for every site?")) a:text("Change")'
    )
  }

  sameActivityDescriptionChangeLink() {
    return this.page.locator(
      '#activity-details-card .govuk-summary-list__row:has(dt:text("Is the activity description the same for every site?")) a:text("Change")'
    )
  }

  // Site-level change links
  siteActivityDatesChangeLink(siteNumber) {
    return this.page.locator(
      `#site-details-${siteNumber} .govuk-summary-list__row:has(dt:text("Activity dates")) a:text("Change")`
    )
  }

  siteActivityDescriptionChangeLink(siteNumber) {
    return this.page.locator(
      `#site-details-${siteNumber} .govuk-summary-list__row:has(dt:text("Activity description")) a:text("Change")`
    )
  }

  siteNameChangeLink(siteNumber) {
    return this.page.locator(
      `#site-details-${siteNumber} .govuk-summary-list__row:has(dt:text("Site name")) a:text("Change")`
    )
  }

  siteNameAddLink(siteNumber) {
    return this.page.locator(
      `#site-details-${siteNumber} .govuk-summary-list__row:has(dt:text("Site name")) a:text("Add")`
    )
  }

  siteNameValue(siteNumber) {
    return this.page.locator(
      `#site-details-${siteNumber} .govuk-summary-list__row:has(dt:text("Site name")) .govuk-summary-list__value`
    )
  }

  // Site geometry change links
  coordinateSystemChangeLink() {
    return this.page.locator(
      '.govuk-summary-list__row:has(dt:text("Coordinate system")) a:text("Change")'
    )
  }

  singleOrMultipleCoordinatesChangeLink() {
    return this.page.locator(
      '.govuk-summary-list__row:has(dt:text("Single or multiple sets of coordinates")) a:text("Change")'
    )
  }

  coordinatesAtCentreChangeLink() {
    return this.page.locator(
      '.govuk-summary-list__row:has(dt:text("Coordinates at centre of site")) a:text("Change")'
    )
  }

  widthChangeLink() {
    return this.page.locator(
      '.govuk-summary-list__row:has(dt:text("Width")) a:text("Change")'
    )
  }

  startAndEndPointsChangeLink() {
    return this.page.locator(
      '.govuk-summary-list__row:has(dt:text("Start and end points")) a:text("Change")'
    )
  }

  deleteAllSiteDetailsLink() {
    return this.page.locator(
      '#site-location-card a:text("Delete all site details")'
    )
  }

  async expectHeading() {
    await expect(
      this.page.locator('h1, h2, .govuk-heading-l, .govuk-heading-xl').first()
    ).toContainText('Review site details', { timeout: 30_000 })
  }
}

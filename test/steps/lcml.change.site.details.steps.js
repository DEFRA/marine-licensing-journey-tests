import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import {
  submitPrimaryAndWait,
  expectReviewSiteDetailsAnchor
} from '../support/lcml-helpers.js'

When(
  'the user selects the {string} change link for the circular site',
  async function (fieldKey) {
    const review = new ReviewSiteDetailsPage(this.page)
    await review.siteFieldChangeLink(1, fieldKey).click()
    await this.page.waitForLoadState('load')
  }
)

When('the user changes the site name and saves', async function () {
  const updated = `Updated Site ${faker.location.city()}`
  this.data.updated = { ...(this.data.updated || {}), siteName: updated }
  await this.page.locator('#siteName').fill(updated)
  await submitPrimaryAndWait(this.page)
})

Then(
  'the review site details page is displayed at the site {int} anchor',
  async function (siteNumber) {
    await expectReviewSiteDetailsAnchor(this.page, siteNumber)
  }
)

Then(
  'the site name on the review page shows the updated value',
  async function () {
    const review = new ReviewSiteDetailsPage(this.page)
    await expect(review.siteNameValue(1)).toContainText(
      this.data.updated.siteName,
      { timeout: 30_000 }
    )
  }
)

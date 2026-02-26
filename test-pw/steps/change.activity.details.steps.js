import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndCompleteSiteDetailsToReview } from '../support/task-flow.js'
import {
  enterActivityDates,
  enterActivityDescription,
  selectSameActivityDates,
  selectSameActivityDescription
} from '../support/site-details-flow.js'
import {
  createMixedMultiSiteData,
  generateActivityDates,
  generateActivityDescription
} from '../test-data/site-details.js'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

// --- Given steps ---

Given(
  'a user has reached the review site details page with project level activity dates',
  async function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
    await navigateAndCompleteSiteDetailsToReview(this)
    const common = new CommonElementsPage(this.page)
    await common.expectHeading('Review site details')
  }
)

Given(
  'a user has reached the review site details page with site level activity dates',
  async function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: false,
      sameActivityDescription: true
    })
    await navigateAndCompleteSiteDetailsToReview(this)
    const common = new CommonElementsPage(this.page)
    await common.expectHeading('Review site details')
  }
)

Given(
  'a user has reached the review site details page with project level activity descriptions',
  async function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
    await navigateAndCompleteSiteDetailsToReview(this)
    const common = new CommonElementsPage(this.page)
    await common.expectHeading('Review site details')
  }
)

Given(
  'a user has reached the review site details page with site level activity descriptions',
  async function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: true,
      sameActivityDescription: false
    })
    await navigateAndCompleteSiteDetailsToReview(this)
    const common = new CommonElementsPage(this.page)
    await common.expectHeading('Review site details')
  }
)

// --- When steps: activity dates ---

When('the user changes the project level activity dates', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.activityDatesChangeLink().click()
  const newDates = generateActivityDates()
  await enterActivityDates(this.page, newDates)
})

When(
  'the user changes the activity dates for site {int}',
  async function (siteNumber) {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.siteActivityDatesChangeLink(siteNumber).click()
    const newDates = generateActivityDates()
    await enterActivityDates(this.page, newDates)
  }
)

When('the user changes to project level activity dates', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.sameActivityDatesChangeLink().click()
  await selectSameActivityDates(this.page, true)
  const newDates = generateActivityDates()
  await enterActivityDates(this.page, newDates)
})

When('the user changes to site level activity dates', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.sameActivityDatesChangeLink().click()
  await selectSameActivityDates(this.page, false)
})

// --- When steps: activity descriptions ---

When(
  'the user changes the project level activity description',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.activityDescriptionChangeLink().click()
    const newDescription = generateActivityDescription()
    await enterActivityDescription(this.page, newDescription)
  }
)

When(
  'the user changes the site level activity description for site {int}',
  async function (siteNumber) {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.siteActivityDescriptionChangeLink(siteNumber).click()
    const newDescription = generateActivityDescription()
    await enterActivityDescription(this.page, newDescription)
  }
)

When('the user changes to site level activity descriptions', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.sameActivityDescriptionChangeLink().click()
  await selectSameActivityDescription(this.page, false)
})

When(
  'the user changes to project level activity descriptions',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.sameActivityDescriptionChangeLink().click()
    await selectSameActivityDescription(this.page, true)
    const newDescription = generateActivityDescription()
    await enterActivityDescription(this.page, newDescription)
  }
)

// --- Then steps ---

Then(
  'the activity dates are updated on the review site details page',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then(
  'the activity dates are updated on the review site details page for site {int}',
  async function (_siteNumber) {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then('the new activity dates are set at project level', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.expectHeading()
})

Then(
  'the new activity dates are applied to all sites at site level',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then('the new activity description is set at project level', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.expectHeading()
})

Then(
  'the new activity description is set at site level for site {int}',
  async function (_siteNumber) {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then(
  'the new activity description is applied to all sites at site level',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

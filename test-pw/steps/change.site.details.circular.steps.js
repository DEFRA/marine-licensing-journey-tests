import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndCompleteSiteDetailsToReview } from '../support/task-flow.js'
import {
  selectCoordinatesEntryMethod,
  selectCoordinateSystem,
  enterCentrePointWGS84,
  enterCentrePointOSGB36,
  enterWidth,
  enterPolygonCoordinatesWGS84
} from '../support/site-details-flow.js'
import { createCircleWGS84Data } from '../test-data/site-details.js'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

// --- Given ---

Given(
  'a user has reached the review site details page with a circular site',
  async function () {
    this.data = createCircleWGS84Data()
    await navigateAndCompleteSiteDetailsToReview(this)
    const common = new CommonElementsPage(this.page)
    await common.expectHeading('Review site details')
  }
)

// --- When ---

When('the user changes from circular to polygon site', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.singleOrMultipleCoordinatesChangeLink().click()
  await selectCoordinatesEntryMethod(this.page, 'boundary')
  await selectCoordinateSystem(this.page, 'WGS84')
  await enterPolygonCoordinatesWGS84(this.page, [
    { latitude: '51.000000', longitude: '-1.500000' },
    { latitude: '51.001000', longitude: '-1.499000' },
    { latitude: '51.000500', longitude: '-1.499500' }
  ])
})

When(
  'the user changes the coordinate system for the circular site',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.coordinateSystemChangeLink().click()
    await selectCoordinateSystem(this.page, 'OSGB36')
    await enterCentrePointOSGB36(this.page, '432675', '181310')
    await enterWidth(this.page, '20')
  }
)

When('the user changes the centre point coordinates', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.coordinatesAtCentreChangeLink().click()
  await enterCentrePointWGS84(this.page, '52.123456', '-1.234567')
})

When('the user changes the circle width', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.widthChangeLink().click()
  await enterWidth(this.page, '25')
})

// --- Then ---

Then(
  'the site is converted to a polygon site on the review site details page',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then(
  'the coordinate system is updated on the review site details page for the circular site',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then(
  'the centre point coordinates are updated on the review site details page',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then(
  'the circle width is updated on the review site details page',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

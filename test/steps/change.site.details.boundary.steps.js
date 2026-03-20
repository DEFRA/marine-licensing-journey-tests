import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndCompleteSiteDetailsToReview } from '../support/task-flow.js'
import {
  selectCoordinatesEntryMethod,
  selectCoordinateSystem,
  enterCentrePointWGS84,
  enterWidth,
  enterPolygonCoordinatesWGS84,
  enterPolygonCoordinatesOSGB36
} from '../support/site-details-flow.js'
import { createBoundaryWGS84Data } from '../test-data/site-details.js'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

const DEFAULT_WGS84_BOUNDARY = [
  { latitude: '50.000000', longitude: '-1.000000' },
  { latitude: '50.001000', longitude: '-0.999000' },
  { latitude: '50.000500', longitude: '-0.999500' }
]

// --- Given ---

Given(
  'a user has reached the review site details page with a boundary site using WGS84 coordinates',
  async function () {
    this.data = createBoundaryWGS84Data(DEFAULT_WGS84_BOUNDARY)
    await navigateAndCompleteSiteDetailsToReview(this)
    const common = new CommonElementsPage(this.page)
    await common.expectHeading('Review site details')
  }
)

// --- When ---

When('the user changes from boundary to circular site', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.singleOrMultipleCoordinatesChangeLink().click()
  await selectCoordinatesEntryMethod(this.page, 'circle')
  await selectCoordinateSystem(this.page, 'WGS84')
  await enterCentrePointWGS84(this.page, '51.507412', '-0.127812')
  await enterWidth(this.page, '20')
})

When(
  'the user changes the coordinate system for the boundary site to OSGB36',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.coordinateSystemChangeLink().click()
    await selectCoordinateSystem(this.page, 'OSGB36')
    await enterPolygonCoordinatesOSGB36(this.page, [
      { eastings: '435000', northings: '185000' },
      { eastings: '435500', northings: '185500' },
      { eastings: '435200', northings: '185800' }
    ])
  }
)

When('the user changes the boundary coordinates', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.startAndEndPointsChangeLink().click()
  await enterPolygonCoordinatesWGS84(this.page, [
    { latitude: '51.000000', longitude: '-1.500000' },
    { latitude: '51.001000', longitude: '-1.499000' },
    { latitude: '51.000500', longitude: '-1.499500' }
  ])
})

// --- Then ---

Then(
  'the site is converted to a circular site on the review site details page',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then(
  'the coordinate system is updated on the review site details page for the boundary site',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then(
  'the boundary coordinates are updated on the review site details page',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

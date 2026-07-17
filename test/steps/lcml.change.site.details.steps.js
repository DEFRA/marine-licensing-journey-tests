import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import {
  enterCentrePointOSGB36,
  selectCoordinateSystem,
  enterPolygonCoordinatesOSGB36
} from '../support/site-details-flow.js'
import {
  submitPrimaryAndWait,
  expectReviewSiteDetailsAnchor,
  expectFieldPrePopulated,
  clickCardLinkAndAwaitNavigation
} from '../support/lcml-helpers.js'

async function selectChangeLink(world, fieldKey) {
  world.data.changeField = fieldKey
  const review = new ReviewSiteDetailsPage(world.page)
  await clickCardLinkAndAwaitNavigation(
    world.page,
    review.siteFieldChangeLink(1, fieldKey)
  )
}

When(
  'the user selects the {string} change link for the circular site',
  async function (fieldKey) {
    await selectChangeLink(this, fieldKey)
  }
)

When(
  'the user selects the {string} change link for the polygon site',
  async function (fieldKey) {
    await selectChangeLink(this, fieldKey)
  }
)

Then('the previous answer is pre-populated', async function () {
  await expectFieldPrePopulated(
    this.page,
    this.data.changeField,
    this.data.site
  )
})

Then('the page does not display a Cancel option', async function () {
  await expect(
    this.page.getByRole('link', { name: 'Cancel', exact: true })
  ).toHaveCount(0, { timeout: 30_000 })
  await expect(
    this.page.getByRole('button', { name: 'Cancel', exact: true })
  ).toHaveCount(0, { timeout: 30_000 })
})

When('the user changes the site name and saves', async function () {
  const updated = `Updated Site ${faker.location.city()}`
  this.data.updated = { ...(this.data.updated || {}), siteName: updated }
  await this.page.locator('#siteName').fill(updated)
  await submitPrimaryAndWait(this.page)
})

// AC4 / AC5b — changing the coordinate system is a knock-on mini-flow: it routes
// through the centre-point page (skipping width) back to the review page.
When(
  'the user changes the coordinate system and re-enters the centre point',
  async function () {
    // Circular site default is WGS84 -> switch to OSGB36.
    await selectCoordinateSystem(this.page, 'OSGB36')
    await this.page.waitForLoadState('load')
    this.data.updated = {
      ...(this.data.updated || {}),
      coordinateSystem: 'OSGB36'
    }
  }
)

When(
  'the user enters new centre point coordinates and continues',
  async function () {
    const eastings = '432675'
    const northings = '181310'
    this.data.updated = {
      ...(this.data.updated || {}),
      eastings,
      northings
    }
    await enterCentrePointOSGB36(this.page, eastings, northings)
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user changes the coordinate system and re-enters the boundary coordinates',
  async function () {
    await selectCoordinateSystem(this.page, 'OSGB36')
    await this.page.waitForLoadState('load')
    this.data.updated = {
      ...(this.data.updated || {}),
      coordinateSystem: 'OSGB36'
    }
    await enterPolygonCoordinatesOSGB36(this.page, [
      { eastings: '432675', northings: '181310' },
      { eastings: '433000', northings: '181500' },
      { eastings: '432800', northings: '181700' }
    ])
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the coordinate system on the review page reflects the change',
  async function () {
    const review = new ReviewSiteDetailsPage(this.page)
    await expect(
      review.siteFieldRowValue(1, 'Coordinate system')
    ).toContainText('OSGB36 (National Grid)', { timeout: 30_000 })
  }
)

Then(
  'the width of the circular site is retained on the review page',
  async function () {
    const review = new ReviewSiteDetailsPage(this.page)
    await expect(
      review.siteFieldRowValue(1, 'Width of circular site')
    ).toContainText(`${this.data.site.width} metres`, { timeout: 30_000 })
  }
)

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

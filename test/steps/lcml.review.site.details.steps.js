import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  enterCircleSiteDetails,
  completeTwoManualCircleSites,
  expectReviewSiteDetailsPage as expectOnReviewPage,
  siteCardRow,
  siteCardRowValue,
  coordinateSystemLines,
  givenManualSite
} from '../support/lcml-helpers.js'

// --- Given ---

Given(
  'an organisation user has manually entered a circular site for a marine licence',
  async function () {
    await givenManualSite(this, 'circular')
  }
)

Given(
  'an organisation user has manually entered a polygon site for a marine licence',
  async function () {
    await givenManualSite(this, 'polygon')
  }
)

// --- When ---

When('the user views the review site details page', async function () {
  await expectOnReviewPage(this.page)
})

When('the user continues from the review site details page', async function () {
  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')
})

// --- Then ---

Then(
  'the review site details page is displayed with the project name as the caption',
  async function () {
    await expectOnReviewPage(this.page)
    await expect(
      this.page
        .locator('.govuk-caption-l, .govuk-caption-xl, .govuk-caption-m')
        .first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
  }
)

Then(
  'the polygon site card displays the entered boundary coordinates',
  async function () {
    const page = this.page
    const site = this.data.site

    await expect(
      page.locator('#site-details-1 .govuk-summary-card__title')
    ).toHaveText('Site 1', { timeout: 30_000 })
    await expect(siteCardRowValue(page, 'Site name')).toContainText(
      site.siteName,
      { timeout: 30_000 }
    )
    await expect(
      siteCardRowValue(page, 'Single or multiple sets of coordinates')
    ).toContainText(
      'Enter multiple sets of coordinates to mark the boundary of the site',
      { timeout: 30_000 }
    )

    const systemValue = siteCardRowValue(page, 'Coordinate system')
    for (const line of coordinateSystemLines(site.coordinateSystem)) {
      await expect(systemValue).toContainText(line, { timeout: 30_000 })
    }

    const formatPoint = (c) =>
      site.coordinateSystem === 'OSGB36'
        ? `${c.eastings}, ${c.northings}`
        : `${c.latitude}, ${c.longitude}`

    // First point is shown as "Start and end points".
    await expect(siteCardRowValue(page, 'Start and end points')).toContainText(
      formatPoint(site.coordinates[0]),
      { timeout: 30_000 }
    )

    // Remaining points appear as "Point 2", "Point 3", ...
    for (let i = 1; i < site.coordinates.length; i++) {
      await expect(siteCardRowValue(page, `Point ${i + 1}`)).toContainText(
        formatPoint(site.coordinates[i]),
        { timeout: 30_000 }
      )
    }

    await expect(siteCardRow(page, 'Map view')).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the coordinate rows have no dividing lines between them',
  async function () {
    const page = this.page
    // The "Start and end points" and intermediate "Point N" rows drop their
    // bottom border via govuk-summary-list__row--no-border (AC9).
    await expect(siteCardRow(page, 'Start and end points')).toHaveClass(
      /govuk-summary-list__row--no-border/,
      { timeout: 30_000 }
    )
    await expect(siteCardRow(page, 'Point 2')).toHaveClass(
      /govuk-summary-list__row--no-border/,
      { timeout: 30_000 }
    )
  }
)

Then('the marine licence task list is displayed', async function () {
  await expect(this.page.locator('h1').first()).toContainText(
    'Marine licence start page',
    { timeout: 30_000 }
  )
})

// --- Add another site ---

When('the user selects the Add another site button', async function () {
  // Brief pause after the first site is saved before starting the second, to
  // mitigate an intermittent server error on the second site's save.
  await this.page.waitForTimeout(3_000)
  await this.page
    .locator('button[name="add"]:has-text("Add another site")')
    .click()
  await this.page.waitForLoadState('load')
})

When('the user manually enters another circular site', async function () {
  // Distinct coordinates from the first site — the app rejects a second site
  // that duplicates an existing site's geometry.
  this.data.addedSite = await enterCircleSiteDetails(this, {
    siteName: `Added Site ${faker.location.city()}`,
    latitude: '51.500000',
    longitude: '-2.000000',
    width: '30'
  })
})

Then('site {int} is displayed on the review page', async function (siteNumber) {
  const card = this.page.locator(`#site-details-${siteNumber}`)
  await expect(card).toBeVisible({ timeout: 30_000 })
  await expect(card.locator('.govuk-summary-card__title')).toContainText(
    `Site ${siteNumber}`,
    { timeout: 30_000 }
  )
  // Site 1 is the originally entered site; site 2 is the one added via
  // "Add another site". Verify the card shows that site's name.
  const expectedName =
    siteNumber === 1 ? this.data.site?.siteName : this.data.addedSite?.siteName
  if (expectedName) {
    await expect(
      card.locator(
        '.govuk-summary-list__row:has(dt.govuk-summary-list__key:text-is("Site name")) .govuk-summary-list__value'
      )
    ).toContainText(expectedName, { timeout: 30_000 })
  }
})

// --- Deleting a site ---

Given(
  'an organisation user has manually entered two circular sites for a marine licence',
  async function () {
    await completeTwoManualCircleSites(this)
    await expectOnReviewPage(this.page)
  }
)

When(
  'the user selects the Delete site option for site {int}',
  async function (siteNumber) {
    await this.page
      .locator(
        `#site-details-${siteNumber} .govuk-summary-card__actions a:has-text("Delete site")`
      )
      .click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user selects {string} on the delete site confirmation page',
  async function (option) {
    // Both the "Cancel" link and the "Back" link return to the review page
    // without deleting the site.
    const locator =
      option === 'Back'
        ? this.page.locator('.govuk-back-link')
        : this.page.locator(`main a:has-text("${option}")`)
    await locator.click()
    await this.page.waitForLoadState('load')
  }
)

When('the user deletes site {int}', async function (siteNumber) {
  await this.page
    .locator(
      `#site-details-${siteNumber} .govuk-summary-card__actions a:has-text("Delete site")`
    )
    .click()
  await this.page.waitForLoadState('load')
  await this.page.locator('button:has-text("Yes, delete site")').click()
  await this.page.waitForLoadState('load')
})

// Note: `the review site details page is displayed` is defined in
// lcml.activity.flow.steps.js and reused here.

Then('only {int} site is displayed on the review page', async function (count) {
  await expect(
    this.page.locator('.govuk-summary-card[id^="site-details-"]')
  ).toHaveCount(count, { timeout: 30_000 })
})

Then(
  'the remaining site is re-numbered as site 1 with the second site name',
  async function () {
    await expect(
      this.page.locator('#site-details-1 .govuk-summary-card__title')
    ).toHaveText('Site 1', { timeout: 30_000 })
    await expect(siteCardRowValue(this.page, 'Site name')).toContainText(
      this.data.sites[1].siteName,
      { timeout: 30_000 }
    )
  }
)

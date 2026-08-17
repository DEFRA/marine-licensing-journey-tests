import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  uploadCoordinatesFile,
  completeActivityDetailsFromReview
} from '../support/lcml-helpers.js'
import {
  addSiteNameFromReview,
  selectFileType,
  uploadFile
} from '../support/site-details-flow.js'
import { completeRandomActivityFromReviewPage } from '../support/lcml-activity-flow.js'

const SAMPLE_FILES = {
  KML: 'test/resources/EXE_2025_00009-LOCATIONS-without-site-name.kml',
  Shapefile: 'test/resources/valid-shapefile-without-site-name.zip',
  // EXE_2025_00098-LOCATIONS-without-site-name.kml contains two sites
  'multi-site': 'test/resources/EXE_2025_00098-LOCATIONS-without-site-name.kml'
}

function changeSiteLocationLink(page, siteNumber) {
  return page.locator(
    `#site-details-${siteNumber} .govuk-summary-card__actions a:has-text("Change site location")`
  )
}

// Reads the uploaded file name encoded in the map's data-site-details attribute
async function getSiteMapFilename(page, siteNumber) {
  const raw = await page
    .locator(`#site-details-${siteNumber} .app-site-details-map`)
    .getAttribute('data-site-details')
  return JSON.parse(raw)?.uploadedFile?.filename
}

// --- Given ---

Given(
  'an organisation user has uploaded a valid {string} file, named site {int} and added activity details',
  async function (fileType, siteNumber) {
    await uploadCoordinatesFile(this, fileType)
    this.data.siteName = await addSiteNameFromReview(this.page, siteNumber)
    await completeRandomActivityFromReviewPage(this)
    await completeActivityDetailsFromReview(this, 'Site 1 - Activity 1')
  }
)

Given(
  'an organisation user is on the change site location upload page for site {int} with file type {string}',
  async function (siteNumber, fileType) {
    await uploadCoordinatesFile(this, 'KML')
    await changeSiteLocationLink(this.page, siteNumber).click()
    await this.page.waitForLoadState('load')
    await this.page
      .getByRole('button', { name: /yes, change site location/i })
      .click()
    await this.page.waitForLoadState('load')
    await selectFileType(this.page, fileType)
    await this.page.waitForLoadState('load')
  }
)

// --- When ---

When(
  'the user selects {string} for site {int}',
  async function (linkText, siteNumber) {
    // Remember the current location so cancel/back scenarios can assert no change
    this.data.originalMapFilename = await getSiteMapFilename(
      this.page,
      siteNumber
    )
    await this.page
      .locator(
        `#site-details-${siteNumber} .govuk-summary-card__actions a:has-text("${linkText}")`
      )
      .click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user uploads a file containing more than one site',
  async function () {
    await uploadFile(this.page, SAMPLE_FILES['multi-site'])
    await this.page.waitForLoadState('load')
    // Validation keeps us on the upload-file page; allow the spinner to settle
    await this.page
      .waitForURL((url) => !url.toString().includes('upload-and-wait'), {
        timeout: 60_000
      })
      .catch(() => {})
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user changes the location of site {int} by uploading a single {string} file',
  async function (siteNumber, fileType) {
    this.data.originalMapFilename = await getSiteMapFilename(
      this.page,
      siteNumber
    )
    await changeSiteLocationLink(this.page, siteNumber).click()
    await this.page.waitForLoadState('load')
    await this.page
      .getByRole('button', { name: /yes, change site location/i })
      .click()
    await this.page.waitForLoadState('load')
    await selectFileType(this.page, fileType)
    await this.page.waitForLoadState('load')
    await uploadFile(this.page, SAMPLE_FILES[fileType])
    await this.page.waitForLoadState('load')
    await this.page
      .waitForURL((url) => !url.toString().includes('upload-and-wait'), {
        timeout: 60_000
      })
      .catch(() => {})
    await this.page.waitForLoadState('load')
    this.data.newFileName = SAMPLE_FILES[fileType].split('/').pop()
  }
)

Then(
  'the change site location confirmation page is displayed',
  async function () {
    await expect(this.page).toHaveURL(/change-site-location/, {
      timeout: 30_000
    })
    await expect(this.page.locator('h1').first()).toContainText(
      'Change site location',
      { timeout: 30_000 }
    )
  }
)

Then(
  'the confirmation page shows the site reference {string}',
  async function (reference) {
    await expect(this.page.locator('.govuk-inset-text')).toHaveText(reference, {
      timeout: 30_000
    })
  }
)

Then(
  'the confirmation page shows the stored site name prefixed with {string}',
  async function (prefix) {
    await expect(this.page.locator('.govuk-inset-text')).toHaveText(
      `${prefix}: ${this.data.siteName}`,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the upload file page asks for a single site file only',
  async function () {
    await expect(this.page).toHaveURL(/upload-file/, { timeout: 30_000 })
    await expect(
      this.page.locator('main, #main-content').first()
    ).toContainText('The file you upload must be for a single site', {
      timeout: 30_000
    })
  }
)

Then(
  'the upload file page states point and line sites are not allowed',
  async function () {
    await expect(
      this.page.locator('main, #main-content').first()
    ).toContainText('not a point or a line', { timeout: 30_000 })
  }
)

Then(
  'a single site upload error is displayed with message {string}',
  async function (message) {
    await expect(this.page.locator('.govuk-error-summary')).toContainText(
      message,
      { timeout: 30_000 }
    )
    await expect(this.page.locator('#file-id-error')).toContainText(message, {
      timeout: 30_000
    })
  }
)

Then(
  'the review site details page is displayed scrolled to site {int}',
  async function (siteNumber) {
    await expect(this.page).toHaveURL(
      new RegExp(`review-site-details#site-details-${siteNumber}`),
      { timeout: 30_000 }
    )
    await expect(this.page.locator('h1').first()).toContainText(
      'Review site details',
      { timeout: 30_000 }
    )
  }
)

Then('the site {int} name is retained', async function (siteNumber) {
  await expect(
    this.page.locator(
      `#site-details-${siteNumber} .govuk-summary-list__row:has(dt:text("Site name")) .govuk-summary-list__value`
    )
  ).toContainText(this.data.siteName, { timeout: 30_000 })
})

Then(
  'the site {int} activity details are retained',
  async function (siteNumber) {
    const cardTitle = `Site ${siteNumber} - Activity 1`
    const card = this.page.locator(
      `.govuk-summary-card:has(.govuk-summary-card__title:text("${cardTitle}"))`
    )
    await expect(card).toBeVisible({ timeout: 30_000 })
    await expect(
      card.locator(
        '.govuk-summary-list__row:has(dt:text("Activity description")) .govuk-summary-list__value'
      )
    ).toContainText(this.data.activityDetails[cardTitle].activityDescription, {
      timeout: 30_000
    })
  }
)

Then(
  'the site {int} location reflects the new uploaded file',
  async function (siteNumber) {
    const filename = await getSiteMapFilename(this.page, siteNumber)
    expect(filename).toBe(this.data.newFileName)
    expect(filename).not.toBe(this.data.originalMapFilename)
  }
)

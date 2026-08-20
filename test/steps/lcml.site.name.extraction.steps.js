import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  loginAndNavigateToUploadPage,
  uploadFileAndWaitForReviewPage
} from '../support/lcml-helpers.js'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'

const SITE_NAME_FIXTURES = {
  KML: {
    'with a site name':
      'test/resources/EXE_2025_00009-LOCATIONS-with-site-name.kml',
    'without a site name':
      'test/resources/EXE_2025_00009-LOCATIONS-without-site-name.kml'
  },
  Shapefile: {
    'with a site name': 'test/resources/valid-shapefile-with-site-name.zip',
    'without a site name':
      'test/resources/valid-shapefile-without-site-name.zip'
  }
}

Given(
  'an organisation user is on the {string} file upload page',
  async function (fileType) {
    await loginAndNavigateToUploadPage(this, fileType)
    this.data.fileType = fileType
  }
)

When('the user uploads a file {string}', async function (variant) {
  const filePath = SITE_NAME_FIXTURES[this.data.fileType][variant]
  await uploadFileAndWaitForReviewPage(this, this.data.fileType, filePath)
})

Then(
  'site {int} shows the site name {string} with the {string} link on the review site details page',
  async function (siteNumber, siteName, link) {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    const linkLocator =
      link === 'Change'
        ? reviewPage.siteNameChangeLink(siteNumber)
        : reviewPage.siteNameAddLink(siteNumber)
    await expect(linkLocator).toBeVisible({ timeout: 30_000 })
    if (siteName) {
      await expect(reviewPage.siteNameValue(siteNumber)).toContainText(
        siteName,
        { timeout: 30_000 }
      )
    }
  }
)

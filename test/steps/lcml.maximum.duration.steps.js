import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  activityCardLocator,
  clickCardLinkAndAwaitNavigation,
  expectOnReviewSiteDetailsPage,
  uploadCoordinatesFile
} from '../support/lcml-helpers.js'

const YEARS_FIELD = '#activity-duration-years'
const MONTHS_FIELD = '#activity-duration-months'
const SAVE_AND_CONTINUE_BUTTON =
  'button[type="submit"]:has-text("Save and continue")'

function durationRow(page, cardTitle) {
  return activityCardLocator(page, cardTitle).locator(
    '.govuk-summary-list__row:has(dt:text-is("Maximum duration of activity"))'
  )
}

async function clickDurationAddLink(page, cardTitle) {
  await clickCardLinkAndAwaitNavigation(
    page,
    durationRow(page, cardTitle).locator('a:text-is("Add")')
  )
}

async function fillDurationAndSave(page, years, months) {
  await page.locator(YEARS_FIELD).fill(years)
  await page.locator(MONTHS_FIELD).fill(months)
  await page.locator(SAVE_AND_CONTINUE_BUTTON).click()
  await page.waitForLoadState('load')
}

async function expectOnDurationPage(page) {
  await expect(page.locator('h1')).toContainText(
    'What is the maximum duration of the activity?',
    { timeout: 30_000 }
  )
}

Then(
  'the maximum duration of the activity page is displayed',
  async function () {
    await expectOnDurationPage(this.page)
  }
)

Then(
  'the duration page caption shows the project name and {string}',
  async function (activityLabel) {
    const captions = this.page.locator(
      '.govuk-caption-l, .govuk-caption-m, .govuk-caption-xl'
    )
    await expect(captions.first()).toContainText(this.data.projectName, {
      timeout: 30_000
    })
    await expect(this.page.locator('main')).toContainText(activityLabel, {
      timeout: 30_000
    })
  }
)

Then('the years and months textboxes are empty', async function () {
  await expect(this.page.locator(YEARS_FIELD)).toHaveValue('', {
    timeout: 30_000
  })
  await expect(this.page.locator(MONTHS_FIELD)).toHaveValue('', {
    timeout: 30_000
  })
})

Given(
  'the user is on the duration page for {string} after uploading a {string} file',
  async function (cardTitle, fileType) {
    await uploadCoordinatesFile(this, fileType)
    await clickDurationAddLink(this.page, cardTitle)
    await expectOnDurationPage(this.page)
  }
)

When(
  'the user enters {string} years and {string} months and saves',
  async function (years, months) {
    await fillDurationAndSave(this.page, years, months)
  }
)

Given(
  'an organisation user has saved {string} years and {string} months as the duration for {string} after uploading a {string} file',
  async function (years, months, cardTitle, fileType) {
    await uploadCoordinatesFile(this, fileType)
    await clickDurationAddLink(this.page, cardTitle)
    await expectOnDurationPage(this.page)
    await fillDurationAndSave(this.page, years, months)
    await expectOnReviewSiteDetailsPage(this.page)
  }
)

Then(
  'the years textbox contains {string} and the months textbox contains {string}',
  async function (yearsValue, monthsValue) {
    await expect(this.page.locator(YEARS_FIELD)).toHaveValue(yearsValue, {
      timeout: 30_000
    })
    await expect(this.page.locator(MONTHS_FIELD)).toHaveValue(monthsValue, {
      timeout: 30_000
    })
  }
)

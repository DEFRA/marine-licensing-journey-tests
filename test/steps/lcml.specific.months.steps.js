import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  activityCardLocator,
  expectOnReviewSiteDetailsPage,
  uploadRandomCoordinatesFile
} from '../support/lcml-helpers.js'

const YES_RADIO = '#months'
const NO_RADIO = '#months-2'
const DETAILS_TEXTAREA = '#details'
const SAVE_AND_CONTINUE_BUTTON =
  'button[type="submit"]:has-text("Save and continue")'

function specificMonthsRow(page, cardTitle) {
  return activityCardLocator(page, cardTitle).locator(
    '.govuk-summary-list__row:has(dt:text-is("Activity limited to specific months"))'
  )
}

async function clickSpecificMonthsAddLink(page, cardTitle) {
  await specificMonthsRow(page, cardTitle).locator('a:text-is("Add")').click()
  await page.waitForLoadState('load')
}

async function expectOnSpecificMonthsPage(page) {
  await expect(page.locator('h1')).toContainText(
    'Will the activity be limited to specific months of the year?',
    { timeout: 30_000 }
  )
}

function radioByLabel(label) {
  return label === 'Yes' ? YES_RADIO : NO_RADIO
}

Then(
  'the activity limited to specific months page is displayed',
  async function () {
    await expectOnSpecificMonthsPage(this.page)
  }
)

Then(
  'the specific months page caption shows the project name and {string}',
  async function (activityLabel) {
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
    await expect(this.page.locator('main')).toContainText(activityLabel, {
      timeout: 30_000
    })
  }
)

Then(
  'neither specific months radio is selected and the details textbox is hidden',
  async function () {
    await expect(this.page.locator(YES_RADIO)).not.toBeChecked({
      timeout: 30_000
    })
    await expect(this.page.locator(NO_RADIO)).not.toBeChecked({
      timeout: 30_000
    })
    await expect(this.page.locator(DETAILS_TEXTAREA)).toBeHidden({
      timeout: 30_000
    })
  }
)

Given(
  'the user is on the specific months page for {string} after uploading a coordinates file',
  async function (cardTitle) {
    await uploadRandomCoordinatesFile(this)
    await clickSpecificMonthsAddLink(this.page, cardTitle)
    await expectOnSpecificMonthsPage(this.page)
  }
)

When(
  'the user selects the {string} specific months option',
  async function (label) {
    await this.page.locator(radioByLabel(label)).check()
  }
)

Then('the specific months details textbox is visible', async function () {
  await expect(this.page.locator(DETAILS_TEXTAREA)).toBeVisible({
    timeout: 30_000
  })
})

Then('the specific months details textbox is hidden', async function () {
  await expect(this.page.locator(DETAILS_TEXTAREA)).toBeHidden({
    timeout: 30_000
  })
})

When(
  'the user selects {string} and enters {string} as specific months details and saves',
  async function (label, details) {
    await this.page.locator(radioByLabel(label)).check()
    await this.page.locator(DETAILS_TEXTAREA).fill(details)
    await this.page.locator(SAVE_AND_CONTINUE_BUTTON).click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user selects {string} and saves the specific months page',
  async function (label) {
    await this.page.locator(radioByLabel(label)).check()
    await this.page.locator(SAVE_AND_CONTINUE_BUTTON).click()
    await this.page.waitForLoadState('load')
  }
)

Given(
  'an organisation user has saved {string} with specific months details {string} for {string} after uploading a coordinates file',
  async function (label, details, cardTitle) {
    await uploadRandomCoordinatesFile(this)
    await clickSpecificMonthsAddLink(this.page, cardTitle)
    await expectOnSpecificMonthsPage(this.page)
    await this.page.locator(radioByLabel(label)).check()
    if (label === 'Yes') {
      await this.page.locator(DETAILS_TEXTAREA).fill(details)
    }
    await this.page.locator(SAVE_AND_CONTINUE_BUTTON).click()
    await this.page.waitForLoadState('load')
    await expectOnReviewSiteDetailsPage(this.page)
  }
)

Then('the {string} specific months radio is selected', async function (label) {
  await expect(this.page.locator(radioByLabel(label))).toBeChecked({
    timeout: 30_000
  })
})

Then(
  'the specific months details textbox contains {string}',
  async function (expectedText) {
    await expect(this.page.locator(DETAILS_TEXTAREA)).toHaveValue(
      expectedText,
      {
        timeout: 30_000
      }
    )
  }
)

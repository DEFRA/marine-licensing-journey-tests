import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  activityCardLocator,
  clickCardLinkAndAwaitNavigation,
  expectOnReviewSiteDetailsPage,
  uploadCoordinatesFile
} from '../support/lcml-helpers.js'

const YES_RADIO = '#date'
const NO_RADIO = '#date-2'
const REASON_TEXTAREA = '#reason'
const REASON_ERROR = '#reason-error'
const SAVE_AND_CONTINUE_BUTTON =
  'button[type="submit"]:has-text("Save and continue")'

function completionDateRow(page, cardTitle) {
  return activityCardLocator(page, cardTitle).locator(
    '.govuk-summary-list__row:has(dt:text-is("Completion date"))'
  )
}

async function clickCompletionDateAddLink(page, cardTitle) {
  await clickCardLinkAndAwaitNavigation(
    page,
    completionDateRow(page, cardTitle).locator('a:text-is("Add")')
  )
}

async function expectOnCompletionDatePage(page) {
  await expect(page.locator('h1')).toContainText(
    'Does any part of the activity need to be completed by a certain date?',
    { timeout: 30_000 }
  )
}

function radioByLabel(label) {
  return label === 'Yes' ? YES_RADIO : NO_RADIO
}

Then('the completion date page is displayed', async function () {
  await expectOnCompletionDatePage(this.page)
})

Then(
  'the completion date page caption shows the project name and {string}',
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
  'neither completion date radio is selected and the reason textbox is hidden',
  async function () {
    await expect(this.page.locator(YES_RADIO)).not.toBeChecked({
      timeout: 30_000
    })
    await expect(this.page.locator(NO_RADIO)).not.toBeChecked({
      timeout: 30_000
    })
    await expect(this.page.locator(REASON_TEXTAREA)).toBeHidden({
      timeout: 30_000
    })
  }
)

Given(
  'the user is on the completion date page for {string} after uploading a {string} file',
  async function (cardTitle, fileType) {
    await uploadCoordinatesFile(this, fileType)
    await clickCompletionDateAddLink(this.page, cardTitle)
    await expectOnCompletionDatePage(this.page)
  }
)

When(
  'the user selects the {string} completion date option',
  async function (label) {
    await this.page.locator(radioByLabel(label)).check()
  }
)

Then('the completion date reason textbox is visible', async function () {
  await expect(this.page.locator(REASON_TEXTAREA)).toBeVisible({
    timeout: 30_000
  })
})

Then('the completion date reason textbox is hidden', async function () {
  await expect(this.page.locator(REASON_TEXTAREA)).toBeHidden({
    timeout: 30_000
  })
})

When(
  'the user selects {string} and enters a reason with {int} characters and saves',
  async function (label, length) {
    await this.page.locator(radioByLabel(label)).check()
    await this.page
      .locator(REASON_TEXTAREA)
      .fill(faker.string.alpha({ length }))
    await this.page.locator(SAVE_AND_CONTINUE_BUTTON).click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user selects {string} and enters {string} as the reason and saves',
  async function (label, reason) {
    await this.page.locator(radioByLabel(label)).check()
    await this.page.locator(REASON_TEXTAREA).fill(reason)
    await this.page.locator(SAVE_AND_CONTINUE_BUTTON).click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user selects {string} and saves the completion date',
  async function (label) {
    await this.page.locator(radioByLabel(label)).check()
    await this.page.locator(SAVE_AND_CONTINUE_BUTTON).click()
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the completion date reason error {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator(REASON_ERROR)).toContainText(errorMessage, {
      timeout: 30_000
    })
  }
)

Given(
  'an organisation user has saved {string} with reason {string} for the completion date for {string} after uploading a {string} file',
  async function (label, reason, cardTitle, fileType) {
    await uploadCoordinatesFile(this, fileType)
    await clickCompletionDateAddLink(this.page, cardTitle)
    await expectOnCompletionDatePage(this.page)
    await this.page.locator(radioByLabel(label)).check()
    if (label === 'Yes') {
      await this.page.locator(REASON_TEXTAREA).fill(reason)
    }
    await this.page.locator(SAVE_AND_CONTINUE_BUTTON).click()
    await this.page.waitForLoadState('load')
    await expectOnReviewSiteDetailsPage(this.page)
  }
)

Then('the {string} completion date radio is selected', async function (label) {
  await expect(this.page.locator(radioByLabel(label))).toBeChecked({
    timeout: 30_000
  })
})

Then(
  'the completion date reason textbox contains {string}',
  async function (expectedText) {
    await expect(this.page.locator(REASON_TEXTAREA)).toHaveValue(expectedText, {
      timeout: 30_000
    })
  }
)

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  activityCardLocator,
  expectOnReviewSiteDetailsPage,
  uploadCoordinatesFile
} from '../support/lcml-helpers.js'

const ACTIVITY_DESCRIPTION_FIELD = '#activityDescription'
const ACTIVITY_DESCRIPTION_ERROR = '#activityDescription-error'
const SAVE_AND_CONTINUE_BUTTON =
  'button[type="submit"]:has-text("Save and continue")'

function activityDescriptionRow(page, cardTitle) {
  return activityCardLocator(page, cardTitle).locator(
    '.govuk-summary-list__row:has(dt:text-is("Activity description"))'
  )
}

async function clickActivityDescriptionAddLink(page, cardTitle) {
  await activityDescriptionRow(page, cardTitle).locator('a:text("Add")').click()
  await page.waitForLoadState('load')
}

async function fillActivityDescriptionAndSave(page, text) {
  await page.locator(ACTIVITY_DESCRIPTION_FIELD).fill(text)
  await page.locator(SAVE_AND_CONTINUE_BUTTON).click()
  await page.waitForLoadState('load')
}

async function expectOnActivityDescriptionPage(page) {
  await expect(page.locator('h1')).toContainText('Activity description', {
    timeout: 30_000
  })
}

When(
  'the user selects the {string} task for {string}',
  async function (taskName, cardTitle) {
    const row = activityCardLocator(this.page, cardTitle).locator(
      `.govuk-summary-list__row:has(dt:text-is("${taskName}"))`
    )
    await row.locator('a:text("Add")').click()
    await this.page.waitForLoadState('load')
  }
)

Then('the {string} page is displayed', async function (pageTitle) {
  await expect(this.page.locator('h1')).toContainText(pageTitle, {
    timeout: 30_000
  })
})

Then(
  'the page caption shows the project name and {string}',
  async function (activityLabel) {
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
    await expect(this.page.locator('main')).toContainText(activityLabel, {
      timeout: 30_000
    })
  }
)

Then('the activity description textbox is empty', async function () {
  await expect(this.page.locator(ACTIVITY_DESCRIPTION_FIELD)).toHaveValue('', {
    timeout: 30_000
  })
})

Given(
  'the user is on the activity description page for {string} after uploading a {string} file',
  async function (cardTitle, fileType) {
    await uploadCoordinatesFile(this, fileType)
    await clickActivityDescriptionAddLink(this.page, cardTitle)
    await expectOnActivityDescriptionPage(this.page)
  }
)

When(
  'the user enters an activity description with {int} characters and saves',
  async function (length) {
    const text = faker.string.alpha({ length })
    await fillActivityDescriptionAndSave(this.page, text)
  }
)

When(
  'the user enters a random activity description and saves',
  async function () {
    const text = faker.lorem.sentence(8)
    this.data.activityDescription = text
    await fillActivityDescriptionAndSave(this.page, text)
  }
)

Then(
  'the activity description error {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator(ACTIVITY_DESCRIPTION_ERROR)).toContainText(
      errorMessage,
      { timeout: 30_000 }
    )
  }
)

Then('the user is returned to the review site details page', async function () {
  await expectOnReviewSiteDetailsPage(this.page)
})

Then(
  'the {string} row for {string} shows {string}',
  async function (rowName, cardTitle, expectedValue) {
    const row = activityCardLocator(this.page, cardTitle).locator(
      `.govuk-summary-list__row:has(dt:text-is("${rowName}"))`
    )
    await expect(row.locator('.govuk-summary-list__value')).toContainText(
      expectedValue,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the action for the {string} row for {string} is {string}',
  async function (rowName, cardTitle, expectedAction) {
    const row = activityCardLocator(this.page, cardTitle).locator(
      `.govuk-summary-list__row:has(dt:text-is("${rowName}"))`
    )
    await expect(row.locator('.govuk-summary-list__actions a')).toContainText(
      expectedAction,
      { timeout: 30_000 }
    )
  }
)

Given(
  'an organisation user has saved a random activity description for {string} after uploading a {string} file',
  async function (cardTitle, fileType) {
    await uploadCoordinatesFile(this, fileType)
    const text = faker.lorem.sentence(8)
    this.data.activityDescription = text
    await clickActivityDescriptionAddLink(this.page, cardTitle)
    await expectOnActivityDescriptionPage(this.page)
    await fillActivityDescriptionAndSave(this.page, text)
    await expectOnReviewSiteDetailsPage(this.page)
  }
)

When(
  'the user selects the {string} link for the {string} row for {string}',
  async function (linkText, rowName, cardTitle) {
    const row = activityCardLocator(this.page, cardTitle).locator(
      `.govuk-summary-list__row:has(dt:text-is("${rowName}"))`
    )
    await row.locator(`a:text-is("${linkText}")`).click()
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the {string} row for {string} shows the entered activity description',
  async function (rowName, cardTitle) {
    const row = this.page
      .locator(
        `.govuk-summary-card:has(.govuk-summary-card__title:text("${cardTitle}"))`
      )
      .locator(`.govuk-summary-list__row:has(dt:text-is("${rowName}"))`)
    await expect(row.locator('.govuk-summary-list__value')).toContainText(
      this.data.activityDescription,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the activity description textbox contains the previously entered description',
  async function () {
    await expect(this.page.locator(ACTIVITY_DESCRIPTION_FIELD)).toHaveValue(
      this.data.activityDescription,
      { timeout: 30_000 }
    )
  }
)

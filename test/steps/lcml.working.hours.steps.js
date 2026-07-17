import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  activityCardLocator,
  clickCardLinkAndAwaitNavigation,
  expectOnReviewSiteDetailsPage,
  uploadRandomCoordinatesFile
} from '../support/lcml-helpers.js'

const WORKING_HOURS_FIELD = '#workingHours'
const SAVE_AND_CONTINUE_BUTTON =
  'button[type="submit"]:has-text("Save and continue")'

function workingHoursRow(page, cardTitle) {
  return activityCardLocator(page, cardTitle).locator(
    '.govuk-summary-list__row:has(dt:text-is("Proposed working hours"))'
  )
}

async function clickWorkingHoursAddLink(page, cardTitle) {
  await clickCardLinkAndAwaitNavigation(
    page,
    workingHoursRow(page, cardTitle).locator('a:text-is("Add")')
  )
}

async function fillWorkingHoursAndSave(page, text) {
  await page.locator(WORKING_HOURS_FIELD).fill(text)
  await page.locator(SAVE_AND_CONTINUE_BUTTON).click()
  await page.waitForLoadState('load')
}

async function expectOnWorkingHoursPage(page) {
  await expect(page.locator('h1')).toContainText(
    'What are the proposed working hours?',
    { timeout: 30_000 }
  )
}

Then('the proposed working hours page is displayed', async function () {
  await expectOnWorkingHoursPage(this.page)
})

Then(
  'the working hours page caption shows the project name and {string}',
  async function (activityLabel) {
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
    await expect(this.page.locator('main')).toContainText(activityLabel, {
      timeout: 30_000
    })
  }
)

Then('the proposed working hours textbox is empty', async function () {
  await expect(this.page.locator(WORKING_HOURS_FIELD)).toHaveValue('', {
    timeout: 30_000
  })
})

Given(
  'the user is on the proposed working hours page for {string} after uploading a coordinates file',
  async function (cardTitle) {
    await uploadRandomCoordinatesFile(this)
    await clickWorkingHoursAddLink(this.page, cardTitle)
    await expectOnWorkingHoursPage(this.page)
  }
)

When(
  'the user enters random proposed working hours and saves',
  async function () {
    const text = faker.lorem.sentence(8)
    this.data.workingHours = text
    await fillWorkingHoursAndSave(this.page, text)
  }
)

Then(
  'the {string} row for {string} shows the entered proposed working hours',
  async function (rowName, cardTitle) {
    const row = activityCardLocator(this.page, cardTitle).locator(
      `.govuk-summary-list__row:has(dt:text-is("${rowName}"))`
    )
    await expect(row.locator('.govuk-summary-list__value')).toContainText(
      this.data.workingHours,
      { timeout: 30_000 }
    )
  }
)

Given(
  'an organisation user has saved random proposed working hours for {string} after uploading a coordinates file',
  async function (cardTitle) {
    await uploadRandomCoordinatesFile(this)
    const text = faker.lorem.sentence(8)
    this.data.workingHours = text
    await clickWorkingHoursAddLink(this.page, cardTitle)
    await expectOnWorkingHoursPage(this.page)
    await fillWorkingHoursAndSave(this.page, text)
    await expectOnReviewSiteDetailsPage(this.page)
  }
)

Then(
  'the proposed working hours textbox contains the previously entered value',
  async function () {
    await expect(this.page.locator(WORKING_HOURS_FIELD)).toHaveValue(
      this.data.workingHours,
      { timeout: 30_000 }
    )
  }
)

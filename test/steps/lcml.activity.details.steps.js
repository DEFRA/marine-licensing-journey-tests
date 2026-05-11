import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  uploadCoordinatesFile,
  uploadRandomCoordinatesFile
} from '../support/lcml-helpers.js'

const ACTIVITY_FIELDS = [
  'Type of activity',
  'Activity description',
  'Maximum duration of activity',
  'Completion date',
  'Activity limited to specific months',
  'Proposed working hours'
]

Given(
  'an organisation user has uploaded a valid {string} file and is on the review site details page',
  async function (fileType) {
    await uploadCoordinatesFile(this, fileType)
  }
)

Given(
  'an organisation user has uploaded a coordinates file and is on the review site details page',
  async function () {
    await uploadRandomCoordinatesFile(this)
  }
)

Then(
  'an activity details card titled {string} is displayed with all fields as Incomplete',
  async function (cardTitle) {
    const card = this.page.locator(
      `.govuk-summary-card:has(.govuk-summary-card__title:text("${cardTitle}"))`
    )
    await expect(card).toBeVisible({ timeout: 30_000 })

    for (const field of ACTIVITY_FIELDS) {
      const row = card.locator(
        `.govuk-summary-list__row:has(dt:text-is("${field}"))`
      )
      await expect(row).toBeVisible({ timeout: 30_000 })
      await expect(row.locator('.govuk-summary-list__value')).toContainText(
        'Incomplete',
        { timeout: 30_000 }
      )
      await expect(row.locator('a:text("Add")')).toBeVisible({
        timeout: 30_000
      })
    }
  }
)

Then('an {string} button is displayed', async function (buttonText) {
  await expect(
    this.page.locator(`button:has-text("${buttonText}")`)
  ).toBeVisible({ timeout: 30_000 })
})

When('the user clicks the {string} button', async function (buttonText) {
  await this.page.locator(`button:has-text("${buttonText}")`).click()
  await this.page.waitForLoadState('load')
})

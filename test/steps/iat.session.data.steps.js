import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { startIat, followIatStep } from '../support/iat-walk.js'

const TO_ACTIVITY_TYPE = [
  'In or over the sea',
  'English waters or Northern Ireland offshore waters'
]

async function reachActivityTypePage(world) {
  await startIat(world)
  for (const label of TO_ACTIVITY_TYPE) {
    await followIatStep(world.page, label)
  }
}

Given(
  'the user selects {string} on the IAT activity type page',
  async function (answer) {
    await reachActivityTypePage(this)
    // Remember the activity type question URL (carries the context slug) so we
    // can return to it and read back the saved answer.
    this.iatQuestionUrl = this.page.url()
    await followIatStep(this.page, answer)
  }
)

Given(
  'the user selects {string} on the IAT construction subtype page',
  async function (answer) {
    await reachActivityTypePage(this)
    await followIatStep(this.page, 'Construction')
    this.iatQuestionUrl = this.page.url()
    await followIatStep(this.page, answer)
  }
)

When('the user returns to that IAT page', async function () {
  await this.page.goto(this.iatQuestionUrl)
  await this.page.waitForLoadState('load')
})

Then('the saved IAT answer has id {string}', async function (expectedId) {
  // Each radio renders with value=answer.id and is pre-selected from the saved
  // session, so the checked radio's value is the id persisted for this answer.
  const checked = this.page.locator('input[type="radio"]:checked')
  await expect(checked).toHaveCount(1, { timeout: 30_000 })
  await expect(checked).toHaveValue(expectedId, { timeout: 30_000 })
})

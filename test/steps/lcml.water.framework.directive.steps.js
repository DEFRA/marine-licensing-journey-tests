import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { loginAndStartApplication } from '../support/lcml-helpers.js'

const TASK_LINK = 'Water Framework Directive assessment'
const NAUTICAL_MILE_PATH =
  '/marine-licence/water-framework-directive-nautical-mile'
const NAUTICAL_MILE_RADIO_IDS = { Yes: '#nauticalMile', No: '#nauticalMile-2' }

async function openWfdTask(page) {
  await page.getByRole('link', { name: TASK_LINK }).click()
  await page.waitForLoadState('load')
}

Then(
  'the {string} section heading is displayed on the task list',
  async function (heading) {
    await expect(
      this.page.getByRole('heading', { name: heading, level: 2, exact: true })
    ).toBeVisible({ timeout: 30_000 })
  }
)

Given(
  'an organisation user is on the One nautical mile WFD page',
  async function () {
    await loginAndStartApplication(this, 'organisation')
    await openWfdTask(this.page)
    await this.page.locator('a.govuk-button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
    await expect(this.page).toHaveURL(new RegExp(NAUTICAL_MILE_PATH), {
      timeout: 30_000
    })
  }
)

When(
  'the user selects {string} and continues on the One nautical mile page',
  async function (answer) {
    await this.page.locator(NAUTICAL_MILE_RADIO_IDS[answer]).click()
    await this.page.locator('main button[type="submit"]').click()
    await this.page.waitForLoadState('load')
  }
)

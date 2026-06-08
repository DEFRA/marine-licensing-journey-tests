import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { loginAndStartApplication } from '../support/lcml-helpers.js'

const TASK_LINK = 'Water Framework Directive assessment'
const PAGE_PATH = '/marine-licence/water-framework-directive-before-you-start'
const NAUTICAL_MILE_PATH =
  '/marine-licence/water-framework-directive-nautical-mile'
const GUIDANCE_URL =
  'https://www.gov.uk/guidance/water-framework-directive-assessment-estuarine-and-coastal-waters'
const NAUTICAL_MILE_RADIO_IDS = { Yes: '#nauticalMile', No: '#nauticalMile-2' }

async function openWfdTask(page) {
  await page.getByRole('link', { name: TASK_LINK }).click()
  await page.waitForLoadState('load')
}

async function expectOnWfdPage(page) {
  await expect(page).toHaveURL(new RegExp(PAGE_PATH), { timeout: 30_000 })
  await expect(page.locator('main h1')).toContainText(
    'Water Framework Directive',
    {
      timeout: 30_000
    }
  )
  await expect(
    page.getByRole('heading', { name: 'Before you start', level: 2 })
  ).toBeVisible({ timeout: 30_000 })
}

When(
  'the user opens the Water Framework Directive assessment task',
  async function () {
    await openWfdTask(this.page)
  }
)

Then(
  'the {string} section heading is displayed on the task list',
  async function (heading) {
    await expect(
      this.page.getByRole('heading', { name: heading, level: 2, exact: true })
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the Before you start WFD page is displayed with the project name in the caption',
  async function () {
    await expectOnWfdPage(this.page)
    await expect(
      this.page.locator('main .govuk-caption-l').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
  }
)

Then(
  'the {string} section is initially collapsed',
  async function (summaryText) {
    const details = this.page.locator(
      `details.govuk-details:has(summary:has-text("${summaryText}"))`
    )
    await expect(details).toBeVisible({ timeout: 30_000 })
    expect(await details.evaluate((el) => el.open)).toBe(false)
  }
)

Then(
  'the guidance link opens the Water Framework Directive guidance on gov.uk in a new tab',
  async function () {
    const link = this.page.locator(
      'main a:has-text("Read the guidance Water Framework Directive")'
    )
    await expect(link).toBeVisible({ timeout: 30_000 })
    await expect(link).toHaveAttribute('href', GUIDANCE_URL, {
      timeout: 30_000
    })
    await expect(link).toHaveAttribute('target', '_blank', { timeout: 30_000 })
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

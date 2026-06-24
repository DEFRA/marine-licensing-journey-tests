import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  loginAndStartApplication,
  completeManualCircleApp,
  submitMarineLicence,
  WFD_ASSESSMENT_FILE
} from '../support/lcml-helpers.js'
import WaterFrameworkDirectivePage from '../pages/water.framework.directive.page.js'

const TASK_LINK = 'Water Framework Directive assessment'
const NAUTICAL_MILE_PATH =
  '/marine-licence/water-framework-directive-nautical-mile'
const EXCLUDED_ACTIVITIES_PATH =
  '/marine-licence/water-framework-directive-excluded-activities'
const NAUTICAL_MILE_RADIO_IDS = { Yes: '#nauticalMile', No: '#nauticalMile-2' }

async function openWfdTask(page) {
  await page.getByRole('link', { name: TASK_LINK }).click()
  await page.waitForLoadState('load')
}

/** login -> start application -> open WFD task -> Before you start -> nautical mile page */
async function reachNauticalMilePage(world) {
  await loginAndStartApplication(world, 'organisation')
  await openWfdTask(world.page)
  const wfd = new WaterFrameworkDirectivePage(world.page)
  await wfd.continueFromBeforeYouStart()
  await expect(world.page).toHaveURL(new RegExp(NAUTICAL_MILE_PATH), {
    timeout: 30_000
  })
  return wfd
}

// --- Task list ---

Then(
  'the {string} section heading is displayed on the task list',
  async function (heading) {
    await expect(
      this.page.getByRole('heading', { name: heading, level: 2, exact: true })
    ).toBeVisible({ timeout: 30_000 })
  }
)

// --- One nautical mile page (ML-1326) ---

Given(
  'an organisation user is on the One nautical mile WFD page',
  async function () {
    await reachNauticalMilePage(this)
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

// --- Excluded activities page (ML-1327) ---

Given(
  'an organisation user is on the Excluded activities WFD page',
  async function () {
    const wfd = await reachNauticalMilePage(this)
    await wfd.answerNauticalMile('Yes')
    await expect(this.page).toHaveURL(new RegExp(EXCLUDED_ACTIVITIES_PATH), {
      timeout: 30_000
    })
  }
)

When(
  'the user selects {string} and continues on the Excluded activities page',
  async function (answer) {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await wfd.answerExcludedActivities(answer)
  }
)

When(
  'the user selects {string} and uploads a Water Framework Directive assessment',
  async function (answer) {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await wfd.answerExcludedActivities(answer)
    await wfd.uploadAssessment(WFD_ASSESSMENT_FILE)
  }
)

// --- Review WFD answers page (ML-1341 / ML-1348) ---

Then('the Review WFD answers page is displayed', async function () {
  await new WaterFrameworkDirectivePage(this.page).expectOnReviewPage()
})

Then(
  'the Review WFD answers page shows {string} as {string}',
  async function (rowKey, value) {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(wfd.reviewRowValue(rowKey)).toContainText(value, {
      timeout: 30_000
    })
  }
)

Then(
  'the Review WFD answers page shows the uploaded file {string}',
  async function (fileName) {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(
      wfd.reviewRowValue(WaterFrameworkDirectivePage.ROW.upload)
    ).toContainText(fileName, { timeout: 30_000 })
  }
)

Then(
  'the Review WFD answers page has a change link for {string}',
  async function (rowKey) {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(wfd.reviewRow(rowKey).locator('a')).toBeVisible({
      timeout: 30_000
    })
  }
)

// --- WFD summary card on Check your answers / View details (ML-1345 / ML-1348) ---

Given(
  'an organisation user has completed a marine licence with a WFD assessment upload',
  async function () {
    await completeManualCircleApp(this, { wfd: 'upload' })
  }
)

Given(
  'an organisation user has completed a marine licence with the WFD nautical mile answer {string}',
  async function (answer) {
    // The default builder completes the WFD via nautical mile "No".
    expect(answer).toBe('No')
    await completeManualCircleApp(this)
  }
)

Given(
  'an organisation user has submitted a marine licence with a WFD assessment upload',
  async function () {
    await completeManualCircleApp(this, { wfd: 'upload' })
    await submitMarineLicence(this)
  }
)

When('the user opens the Check your answers page', async function () {
  await this.page.locator('#review-and-send').click()
  await this.page.waitForLoadState('load')
})

Then(
  'the Water Framework Directive assessment card shows {string} as {string}',
  async function (rowKey, value) {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(wfd.cardRowValue(rowKey)).toContainText(value, {
      timeout: 30_000
    })
  }
)

Then(
  'the Water Framework Directive assessment card shows the uploaded file {string}',
  async function (fileName) {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(
      wfd.cardRowValue(WaterFrameworkDirectivePage.ROW.upload)
    ).toContainText(fileName, { timeout: 30_000 })
  }
)

Then(
  'the Water Framework Directive assessment card Change link points to the Review WFD answers page',
  async function () {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(wfd.cardChangeLink()).toHaveAttribute(
      'href',
      /water-framework-directive-review-your-answers/,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the Water Framework Directive assessment card Change link points to the One nautical mile page',
  async function () {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(wfd.cardChangeLink()).toHaveAttribute(
      'href',
      /water-framework-directive-nautical-mile/,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the Water Framework Directive assessment card is read-only',
  async function () {
    const wfd = new WaterFrameworkDirectivePage(this.page)
    await expect(wfd.card()).toBeVisible({ timeout: 30_000 })
    await expect(wfd.card().locator('a')).toHaveCount(0)
  }
)

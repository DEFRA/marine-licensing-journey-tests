import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

const TASK_LINK = 'Harbour authority'
const PAGE_PATH = '/marine-licence/harbour-authority'
const TASK_SECTION_ID_PREFIX = 'other-permissions-task-list'
const HEADING = 'Is your project located in a harbour authority area?'
const ROW_LABEL = 'Located in a harbour authority area'

function harbourPage(page) {
  return {
    yes: page.getByRole('radio', { name: 'Yes' }),
    no: page.getByRole('radio', { name: 'No' }),
    details: page.locator('#details'),
    saveButton: page.locator('button:has-text("Save and continue")')
  }
}

function harbourRow(page) {
  return page.locator(
    `xpath=//div[contains(@class,"govuk-summary-list__row") and .//dt[normalize-space(text())="${ROW_LABEL}"]]`
  )
}

function taskStatusLocator(page) {
  return page.locator(
    `xpath=//a[normalize-space(text())="${TASK_LINK}"]/ancestor::li//div[contains(@class,"govuk-task-list__status")]`
  )
}

async function openHarbourFromTaskList(page) {
  await page.getByRole('link', { name: TASK_LINK }).click()
  await page.waitForLoadState('load')
}

async function selectAnswer(page, answer) {
  const h = harbourPage(page)
  if (answer === 'Yes') {
    await h.yes.click()
  } else if (answer === 'No') {
    await h.no.click()
  }
}

async function saveHarbour(page, { answer, details } = {}) {
  await selectAnswer(page, answer)
  if (answer === 'Yes' && details) {
    await harbourPage(page).details.fill(details)
  }
  await harbourPage(page).saveButton.click()
  await page.waitForLoadState('load')
}

When('the user opens the harbour authority task', async function () {
  await openHarbourFromTaskList(this.page)
})

When(
  'the user saves {string} on the harbour authority page',
  async function (answer) {
    await openHarbourFromTaskList(this.page)
    await saveHarbour(this.page, { answer })
  }
)

When(
  'the user saves {string} with details {string} on the harbour authority page',
  async function (answer, details) {
    await openHarbourFromTaskList(this.page)
    await saveHarbour(this.page, { answer, details })
  }
)

Given(
  'the user has saved {string} with details {string} on the harbour authority page',
  async function (answer, details) {
    await openHarbourFromTaskList(this.page)
    await saveHarbour(this.page, { answer, details })
    await expect(taskStatusLocator(this.page)).toContainText('Completed', {
      timeout: 30_000
    })
  }
)

When(
  'the user changes the harbour authority answer to {string} with details {string} via check your answers',
  async function (answer, details) {
    await harbourRow(this.page).locator('a:has-text("Change")').click()
    await this.page.waitForLoadState('load')
    await selectAnswer(this.page, answer)
    if (answer === 'Yes' && details) {
      await harbourPage(this.page).details.fill(details)
    }
    await harbourPage(this.page).saveButton.click()
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('#check-your-answers-heading')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then(
  'the harbour authority task is shown in the Other permissions section with status {string}',
  async function (status) {
    const link = this.page.getByRole('link', { name: TASK_LINK })
    await expect(link).toBeVisible({ timeout: 30_000 })
    // The status <div> carries id="other-permissions-task-list-{n}-status",
    // which confirms the task sits within the Other permissions section.
    const statusEl = taskStatusLocator(this.page)
    await expect(statusEl).toHaveAttribute(
      'id',
      new RegExp(`^${TASK_SECTION_ID_PREFIX}-`)
    )
    await expect(statusEl).toContainText(status, { timeout: 30_000 })
  }
)

Then(
  'the harbour authority page is empty with the details textbox hidden',
  async function () {
    await expect(this.page).toHaveURL(new RegExp(PAGE_PATH), {
      timeout: 30_000
    })
    await expect(this.page.locator('h1')).toContainText(HEADING, {
      timeout: 30_000
    })
    const h = harbourPage(this.page)
    expect(await h.yes.isChecked()).toBe(false)
    expect(await h.no.isChecked()).toBe(false)
    await expect(h.details).toBeHidden()
  }
)

Then(
  /^selecting "(Yes|No)" (reveals|hides) the harbour authority details textbox$/,
  async function (answer, action) {
    await selectAnswer(this.page, answer)
    const details = harbourPage(this.page).details
    if (action === 'reveals') {
      await expect(details).toBeVisible({ timeout: 30_000 })
    } else {
      await expect(details).toBeHidden({ timeout: 30_000 })
    }
  }
)

Then('the harbour authority error {string} is shown', async function (message) {
  await expect(this.page.locator('.govuk-error-summary')).toContainText(
    message,
    { timeout: 30_000 }
  )
  await expect(this.page).toHaveURL(new RegExp(PAGE_PATH), {
    timeout: 30_000
  })
})

Then(
  'the harbour authority answer on the check your answers page is {string}',
  async function (expected) {
    await expect(harbourRow(this.page).locator('dd').first()).toContainText(
      expected,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the harbour authority answer on the view details page is {string} and read-only',
  async function (expected) {
    const row = harbourRow(this.page)
    await expect(row.locator('dd').first()).toContainText(expected, {
      timeout: 30_000
    })
    await expect(row.locator('a:has-text("Change")')).toHaveCount(0)
  }
)

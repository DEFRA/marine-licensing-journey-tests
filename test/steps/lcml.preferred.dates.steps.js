import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

const TASK_LINK = 'Preferred start and end dates of the licence'
const TASK_LIST_PATH = '/marine-licence/task-list'
const PREFERRED_DATES_ROW_LABEL = 'Preferred dates'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function computeOffsetDate(offsetMonths) {
  const now = new Date()
  const d = new Date(now.getFullYear(), now.getMonth() + offsetMonths, 1)
  return { month: d.getMonth() + 1, year: d.getFullYear() }
}

function preferredDatesRow(page) {
  return page.locator(
    `xpath=//div[contains(@class,"govuk-summary-list__row") and .//dt[normalize-space(text())="${PREFERRED_DATES_ROW_LABEL}"]]`
  )
}

function preferredDatesPage(page) {
  return {
    startMonth: page.locator('#start-date-month'),
    startYear: page.locator('#start-date-year'),
    endMonth: page.locator('#end-date-month'),
    endYear: page.locator('#end-date-year'),
    saveButton: page.locator('button:has-text("Save and continue")'),
    cancelLink: page.locator('a:has-text("Cancel")')
  }
}

async function openPreferredDatesFromTaskList(page) {
  await page.getByRole('link', { name: TASK_LINK }).click()
  await page.waitForLoadState('load')
}

async function fillAndSavePreferredDates(
  page,
  startMonth,
  startYear,
  endMonth,
  endYear
) {
  const f = preferredDatesPage(page)
  await f.startMonth.fill(String(startMonth))
  await f.startYear.fill(String(startYear))
  await f.endMonth.fill(String(endMonth))
  await f.endYear.fill(String(endYear))
  await f.saveButton.click()
  await page.waitForLoadState('load')
}

When('the user opens the preferred dates task', async function () {
  await openPreferredDatesFromTaskList(this.page)
})

When(
  'the user saves valid preferred dates on the preferred dates page',
  async function () {
    await openPreferredDatesFromTaskList(this.page)
    const start = computeOffsetDate(3)
    const end = computeOffsetDate(15)
    this.data.preferredDates = {
      ...start,
      endMonth: end.month,
      endYear: end.year
    }
    await fillAndSavePreferredDates(
      this.page,
      start.month,
      start.year,
      end.month,
      end.year
    )
  }
)

When('the user cancels from the preferred dates page', async function () {
  const f = preferredDatesPage(this.page)
  await f.cancelLink.click()
  await this.page.waitForLoadState('load')
})

When(
  'the user changes the preferred dates via check your answers',
  async function () {
    await preferredDatesRow(this.page).locator('a:has-text("Change")').click()
    await this.page.waitForLoadState('load')
    const newStart = computeOffsetDate(4)
    const newEnd = computeOffsetDate(16)
    await fillAndSavePreferredDates(
      this.page,
      newStart.month,
      newStart.year,
      newEnd.month,
      newEnd.year
    )
    await expect(this.page.locator('#check-your-answers-heading')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then('the user is on the marine licence task list', async function () {
  await expect(this.page).toHaveURL(new RegExp(TASK_LIST_PATH), {
    timeout: 30_000
  })
})

Then(
  'the check your answers page is displayed with the preferred dates section',
  async function () {
    await expect(this.page.locator('#check-your-answers-heading')).toBeVisible({
      timeout: 30_000
    })
    const row = preferredDatesRow(this.page)
    await expect(row).toBeVisible({ timeout: 30_000 })
    const valueText = await row.locator('dd').first().textContent()
    const monthNames = MONTHS.join('|')
    expect(valueText).toMatch(new RegExp(monthNames))
  }
)

Then(
  'the preferred dates are displayed as read-only on the view details page',
  async function () {
    const row = preferredDatesRow(this.page)
    await expect(row).toBeVisible({ timeout: 30_000 })
    const valueText = await row.locator('dd').first().textContent()
    const monthNames = MONTHS.join('|')
    expect(valueText).toMatch(new RegExp(monthNames))
    await expect(row.locator('a:has-text("Change")')).toHaveCount(0)
  }
)

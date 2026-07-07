import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  launchD365Browser,
  loginToD365,
  verifyD365Login
} from '../support/d365.js'

// The left-nav treeitem is spelled "Marine license cases" (American) in D365,
// which is what the existing internal-view test targets. Reused here verbatim.
const WORKBASKET_SELECTOR = '[role="treeitem"][title="Marine license cases"]'
const D365_STEP_TIMEOUT = 600_000

async function openWorkbasket(world) {
  const { browser, page } = await launchD365Browser()
  // Reuses the global After hook (test/steps/lcml.view.details.steps.js) that
  // closes this.d365Browser after the scenario.
  world.d365Browser = browser
  world.d365Page = page

  await loginToD365(page)
  await verifyD365Login(page)
  await page.locator(WORKBASKET_SELECTOR).first().click()
  await page.waitForLoadState('load')
  return page
}

async function findCaseRow(page, reference) {
  const searchInput = page
    .locator('input[data-id^="quickFind_text"], #SearchBoxWithTypeAhead-input')
    .first()
  await searchInput.waitFor({ state: 'visible', timeout: 30_000 })
  await searchInput.fill(reference)
  await searchInput.press('Enter')

  const firstRow = page.locator('div[role="row"][row-index="0"]')
  await firstRow.waitFor({ state: 'visible', timeout: 30_000 })
  return firstRow
}

When(
  'the internal user opens the Marine licence cases workbasket in D365',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    await openWorkbasket(this)
  }
)

When(
  'the internal user finds the submitted case in the Marine licence cases workbasket',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = await openWorkbasket(this)

    let lastError = null
    for (let attempt = 1; attempt <= 15; attempt++) {
      try {
        this.d365CaseRow = await findCaseRow(
          page,
          this.data.applicationReference
        )
        lastError = null
        break
      } catch (err) {
        lastError = err
        await page.waitForTimeout(15_000)
      }
    }
    if (lastError) throw lastError
  }
)

Then(
  'the Marine licence cases workbasket displays the following columns',
  async function (dataTable) {
    const page = this.d365Page
    for (const [column] of dataTable.raw()) {
      await expect(
        page.getByRole('columnheader', { name: column }).first()
      ).toBeVisible({ timeout: 30_000 })
    }
  }
)

Then(
  'the workbasket row shows the submitted case reference, project name and status {string}',
  async function (status) {
    const row = this.d365CaseRow
    await expect(row).toContainText(this.data.applicationReference, {
      timeout: 30_000
    })
    await expect(row).toContainText(this.data.projectName, { timeout: 30_000 })
    await expect(row).toContainText(status, { timeout: 30_000 })
  }
)

Then('the reference in the workbasket is a link', async function () {
  const row = this.d365CaseRow
  await expect(
    row.getByRole('link', { name: this.data.applicationReference }).first()
  ).toBeVisible({ timeout: 30_000 })
})

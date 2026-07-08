import { Given, When, Then, After } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeUploadApp,
  completeRandomSiteTypeApp,
  submitMarineLicence,
  openViewDetailsFromDashboard,
  openPublicViewDetailsFromDashboard
} from '../support/lcml-helpers.js'
import {
  launchD365Browser,
  loginToD365,
  verifyD365Login
} from '../support/d365.js'

const WORKBASKET_SELECTOR = '[role="treeitem"][title="Marine license cases"]'
const D365_STEP_TIMEOUT = 600_000

async function openWorkbasket(world) {
  const { browser, page } = await launchD365Browser()
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

  await expect(firstRow.locator('[col-id="ticketnumber"]')).toContainText(
    reference,
    { timeout: 5_000 }
  )
  return firstRow
}

async function findCaseRowWithRetry(page, reference) {
  let lastError = null
  for (let attempt = 1; attempt <= 15; attempt++) {
    try {
      return await findCaseRow(page, reference)
    } catch (err) {
      lastError = err
      await page.waitForTimeout(15_000)
    }
  }
  throw lastError
}

async function readCaseSummaryField(page, attr) {
  const container = page
    .locator(`[data-id="${attr}-FieldSectionItemContainer"]`)
    .first()
  await container.waitFor({ state: 'visible', timeout: 30_000 })
  const input = container.locator('input, textarea').first()
  const pcf = page
    .locator(`[data-id="${attr}.fieldControl-pcf-container-id"]`)
    .first()

  for (let attempt = 0; attempt < 30; attempt++) {
    if (await input.count()) {
      const value = (await input.inputValue().catch(() => '')) || ''
      if (value.trim()) {
        return value.trim()
      }
    }
    if (await pcf.count()) {
      const text = ((await pcf.innerText().catch(() => '')) || '').trim()
      if (text) {
        return text
      }
    }
    await page.waitForTimeout(1_000)
  }
  return ((await container.innerText().catch(() => '')) || '').trim()
}

async function openCaseRecordSummary(page, row) {
  await row.locator('div[col-id="title"] a').click()
  await page.waitForURL(/pagetype=entityrecord.*etn=incident/, {
    timeout: 30_000
  })
  await page.waitForLoadState('load')

  const summaryTab = page
    .locator('[role="tab"]', { hasText: 'Case summary' })
    .first()
  if (await summaryTab.count()) {
    await summaryTab.click().catch(() => {})
  }

  for (let attempt = 1; attempt <= 6; attempt++) {
    if (await readCaseSummaryField(page, 'ml_submitteddate')) {
      break
    }
    await page.waitForTimeout(5_000)
  }
}

function card(page, title) {
  return page.locator(
    `.govuk-summary-card:has(.govuk-summary-card__title:text-is("${title}"))`
  )
}

function rowValue(scope, key) {
  return scope.locator(
    `.govuk-summary-list__row:has(dt:text-is("${key}")) .govuk-summary-list__value`
  )
}

Given(
  'an organisation user has submitted a marine licence application with a random site type',
  async function () {
    await completeRandomSiteTypeApp(this)
    await submitMarineLicence(this)
    if (this.attach) {
      this.attach(`random site type -> ${this.data.siteType}`, 'text/plain')
    }
  }
)

Given(
  'an organisation user has submitted a marine licence application with uploaded sites',
  async function () {
    await completeUploadApp(this)
    await submitMarineLicence(this)
  }
)

When(
  'the user opens View details for the submitted marine licence',
  async function () {
    await openViewDetailsFromDashboard(this)
  }
)

When(
  'the user opens the public View details link for the submitted marine licence',
  async function () {
    await openPublicViewDetailsFromDashboard(this)
  }
)

Then(
  'the View details page shows the site location and site card for that site type',
  async function () {
    const siteType = this.data.siteType
    const locationCard = card(this.page, 'Providing the site location')
    await expect(locationCard).toBeVisible({ timeout: 30_000 })
    await expect(locationCard).not.toContainText('File type')
    await expect(locationCard).not.toContainText('File name')

    const siteCard = card(this.page, 'Site 1')
    await expect(siteCard).toBeVisible({ timeout: 30_000 })
    await expect(
      this.page.locator('.govuk-summary-card__title', {
        hasText: 'Site 1 details'
      })
    ).toHaveCount(0, { timeout: 30_000 })

    if (siteType === 'upload') {
      await expect(locationCard).toContainText('File upload', {
        timeout: 30_000
      })
      await expect(rowValue(siteCard, 'Site name')).toContainText(/\S/, {
        timeout: 30_000
      })
    } else {
      await expect(locationCard).toContainText(
        'Enter the coordinates of the site manually',
        { timeout: 30_000 }
      )
      if (siteType === 'circle') {
        await expect(
          rowValue(siteCard, 'Single or multiple sets of coordinates')
        ).toContainText(
          'Manually enter one set of coordinates and a width to create a circular site',
          { timeout: 30_000 }
        )
        await expect(rowValue(siteCard, 'Coordinate system')).toContainText(
          'WGS84',
          { timeout: 30_000 }
        )
        await expect(
          rowValue(siteCard, 'Coordinates at centre of site')
        ).toContainText('50.123456, -1.234567', { timeout: 30_000 })
        await expect(
          rowValue(siteCard, 'Width of circular site')
        ).toContainText('150 metres', { timeout: 30_000 })
      } else {
        await expect(
          rowValue(siteCard, 'Single or multiple sets of coordinates')
        ).toContainText(
          'Enter multiple sets of coordinates to mark the boundary of the site',
          { timeout: 30_000 }
        )
        await expect(rowValue(siteCard, 'Start and end points')).toContainText(
          '50.100000, -1.100000',
          { timeout: 30_000 }
        )
        await expect(rowValue(siteCard, 'Point 2')).toContainText(/\S/, {
          timeout: 30_000
        })
      }
    }

    await expect(rowValue(siteCard, 'Map view')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then(
  'the View details page shows the {string} site location method',
  async function (method) {
    const locationCard = card(this.page, 'Providing the site location')
    await expect(locationCard).toBeVisible({ timeout: 30_000 })
    await expect(locationCard).toContainText(method, { timeout: 30_000 })
  }
)

Then(
  'the View details page shows an uploaded site card with a name and a map',
  async function () {
    const siteCard = card(this.page, 'Site 1')
    await expect(siteCard).toBeVisible({ timeout: 30_000 })
    await expect(rowValue(siteCard, 'Site name')).toContainText(/\S/, {
      timeout: 30_000
    })
    await expect(rowValue(siteCard, 'Map view')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then('the View details page shows an activity details card', async function () {
  const activityCard = card(this.page, 'Site 1 - Activity 1')
  await expect(activityCard).toBeVisible({ timeout: 30_000 })
  const rows = [
    'Type of activity',
    'Activity description',
    'Maximum duration of activity',
    'Completion date',
    'Activity limited to specific months',
    'Proposed working hours'
  ]
  for (const key of rows) {
    await expect(rowValue(activityCard, key)).toContainText(/\S/, {
      timeout: 30_000
    })
  }
})

When(
  'the internal user finds the submitted case in the Marine licence cases workbasket',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = await openWorkbasket(this)
    this.d365CaseRow = await findCaseRowWithRetry(
      page,
      this.data.applicationReference
    )
  }
)

const WORKBASKET_COL_BY_FIELD = {
  Reference: 'ticketnumber',
  'Project name': 'title',
  'Assigned to': 'mmo_assignedtoid',
  Status: 'statuscode',
  'Case age (days)': 'ml_datediff'
}

const CASE_SUMMARY_ATTR_BY_FIELD = {
  Reference: 'ticketnumber',
  'Application type': 'casetypecode',
  Submitted: 'ml_submitteddate',
  'Fee band': 'ml_feeband',
  Organisation: 'mmo_applicantorganisationid'
}

const ORG_VALUE_SELECTOR =
  '[data-id="mmo_applicantorganisationid.fieldControl-LookupResultsDropdown_mmo_applicantorganisationid_selected_tag_text"]'

Then(
  'the Marine licence cases workbasket shows the submitted case with the following details',
  async function (dataTable) {
    const page = this.d365Page
    const row = this.d365CaseRow

    for (const [field, expected] of dataTable.raw()) {
      const colId = WORKBASKET_COL_BY_FIELD[field]
      if (!colId) {
        throw new Error(`Unknown workbasket column: ${field}`)
      }

      await expect(
        page.getByRole('columnheader', { name: field }).first()
      ).toBeVisible({ timeout: 30_000 })

      const cell = row.locator(`[col-id="${colId}"]`)
      if (expected === 'the submitted reference') {
        await expect(cell).toContainText(this.data.applicationReference, {
          timeout: 30_000
        })
      } else if (expected === 'the project name') {
        await expect(cell).toContainText(this.data.projectName, {
          timeout: 30_000
        })
      } else if (expected === 'a number') {
        await expect(cell).toContainText(/\d+/, { timeout: 30_000 })
      } else if (expected === 'blank') {
        expect(((await cell.innerText()) || '').trim()).toBe('')
      } else {
        await expect(cell).toContainText(expected, { timeout: 30_000 })
      }
    }
  }
)

Then(
  'the case summary tab shows the following details',
  { timeout: D365_STEP_TIMEOUT },
  async function (dataTable) {
    const page = this.d365Page
    await openCaseRecordSummary(page, this.d365CaseRow)

    for (const [field, expected] of dataTable.raw()) {
      const attr = CASE_SUMMARY_ATTR_BY_FIELD[field]
      if (!attr) {
        throw new Error(`Unknown case summary field: ${field}`)
      }

      await expect(
        page.locator(`[data-id="${attr}-FieldSectionItemContainer"]`).first()
      ).toBeVisible({ timeout: 30_000 })

      if (expected === 'present') {
        continue
      }

      const actual =
        field === 'Organisation'
          ? (
              (await page.locator(ORG_VALUE_SELECTOR).first().innerText()) || ''
            ).trim()
          : await readCaseSummaryField(page, attr)

      if (expected === 'the submitted reference') {
        expect(actual).toContain(this.data.applicationReference)
      } else if (expected === 'a date') {
        expect(actual).toMatch(/\d{2}\/\d{2}\/\d{4}/)
      } else {
        expect(actual.toLowerCase()).toContain(expected.toLowerCase())
      }
    }
  }
)

After(async function () {
  if (this.d365Browser) {
    await this.d365Browser.close()
    this.d365Browser = null
  }
})

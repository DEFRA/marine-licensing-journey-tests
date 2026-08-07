import { Given, When, Then, After } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeUploadApp,
  completeRandomSiteTypeApp,
  completeMarineAreaShapefileApp,
  completeManualCircleApp,
  submitMarineLicence,
  openViewDetailsFromDashboard,
  openPublicViewDetailsFromDashboard
} from '../support/lcml-helpers.js'
import {
  launchD365Browser,
  loginToD365,
  verifyD365Login,
  siteCheckTaskLink,
  siteCoordinatesDownloadCsvLink,
  readSiteCoordinatesCsvUrl,
  openSiteCheckTask,
  readSiteCheckFieldMeta,
  SITE_CHECK_FIELDS,
  completeSiteCheckTask,
  openWfdTask,
  readWfdTaskFieldMeta,
  completeWfdReview,
  readProjectDetailsTab
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

Given(
  'an organisation user has submitted a marine licence application with a site in a marine plan area',
  async function () {
    await completeMarineAreaShapefileApp(this)
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
        await expect
          .poll(async () => ((await cell.innerText()) || '').trim(), {
            timeout: 30_000
          })
          .toBe('')
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

Then(
  'the Project details tab shows the project name, background and preferred licence dates',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = this.d365Page
    await openCaseRecordSummary(page, this.d365CaseRow)
    await expect(
      page.getByRole('tab', { name: 'Project details' })
    ).toBeVisible({ timeout: 30_000 })

    const details = await readProjectDetailsTab(page)
    expect(details, 'Project details tab content loaded').not.toBeNull()
    expect(details.projectName).toBe(this.data.projectName)
    expect(details.projectBackground).toBe(this.data.projectBackground)
    expect(details.preferredDates).toMatch(
      /^[A-Z][a-z]+ \d{4} to [A-Z][a-z]+ \d{4}$/
    )
  }
)

function readGeoAreaSubgrids(page) {
  return page.evaluate(() => {
    const readSubgrid = (commandLabel) => {
      const menubar = [...document.querySelectorAll('[role="menubar"]')].find(
        (m) => (m.getAttribute('aria-label') || '').includes(commandLabel)
      )
      if (!menubar) {
        return { found: false, total: 0, canAdd: false }
      }
      let scope = menubar.parentElement
      for (let i = 0; i < 8 && scope; i++) {
        if (
          scope.querySelector('[role="row"][row-index], [aria-label*="of"]')
        ) {
          break
        }
        scope = scope.parentElement
      }
      scope = scope || document
      const pager = (scope.textContent || '').match(
        /(\d+)\s*-\s*(\d+)\s*of\s*(\d+)/
      )
      const rows = [...scope.querySelectorAll('[role="row"][row-index]')].map(
        (r) => r.innerText.replace(/\s+/g, ' ').trim()
      )
      const canAdd = !!menubar.querySelector(
        '[aria-label*="Add" i], [aria-label*="New record" i]'
      )
      return {
        found: true,
        total: pager ? Number(pager[3]) : rows.length,
        rows: rows.slice(0, 10),
        canAdd
      }
    }
    return {
      marine: readSubgrid('Case Marine Plan Areas'),
      coastal: readSubgrid('Case Coastal Operations Area')
    }
  })
}

Then(
  'the case summary shows the marine plan areas and coastal operations areas as read-only',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = this.d365Page

    let areas = { marine: { total: 0 }, coastal: { total: 0 } }
    for (let attempt = 0; attempt < 24; attempt++) {
      areas = await readGeoAreaSubgrids(page)
      if (areas.marine.total > 0 && areas.coastal.total > 0) {
        break
      }
      await page.waitForTimeout(5_000)
      if (attempt % 4 === 3) {
        await page.reload().catch(() => {})
        await page.waitForLoadState('load').catch(() => {})
        await page.waitForTimeout(5_000)
      }
    }

    expect(areas.marine.found, 'Marine Plan Areas subgrid is present').toBe(
      true
    )
    expect(
      areas.coastal.found,
      'Coastal Operations Areas subgrid is present'
    ).toBe(true)
    expect(
      areas.marine.total,
      `at least one marine plan area (saw: ${JSON.stringify(areas.marine.rows)})`
    ).toBeGreaterThan(0)
    expect(
      areas.coastal.total,
      `at least one coastal operations area (saw: ${JSON.stringify(areas.coastal.rows)})`
    ).toBeGreaterThan(0)
    expect(areas.marine.canAdd, 'marine plan areas are read-only').toBe(false)
    expect(areas.coastal.canAdd, 'coastal operations areas are read-only').toBe(
      false
    )
  }
)

Then(
  'the case shows the {string} task in the task list',
  { timeout: D365_STEP_TIMEOUT },
  async function (taskName) {
    expect(taskName).toBe('Site check')
    const page = this.d365Page
    await expect(siteCheckTaskLink(page)).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the Site check task page shows the mandatory site check questions, a 4000 character Notes field and a Download CSV link',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = this.d365Page
    await openSiteCheckTask(page)

    await expect
      .poll(
        async () => {
          const m = await readSiteCheckFieldMeta(page)
          return (
            m?.coordinatesAndShape?.requiredLevel === 'required' &&
            m?.withinWfdArea?.requiredLevel === 'required'
          )
        },
        {
          timeout: 30_000,
          message: 'Site check Yes/No questions become mandatory'
        }
      )
      .toBe(true)

    const meta = await readSiteCheckFieldMeta(page)

    expect(meta.coordinatesAndShape.type).toBe('optionset')
    expect(meta.coordinatesAndShape.options).toEqual(['Yes', 'No'])
    expect(meta.coordinatesAndShape.requiredLevel).toBe('required')

    expect(meta.withinWfdArea.type).toBe('optionset')
    expect(meta.withinWfdArea.options).toEqual(['Yes', 'No'])
    expect(meta.withinWfdArea.requiredLevel).toBe('required')

    expect(meta.notes.type).toBe('memo')
    expect(meta.notes.maxLength).toBe(4000)
    const notesTextarea = page.locator(
      `[data-id="${SITE_CHECK_FIELDS.notes}-FieldSectionItemContainer"] textarea`
    )
    await expect(notesTextarea).toBeVisible({ timeout: 30_000 })
    await expect(notesTextarea).toHaveAttribute('maxlength', '4000')

    const csvLink = siteCoordinatesDownloadCsvLink(page)
    await expect(csvLink).toBeVisible({ timeout: 30_000 })
    const csvUrl = await readSiteCoordinatesCsvUrl(page)
    expect(csvUrl).toMatch(
      /\/public\/marine-licence\/[0-9a-f]{24}\/generate-coordinates-csv$/
    )
    const downloadPromise = page.waitForEvent('download', { timeout: 60_000 })
    await csvLink.click({ timeout: 60_000 })
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.csv$/i)
  }
)

const WFD_VARIATIONS = {
  'one-answer': {
    wfd: 'nautical-no',
    nauticalMile: 'No',
    excluded: null,
    hasAssessment: false
  },
  'two-answer': {
    wfd: 'excluded',
    nauticalMile: 'Yes',
    excluded: 'Yes',
    hasAssessment: false
  },
  'three-answer': {
    wfd: 'upload',
    nauticalMile: 'Yes',
    excluded: 'No',
    hasAssessment: true
  }
}

Given(
  'an organisation user has submitted a marine licence with the {string} WFD variation',
  { timeout: D365_STEP_TIMEOUT },
  async function (variation) {
    const config = WFD_VARIATIONS[variation]
    if (!config) throw new Error(`Unknown WFD variation: ${variation}`)
    await completeManualCircleApp(this, { wfd: config.wfd })
    await submitMarineLicence(this)
    this.data.wfdVariation = config
  }
)

When(
  'the internal user completes the Site check and opens the WFD task',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = await openWorkbasket(this)
    this.d365CaseRow = await findCaseRowWithRetry(
      page,
      this.data.applicationReference
    )
    await openCaseRecordSummary(page, this.d365CaseRow)
    await completeSiteCheckTask(page)
    await openWfdTask(page)
  }
)

Then(
  "the WFD task applicant's answers match the submitted variation",
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = this.d365Page
    const v = this.data.wfdVariation
    const meta = await readWfdTaskFieldMeta(page)
    expect(meta, 'Dynamics form API (Xrm) is available').not.toBeNull()

    expect(meta.withinNauticalMile.visible).toBe(true)
    expect(meta.withinNauticalMile.readOnly).toBe(true)
    expect(meta.withinNauticalMile.value).toBe(v.nauticalMile)

    if (v.excluded) {
      expect(meta.limitedToExcludedActivities.visible).toBe(true)
      expect(meta.limitedToExcludedActivities.readOnly).toBe(true)
      expect(meta.limitedToExcludedActivities.value).toBe(v.excluded)
    } else {
      expect(meta.limitedToExcludedActivities.visible).toBe(false)
    }

    if (v.hasAssessment) {
      await expect
        .poll(
          async () => (await readWfdTaskFieldMeta(page)).documentUrl.value,
          {
            timeout: 60_000,
            message: 'WFD assessment document link is populated'
          }
        )
        .toBeTruthy()
      const after = await readWfdTaskFieldMeta(page)
      expect(after.documentFilename.value).toBeTruthy()
    } else {
      expect(meta.documentUrl.visible).toBe(false)
    }
  }
)

Then(
  'the WFD task has the mandatory WFD review question',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = this.d365Page
    await expect
      .poll(
        async () =>
          (await readWfdTaskFieldMeta(page)).sectionComplete?.requiredLevel,
        { timeout: 30_000, message: 'WFD review question becomes mandatory' }
      )
      .toBe('required')

    const meta = await readWfdTaskFieldMeta(page)
    expect(meta.sectionComplete.options).toEqual(['Yes', 'No'])
    expect(meta.sectionComplete.visible).toBe(true)
  }
)

Then(
  'completing the WFD review marks the task as Done',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const status = await completeWfdReview(this.d365Page)
    expect(status).toBe('Done')
  }
)

After(async function () {
  if (this.d365Browser) {
    await this.d365Browser.close()
    this.d365Browser = null
  }
})

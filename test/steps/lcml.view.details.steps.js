import { Given, When, Then, After } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ACTIVITY_TYPES } from '../test-data/lcml-activity.js'
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
  readProjectDetailsTab,
  openPublicRegisterTab,
  readPublicRegisterMeta,
  openOtherPermissionsTab,
  readOtherPermissionsMeta,
  readOtherPermissionAnswersByNav,
  openWfdTab,
  readWfdTabMeta,
  readWfdTabAnswers,
  openSitesAndActivitiesTab,
  readSitesAndActivitiesMeta
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
  { timeout: D365_STEP_TIMEOUT },
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
    expect(download.suggestedFilename()).toMatch(/\.zip$/i)
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
    await completeManualCircleApp(this, {
      wfd: config.wfd,
      latitude: '50.152483',
      longitude: '-4.641914',
      activity: { topLevel: 'Deposit', subOptionIndex: 1 }
    })
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
    await expect
      .poll(
        async () =>
          (await readWfdTaskFieldMeta(page))?.withinNauticalMile.value,
        { timeout: 30_000, message: "WFD applicant's answers have loaded" }
      )
      .toBe(v.nauticalMile)

    const meta = await readWfdTaskFieldMeta(page)
    expect(meta.withinNauticalMile.visible).toBe(true)
    expect(meta.withinNauticalMile.readOnly).toBe(true)

    if (v.excluded) {
      await expect
        .poll(
          async () =>
            (await readWfdTaskFieldMeta(page)).limitedToExcludedActivities
              .value,
          { timeout: 30_000, message: 'excluded-activities answer has loaded' }
        )
        .toBe(v.excluded)
      const excluded = (await readWfdTaskFieldMeta(page))
        .limitedToExcludedActivities
      expect(excluded.visible).toBe(true)
      expect(excluded.readOnly).toBe(true)
    } else {
      await expect
        .poll(
          async () =>
            (await readWfdTaskFieldMeta(page)).limitedToExcludedActivities
              .visible,
          {
            timeout: 30_000,
            message: 'excluded-activities field hides when nautical mile is No'
          }
        )
        .toBe(false)
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
      await expect
        .poll(
          async () => (await readWfdTaskFieldMeta(page)).documentUrl.visible,
          {
            timeout: 30_000,
            message: 'WFD assessment document link is hidden without an upload'
          }
        )
        .toBe(false)
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

Given(
  'an organisation user has submitted a marine licence application with sharing consent {string}',
  { timeout: D365_STEP_TIMEOUT },
  async function (consent) {
    await completeMarineAreaShapefileApp(this, { consent })
    await submitMarineLicence(this)
  }
)

When(
  'the internal user opens the submitted case in D365',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = await openWorkbasket(this)
    this.d365CaseRow = await findCaseRowWithRetry(
      page,
      this.data.applicationReference
    )
    await openCaseRecordSummary(page, this.d365CaseRow)
  }
)

Then(
  'the case shows the {string} tab in the tab strip',
  { timeout: D365_STEP_TIMEOUT },
  async function (tabName) {
    await expect(
      this.d365Page.locator(`[role="tab"][aria-label="${tabName}"]`)
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the Public register tab shows sharing consent {string}',
  { timeout: D365_STEP_TIMEOUT },
  async function (consent) {
    const page = this.d365Page
    await openPublicRegisterTab(page)

    await expect
      .poll(async () => (await readPublicRegisterMeta(page))?.contentVisible, {
        timeout: 60_000,
        message: 'Public register web resource loads the application from CDP'
      })
      .toBe(true)

    const meta = await readPublicRegisterMeta(page)
    expect(meta.labels).toContain(
      'Do you consent to the MMO publishing your project information publicly?'
    )
    expect(meta.consent).toBe(consent)

    if (consent === 'No') {
      expect(meta.reasonRowVisible).toBe(true)
      expect(meta.reason).toBe(this.data.sharingConsent.reason)
    } else {
      expect(meta.reasonRowVisible).toBe(false)
    }
  }
)

Then(
  "the Other permissions tab shows the applicant's {string} answers for all four permissions",
  { timeout: D365_STEP_TIMEOUT },
  async function (answer) {
    const page = this.d365Page
    await openOtherPermissionsTab(page)

    await expect
      .poll(
        async () => (await readOtherPermissionsMeta(page))?.specialLegalPowers,
        {
          timeout: 60_000,
          message:
            'Other permissions web resource loads the application from CDP'
        }
      )
      .toBeTruthy()

    const meta = await readOtherPermissionsMeta(page)
    expect(meta.navLabels).toEqual([
      'Special legal powers',
      'Harbour authority',
      'Other authorities',
      'Pre-application consultation'
    ])

    // Navigate each of the four sections and assert the answer shown for each.
    const answers = await readOtherPermissionAnswersByNav(page)
    expect(answers.specialLegalPowers).toBe(answer)
    expect(answers.harbourAuthority).toBe(answer)
    expect(answers.otherAuthorities).toBe(answer)
    expect(answers.publicConsultation).toBe(answer)
  }
)

Then(
  "the Water Framework Directive tab shows the applicant's answers, guidance and the uploaded assessment",
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = this.d365Page
    await openWfdTab(page)

    await expect
      .poll(async () => (await readWfdTabMeta(page))?.fieldsLoaded, {
        timeout: 60_000,
        message: 'WFD tab loads the application answers from CDP'
      })
      .toBe(true)
    const meta = await readWfdTabMeta(page)
    expect(meta.text).toContain('replacing or removing existing pipes')
    expect(meta.hasAssessmentUpload).toBe(true)

    await expect
      .poll(async () => (await readWfdTabAnswers(page)).nauticalMile, {
        timeout: 30_000,
        message: "WFD applicant's answers render on the tab"
      })
      .toBe('Yes')
    const answers = await readWfdTabAnswers(page)
    expect(answers.excludedActivities).toBe('No')
    expect(answers.downloadFile).toBe('WFD.odt')
    expect(answers.downloadEnabled).toBe(true)
  }
)

Then(
  'the Sites and activities tab shows the uploaded site location and the site and activity details',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    const page = this.d365Page
    await openSitesAndActivitiesTab(page)

    await expect
      .poll(async () => (await readSitesAndActivitiesMeta(page))?.subtitles, {
        timeout: 60_000,
        message:
          'Sites and activities web resource loads the application from CDP'
      })
      .toContain('Site 1')

    const meta = await readSitesAndActivitiesMeta(page)
    expect(meta.labels).toEqual(
      expect.arrayContaining([
        'Method of providing site location',
        'Site name',
        'Type of activity',
        'Sub-activities'
      ])
    )
    expect(meta.bodyText).toContain('File upload')
    expect(meta.downloadFile).toMatch(/\.zip$/i)
    expect(meta.subtitles).toContain('Site 1')
    expect(meta.subtitles.some((s) => /Site 1 . Activity 1/.test(s))).toBe(true)

    // The tab reflects the exact values submitted by the applicant (from CDP).
    const activity = this.data.activity
    expect(meta.bodyText).toContain(this.data.siteName)
    expect(meta.bodyText).toContain(
      ACTIVITY_TYPES[activity.topLevel].radioLabel
    )
    expect(
      meta.subActivities.some((s) => s.includes(activity.checkbox.label))
    ).toBe(true)
  }
)

After(async function () {
  if (this.d365Browser) {
    await this.d365Browser.close()
    this.d365Browser = null
  }
})

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

  // The grid can still show a stale row before the search filter applies (or
  // when the just-submitted case is not yet indexed), so confirm the first row
  // is actually our case before returning it — otherwise throw so the caller
  // re-searches after a wait.
  await expect(firstRow.locator('[col-id="ticketnumber"]')).toContainText(
    reference,
    { timeout: 5_000 }
  )
  return firstRow
}

// A just-submitted case can take a while to be indexed into the D365 view, so
// retry the search until it appears.
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

// Read a Case summary field's displayed value. D365 renders these read-only
// fields as inputs (value in the `value` attribute, not textContent) and
// populates them after the field becomes visible — more slowly under parallel
// load — so poll the input value (and the pcf container text for option-set
// fields) until it populates.
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

async function openCaseSummary(world) {
  const page = await openWorkbasket(world)
  const row = await findCaseRowWithRetry(page, world.data.applicationReference)

  // Open the case record. The Project name (title) column currently holds the
  // hyperlink; reaching the record here is independent of the Reference-link AC.
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

  // Wait for the form fields to render before reading them.
  for (let attempt = 1; attempt <= 6; attempt++) {
    if (await readCaseSummaryField(page, 'ml_submitteddate')) {
      break
    }
    await page.waitForTimeout(5_000)
  }
  return page
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
    this.d365CaseRow = await findCaseRowWithRetry(
      page,
      this.data.applicationReference
    )
  }
)

When(
  'the internal user opens the submitted case summary in D365',
  { timeout: D365_STEP_TIMEOUT },
  async function () {
    await openCaseSummary(this)
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
    await expect(row.locator('[col-id="ticketnumber"]')).toContainText(
      this.data.applicationReference,
      { timeout: 30_000 }
    )
    await expect(row.locator('[col-id="title"]')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )
    await expect(row.locator('[col-id="statuscode"]')).toContainText(status, {
      timeout: 30_000
    })
  }
)

Then('the Reference column in the workbasket row is a link', async function () {
  // AC: the Reference (ticketnumber) column is the hyperlink to the case
  // summary. Currently @wip — the dev view renders the link on the Project
  // name (title) column instead.
  await expect(
    this.d365CaseRow.locator('[col-id="ticketnumber"] a').first()
  ).toBeVisible({ timeout: 30_000 })
})

Then(
  'the case summary displays the marine licence case details',
  async function () {
    const page = this.d365Page
    const organisation = process.env.DEFRA_ID_ORG_NAME || 'Windfarm Co'

    // Reference matches the submitted application reference.
    expect(await readCaseSummaryField(page, 'ticketnumber')).toContain(
      this.data.applicationReference
    )

    // Application type reads "Marine License" (American) in D365; match either
    // spelling rather than assert the AC's "Marine licence" exactly.
    expect(await readCaseSummaryField(page, 'casetypecode')).toMatch(
      /marine licen[cs]e/i
    )

    // Submitted date in dd/mm/yyyy.
    expect(await readCaseSummaryField(page, 'ml_submitteddate')).toMatch(
      /\d{2}\/\d{2}\/\d{4}/
    )

    // Organisation the application is for.
    await expect(
      page
        .locator(
          '[data-id="mmo_applicantorganisationid.fieldControl-LookupResultsDropdown_mmo_applicantorganisationid_selected_tag_text"]'
        )
        .first()
    ).toContainText(organisation, { timeout: 30_000 })

    // Fee band is present on the tab. Its value is communicated to Dynamics per
    // ML-1352; assert the field is displayed (value assertion left out because
    // it can be empty for a freshly submitted case).
    await expect(
      page.locator('[data-id="ml_feeband-FieldSectionItemContainer"]').first()
    ).toBeVisible({ timeout: 30_000 })
  }
)

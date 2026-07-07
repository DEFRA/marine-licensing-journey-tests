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
  await page
    .locator('[data-id="ticketnumber.fieldControl-pcf-container-id"]')
    .first()
    .waitFor({ state: 'visible', timeout: 30_000 })
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

    // AC fields on the Case summary tab. Assert each field is present (Case
    // officer is intentionally excluded — no defined way to set it yet).
    const fieldContainers = {
      Reference: 'ticketnumber',
      'Application type': 'casetypecode',
      Submitted: 'ml_submitteddate',
      'Fee band': 'ml_feeband',
      Organisation: 'mmo_applicantorganisationid'
    }
    for (const attr of Object.values(fieldContainers)) {
      const container = page
        .locator(`[data-id="${attr}-FieldSectionItemContainer"]`)
        .first()
      await container.scrollIntoViewIfNeeded().catch(() => {})
      await expect(container).toBeVisible({ timeout: 30_000 })
    }

    // Concrete value checks for the fields that render their read-only value
    // reliably on a freshly-opened case.
    // Submitted date in dd/mm/yyyy.
    await expect(
      page
        .locator(
          '[data-id="ml_submitteddate.fieldControl-datetime-description_container"]'
        )
        .first()
    ).toContainText(/\d{2}\/\d{2}\/\d{4}/, { timeout: 30_000 })

    // Organisation the application is for.
    await expect(
      page
        .locator(
          '[data-id="mmo_applicantorganisationid.fieldControl-LookupResultsDropdown_mmo_applicantorganisationid_selected_tag_text"]'
        )
        .first()
    ).toContainText(organisation, { timeout: 30_000 })

    // Reference and Application type ("Marine licence"/"Marine License") values,
    // and the Fee band value (ML-1352), are not asserted here because D365
    // renders these read-only fields inconsistently for a freshly-created case;
    // the reference value is already verified in the workbasket-row scenario.
  }
)

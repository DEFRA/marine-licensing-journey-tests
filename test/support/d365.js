import { chromium } from 'playwright'
import { expect } from '@playwright/test'
import { getConfig } from './config.js'

// Dynamics renders task forms and the web resources behind the case tabs well
// after navigation settles, and the pipeline container is slower at it than a
// developer machine. These waits are for that rendering, not for anything the
// test does, so they are generous and kept in one place.
const D365_RENDER_TIMEOUT = 120_000
const D365_NAVIGATION_TIMEOUT = 60_000

const APPLICANT_ORG_SELECTOR =
  '[data-id="mmo_applicantorganisationid.fieldControl-LookupResultsDropdown_mmo_applicantorganisationid_selected_tag_text"]'
const APPLICANT_SELECTOR =
  '[data-id="customerid.fieldControl-LookupResultsDropdown_customerid_selected_tag_text"]'
const APP_URL_SELECTOR =
  '[data-id="ml_applicationurl.fieldControl-url-text-input"]'

async function readRecordField(page, columnName) {
  switch (columnName) {
    case 'Reference number':
      return (
        await page.getByLabel('Reference', { exact: true }).inputValue()
      ).trim()
    case 'Project Name':
      return (
        await page.getByLabel('Project Name', { exact: true }).inputValue()
      ).trim()
    case 'Submitted Date':
      return (
        await page.getByLabel('Submitted Date', { exact: true }).inputValue()
      ).trim()
    case 'Applicant':
      return (await page.locator(APPLICANT_SELECTOR).first().innerText()).trim()
    case 'Applicant Organisation':
      return (
        await page.locator(APPLICANT_ORG_SELECTOR).first().innerText()
      ).trim()
    case 'D365 Status': {
      // Header status lives in an open shadow root under
      // uci-header-control-list-item; CSS pierces it, XPath does not.
      const value = page
        .locator('[data-name="header_statuscode"] .value-text')
        .first()
      await value.waitFor({ state: 'visible', timeout: 30_000 })
      return (await value.innerText()).trim()
    }
    default:
      return null
  }
}

export async function launchD365Browser() {
  const config = getConfig()

  const browser = await chromium.launch({
    headless: config.headless,
    args: config.chromiumArgs
  })

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 }
  })
  context.setDefaultTimeout(60_000)
  context.setDefaultNavigationTimeout(60_000)

  const page = await context.newPage()

  return { browser, context, page }
}

export async function loginToD365(page) {
  const d365Url = process.env.D365_URL
  const userId = process.env.D365_USER_ID
  const password = process.env.D365_USER_PASSWORD

  if (!d365Url || !userId || !password) {
    throw new Error(
      'Missing required env vars: D365_URL, D365_USER_ID, D365_USER_PASSWORD'
    )
  }

  await page.goto(d365Url, { waitUntil: 'domcontentloaded' })

  // Enter email
  await page.locator('input[type="email"]').fill(userId)
  await page.locator('input[type="submit"]').click()

  // Enter password
  await page
    .locator('input[type="password"]')
    .waitFor({ state: 'visible', timeout: 15_000 })
  await page.locator('input[type="password"]').fill(password)
  await page.locator('input[type="submit"]').click()

  // Handle "Stay signed in?" prompt
  const staySignedInBtn = page.locator(
    'input[type="submit"][value="Yes"], input#idSIButton9'
  )
  try {
    await staySignedInBtn.waitFor({ state: 'visible', timeout: 10_000 })
    await staySignedInBtn.click()
    await staySignedInBtn.waitFor({ state: 'hidden', timeout: 30_000 })
  } catch {
    // Prompt not shown or already dismissed
  }

  // Wait for D365 to load
  await page.waitForURL(/.*crm11\.dynamics\.com.*/, { timeout: 60_000 })
}

async function dismissSignInPrompt(
  page,
  { timeout = 15_000, attempts = 5 } = {}
) {
  // D365 shows a "Please sign in again" modal with a blue "Sign In" button;
  // depending on the variant the button is either data-id="okButton" or a
  // plain button/text element. Try both and loop in case it reappears.
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const signInBtn = page
        .locator(
          'button[data-id="okButton"], button:has-text("Sign In"), [role="button"]:has-text("Sign In")'
        )
        .first()
      await signInBtn.waitFor({ state: 'visible', timeout })
      await signInBtn.click()
      await page.waitForTimeout(2_000)
    } catch {
      return
    }
  }
}

export async function verifyD365Login(page) {
  await dismissSignInPrompt(page)

  // Verify we're on D365
  const currentUrl = page.url()
  if (!currentUrl.includes('crm11.dynamics.com')) {
    throw new Error(`Not on D365 page. Current URL: ${currentUrl}`)
  }

  // Wait for Cases section to render
  await page
    .locator('span:has-text("Cases")')
    .first()
    .waitFor({ state: 'visible', timeout: 60_000 })
}

const VIEW_SELECTOR = 'button[data-id^="ViewSelector_"]'
export const COMPLETED_CASES_VIEW = /Completed Cases/i
export const MARINE_LICENCE_CASES_VIEW = /Marine licen[cs]e cases/i

export async function selectCasesView(page, viewName) {
  const selector = page.locator(VIEW_SELECTOR).first()
  await selector.waitFor({ state: 'visible', timeout: D365_RENDER_TIMEOUT })
  if (viewName.test((await selector.getAttribute('aria-label')) ?? '')) {
    return
  }
  await selector.click()
  await page.getByRole('menuitemradio', { name: viewName }).first().click()
  await expect(selector).toHaveAttribute('aria-label', viewName, {
    timeout: D365_RENDER_TIMEOUT
  })
  await page.waitForLoadState('load')
}

export async function searchD365Case(page, reference) {
  // The "Please sign in again" modal can reappear between login and grid
  // interaction — dismiss it defensively before searching.
  await dismissSignInPrompt(page, { timeout: 3_000, attempts: 3 })

  await selectCasesView(page, COMPLETED_CASES_VIEW)

  const searchInput = page
    .locator('input[data-id^="quickFind_text"], #SearchBoxWithTypeAhead-input')
    .first()
  const ticketCell = page.locator(
    'div[role="row"][row-index="0"] div[col-id="ticketnumber"]'
  )
  const rowLabel = page.locator(
    `div[role="row"][row-index="0"] div[col-id="ticketnumber"] label[aria-label="${reference}"]`
  )

  // Newly submitted or updated cases can lag the search index, so re-run the
  // search until the case appears as the first row.
  let found = false
  for (let attempt = 1; attempt <= 8 && !found; attempt++) {
    await searchInput.waitFor({ state: 'visible', timeout: 30_000 })
    await searchInput.fill(reference)
    await searchInput.press('Enter')
    try {
      await page
        .locator('div[role="treegrid"]')
        .first()
        .waitFor({ state: 'visible', timeout: 20_000 })
      await rowLabel.waitFor({ state: 'visible', timeout: 12_000 })
      found = true
    } catch (error) {
      if (attempt === 8) throw error
      await page.waitForTimeout(10_000)
    }
  }

  let opened = false
  for (let attempt = 1; attempt <= 5 && !opened; attempt++) {
    try {
      await page.waitForTimeout(1_500)
      await ticketCell.dblclick({ timeout: 15_000 })
      await page.waitForURL(/pagetype=entityrecord.*etn=incident/, {
        timeout: 15_000
      })
      opened = true
    } catch (error) {
      if (attempt === 5) throw error
      await page.waitForTimeout(2_000)
    }
  }
  await page.waitForLoadState('load')
  await page
    .locator(APPLICANT_ORG_SELECTOR)
    .first()
    .waitFor({ state: 'visible', timeout: 30_000 })
}

export async function verifyD365CaseDetails(page, expectedDetails) {
  const maxRetries = 3
  let lastError = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      for (const [columnName, expectedValue] of Object.entries(
        expectedDetails
      )) {
        const actual = await readRecordField(page, columnName)
        if (actual === null) continue
        expect(actual).toBe(expectedValue)
      }
      return
    } catch (error) {
      lastError = error
      if (attempt < maxRetries) {
        await page.waitForTimeout(5_000)
      }
    }
  }

  throw lastError
}

export async function openD365CaseRecord(page, applicantOrganisation) {
  // Record is already open after searchD365Case — just validate org and return URL.
  const orgField = page.locator(APPLICANT_ORG_SELECTOR)
  await orgField.waitFor({ state: 'visible', timeout: 30_000 })
  const orgText = await orgField.innerText()
  expect(orgText.trim()).toBe(applicantOrganisation)
  // Marine licence case forms have no Application URL field
  // Exemption case forms show it and we read it.
  const appUrlInput = page.locator(APP_URL_SELECTOR).first()
  const appUrlVisible = await appUrlInput
    .waitFor({ state: 'visible', timeout: 10_000 })
    .then(() => true)
    .catch(() => false)
  if (!appUrlVisible) {
    return null
  }
  await expect(appUrlInput).toHaveValue(/^https?:\/\//, { timeout: 60_000 })
  return await appUrlInput.getAttribute('value')
}

export const SITE_CHECK_FIELDS = {
  coordinatesAndShape: 'mmo_rethecoordinatesandshapeacceptableforasses',
  withinWfdArea: 'mmo_issiteslocatedinthewfdarea',
  notes: 'description'
}

const siteCheckContainer = (attr) =>
  `[data-id="${attr}-FieldSectionItemContainer"]`

export function siteCheckTaskLink(page) {
  return page.getByRole('link', { name: 'Site check' }).first()
}

export function siteCoordinatesDownloadCsvLink(page) {
  return page
    .frameLocator('iframe[title="Site Coordinates HTML Resource"]')
    .getByText('Download CSV')
}

export async function readSiteCoordinatesCsvUrl(page) {
  return page.evaluate(() => {
    const findXrm = (w, depth = 0) => {
      if (depth > 4) return null
      try {
        if (w.Xrm?.Page?.getAttribute) return w.Xrm
      } catch {
        /* cross-origin frame */
      }
      for (let i = 0; i < (w.frames?.length || 0); i++) {
        try {
          const found = findXrm(w.frames[i], depth + 1)
          if (found) return found
        } catch {
          /* cross-origin frame */
        }
      }
      return null
    }
    const Xrm = findXrm(window)
    return Xrm?.Page.getAttribute('mmo_coordinatescsvurl')?.getValue() ?? null
  })
}

// The case tasks are created by an asynchronous Dynamics flow after the case is
// submitted, so the Tasks subgrid renders empty - "No data available" - for a
// while rather than slowly. Waiting longer on one page load cannot help; the
// record has to be reloaded until the flow has run.
export async function waitForCaseTaskLink(page, link, name) {
  // Each attempt has to give the subgrid time to paint after the reload. A
  // point-in-time check straight after load is always false and the next
  // reload throws away the render that was on its way.
  for (let attempt = 1; attempt <= 12; attempt++) {
    try {
      await link.waitFor({ state: 'visible', timeout: 15_000 })
      return
    } catch {
      await page.reload().catch(() => {})
      await page.waitForLoadState('load').catch(() => {})
    }
  }
  throw new Error(
    `The ${name} task never appeared on the case after three minutes. The ` +
      'Tasks list is most likely still empty because the Dynamics flow that ' +
      'creates the tasks has not run yet.'
  )
}

export async function openSiteCheckTask(page) {
  const link = siteCheckTaskLink(page)
  await waitForCaseTaskLink(page, link, 'Site check')
  await link.click()
  await page.waitForURL(/pagetype=entityrecord.*etn=task/, {
    timeout: D365_NAVIGATION_TIMEOUT
  })
  await page.waitForLoadState('load')
  await page
    .locator(siteCheckContainer(SITE_CHECK_FIELDS.coordinatesAndShape))
    .waitFor({ state: 'visible', timeout: D365_RENDER_TIMEOUT })
}

export async function readSiteCheckFieldMeta(page) {
  return page.evaluate((attrs) => {
    const findXrm = (w, depth = 0) => {
      if (depth > 4) return null
      try {
        if (w.Xrm?.Page?.getAttribute) return w.Xrm
      } catch {
        /* cross-origin frame */
      }
      for (let i = 0; i < (w.frames?.length || 0); i++) {
        try {
          const found = findXrm(w.frames[i], depth + 1)
          if (found) return found
        } catch {
          /* cross-origin frame */
        }
      }
      return null
    }

    const Xrm = findXrm(window)
    if (!Xrm) return null

    const meta = {}
    for (const [key, attr] of Object.entries(attrs)) {
      const attribute = Xrm.Page.getAttribute(attr)
      meta[key] = attribute
        ? {
            type: attribute.getAttributeType(),
            requiredLevel: attribute.getRequiredLevel(),
            maxLength: attribute.getMaxLength ? attribute.getMaxLength() : null,
            options: attribute.getOptions
              ? attribute.getOptions().map((option) => option.text)
              : null
          }
        : null
    }
    return meta
  }, SITE_CHECK_FIELDS)
}

export const WFD_TASK_FIELDS = {
  withinNauticalMile: 'mmo_isyourprojectwithinonenauticalmile',
  limitedToExcludedActivities: 'mmo_isyourprojectlimitedtooneofthefollowing',
  documentUrl: 'mmo_wfddocumenturl',
  documentFilename: 'mmo_wfdfilename',
  sectionComplete: 'mmo_isthewfdsectioncompleteandacceptable'
}

export async function completeSiteCheckTask(page) {
  const caseUrl = page.url()
  await openSiteCheckTask(page)

  await page.evaluate(async (fields) => {
    const findXrm = (w, depth = 0) => {
      if (depth > 4) return null
      try {
        if (w.Xrm?.Page?.getAttribute) return w.Xrm
      } catch {
        /* cross-origin frame */
      }
      for (let i = 0; i < (w.frames?.length || 0); i++) {
        try {
          const found = findXrm(w.frames[i], depth + 1)
          if (found) return found
        } catch {
          /* cross-origin frame */
        }
      }
      return null
    }
    const Xrm = findXrm(window)
    const setYes = (attr) => {
      const attribute = Xrm.Page.getAttribute(attr)
      const yes = attribute.getOptions().find((o) => o.text === 'Yes')
      attribute.setValue(yes.value)
    }
    setYes(fields.coordinatesAndShape)
    setYes(fields.withinWfdArea)
    Xrm.Page.getAttribute('statecode').setValue(1) // Completed
    await Xrm.Page.data.save()
  }, SITE_CHECK_FIELDS)

  await page.goto(caseUrl)
  await page.waitForLoadState('load')
}

export function wfdTaskLink(page) {
  return page.getByRole('link', { name: 'Water Framework Directive' }).first()
}

export async function openWfdTask(page) {
  const link = wfdTaskLink(page)
  await waitForCaseTaskLink(page, link, 'Water Framework Directive')
  await link.click()
  await page.waitForURL(/pagetype=entityrecord.*etn=task/, {
    timeout: D365_NAVIGATION_TIMEOUT
  })
  await page.waitForLoadState('load')
  await page
    .locator(
      `[data-id="${WFD_TASK_FIELDS.sectionComplete}-FieldSectionItemContainer"]`
    )
    .waitFor({ state: 'visible', timeout: D365_RENDER_TIMEOUT })
}

export async function readWfdTaskFieldMeta(page) {
  return page.evaluate((fields) => {
    const findXrm = (w, depth = 0) => {
      if (depth > 4) return null
      try {
        if (w.Xrm?.Page?.getAttribute) return w.Xrm
      } catch {
        /* cross-origin frame */
      }
      for (let i = 0; i < (w.frames?.length || 0); i++) {
        try {
          const found = findXrm(w.frames[i], depth + 1)
          if (found) return found
        } catch {
          /* cross-origin frame */
        }
      }
      return null
    }
    const Xrm = findXrm(window)
    if (!Xrm) return null

    const meta = {}
    for (const [key, attr] of Object.entries(fields)) {
      const attribute = Xrm.Page.getAttribute(attr)
      const control = Xrm.Page.getControl(attr)
      meta[key] = attribute
        ? {
            value: attribute.getText
              ? attribute.getText()
              : attribute.getValue(),
            requiredLevel: attribute.getRequiredLevel(),
            visible: control?.getVisible ? control.getVisible() : null,
            readOnly: control?.getDisabled ? control.getDisabled() : null,
            options: attribute.getOptions
              ? attribute.getOptions().map((option) => option.text)
              : null
          }
        : null
    }
    return meta
  }, WFD_TASK_FIELDS)
}

export async function completeWfdReview(page) {
  return page.evaluate(async (fields) => {
    const findXrm = (w, depth = 0) => {
      if (depth > 4) return null
      try {
        if (w.Xrm?.Page?.getAttribute) return w.Xrm
      } catch {
        /* cross-origin frame */
      }
      for (let i = 0; i < (w.frames?.length || 0); i++) {
        try {
          const found = findXrm(w.frames[i], depth + 1)
          if (found) return found
        } catch {
          /* cross-origin frame */
        }
      }
      return null
    }
    const Xrm = findXrm(window)
    if (!Xrm) {
      throw new Error('completeWfdReview: Xrm not found on WFD task page')
    }
    const review = Xrm.Page.getAttribute(fields.sectionComplete)
    const yes = review.getOptions().find((o) => o.text === 'Yes')
    review.setValue(yes.value)
    try {
      await Xrm.Page.data.save()
    } catch (e) {
      throw new Error(
        `completeWfdReview: save failed: ${e?.message ?? JSON.stringify(e)}`
      )
    }
    const statuscode = Xrm.Page.getAttribute('statuscode')
    let status = statuscode.getText()
    for (let i = 0; i < 10 && status !== 'Done'; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      status = statuscode.getText()
    }
    return status
  }, WFD_TASK_FIELDS)
}

export async function readProjectDetailsTab(page) {
  return page.evaluate(async () => {
    const findXrm = (w, depth = 0) => {
      if (depth > 4) return null
      try {
        if (w.Xrm?.Page?.ui) return w.Xrm
      } catch {
        /* cross-origin frame */
      }
      for (let i = 0; i < (w.frames?.length || 0); i++) {
        try {
          const found = findXrm(w.frames[i], depth + 1)
          if (found) return found
        } catch {
          /* cross-origin frame */
        }
      }
      return null
    }
    const Xrm = findXrm(window)
    try {
      Xrm?.Page.ui.tabs.get('project_details_tab').setFocus()
    } catch {
      /* tab focus is best-effort */
    }

    const read = () => {
      let result = null
      const walk = (w) => {
        let doc
        try {
          doc = w.document
        } catch {
          return
        }
        const content = doc.getElementById('mmo-content')
        if (content && !result) {
          result = {
            busy: content.getAttribute('aria-busy'),
            projectName: doc.getElementById('val-name')?.textContent?.trim(),
            projectBackground: doc
              .getElementById('val-background')
              ?.textContent?.trim(),
            preferredDates: doc.getElementById('val-dates')?.textContent?.trim()
          }
        }
        for (let i = 0; i < (w.frames?.length || 0); i++) {
          if (result) break
          try {
            walk(w.frames[i])
          } catch {
            /* cross-origin frame */
          }
        }
      }
      walk(window)
      return result
    }

    for (let i = 0; i < 40; i++) {
      const details = read()
      if (details && details.busy !== 'true' && details.projectName) {
        return details
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    return read()
  })
}

export const PUBLIC_REGISTER_WEBRESOURCE_ID = 'WebResource_publicregister'

export function caseTab(page, tabLabel) {
  return page.locator(`[role="tab"][aria-label="${tabLabel}"]`)
}

export async function openPublicRegisterTab(page) {
  const tab = caseTab(page, 'Public register')
  await tab.waitFor({ state: 'visible', timeout: D365_NAVIGATION_TIMEOUT })
  await tab.click()
  await page.waitForLoadState('load')
}

export async function readPublicRegisterMeta(page) {
  return page.evaluate((frameId) => {
    const frame = document.getElementById(frameId)
    if (!frame) return null
    let doc
    try {
      doc = frame.contentDocument || frame.contentWindow.document
    } catch {
      return { crossOrigin: true }
    }
    if (!doc) return null
    const text = (sel) => doc.querySelector(sel)?.innerText?.trim() ?? null
    const shown = (sel) => {
      const el = doc.querySelector(sel)
      return el ? !el.classList.contains('mmo-hidden') : false
    }
    return {
      statusText: text('#mmo-status-text'),
      contentVisible: shown('#mmo-content'),
      labels: [...doc.querySelectorAll('.mmo-field-label')].map((el) =>
        el.innerText.trim()
      ),
      withhold: text('#val-withhold'),
      reasonRowVisible: shown('#row-reason'),
      reason: text('#val-reason')
    }
  }, PUBLIC_REGISTER_WEBRESOURCE_ID)
}

export const OTHER_PERMISSIONS_WEBRESOURCE_ID = 'WebResource_otherpermissions'

export async function openOtherPermissionsTab(page) {
  const tab = caseTab(page, 'Other permissions')
  await tab.waitFor({ state: 'visible', timeout: D365_NAVIGATION_TIMEOUT })
  await tab.click()
  await page.waitForLoadState('load')
}

export async function readOtherPermissionsMeta(page) {
  return page.evaluate((frameId) => {
    const frame = document.getElementById(frameId)
    if (!frame) return null
    let doc
    try {
      doc = frame.contentDocument || frame.contentWindow.document
    } catch {
      return { crossOrigin: true }
    }
    if (!doc) return null
    const text = (sel) => doc.querySelector(sel)?.innerText?.trim() ?? null
    return {
      statusText: text('#mmo-op-status-text'),
      navLabels: [...doc.querySelectorAll('.mmo-op-nav .mmo-op-link')].map(
        (link) => link.innerText.trim()
      ),
      specialLegalPowers: text('#val-specialLegalPowers'),
      harbourAuthority: text('#val-harbourAuthority'),
      otherAuthorities: text('#val-otherAuthorities'),
      publicConsultation: text('#val-publicConsultation')
    }
  }, OTHER_PERMISSIONS_WEBRESOURCE_ID)
}

const OTHER_PERMISSION_SECTIONS = [
  {
    label: 'Special legal powers',
    valId: 'val-specialLegalPowers',
    key: 'specialLegalPowers'
  },
  {
    label: 'Harbour authority',
    valId: 'val-harbourAuthority',
    key: 'harbourAuthority'
  },
  {
    label: 'Other authorities',
    valId: 'val-otherAuthorities',
    key: 'otherAuthorities'
  },
  {
    label: 'Pre-application consultation',
    valId: 'val-publicConsultation',
    key: 'publicConsultation'
  }
]

export async function readOtherPermissionAnswersByNav(page) {
  const frame = page.frameLocator(`#${OTHER_PERMISSIONS_WEBRESOURCE_ID}`)
  const answers = {}
  for (const section of OTHER_PERMISSION_SECTIONS) {
    await frame
      .locator('.mmo-op-nav .mmo-op-link', { hasText: section.label })
      .first()
      .click()
    const value = frame.locator(`#${section.valId}`)
    await value.waitFor({ state: 'visible', timeout: 10_000 })
    answers[section.key] = (await value.innerText()).trim()
  }
  return answers
}

export const WFD_TAB_WEBRESOURCE_ID = 'WebResource_waterframeworkdirective'

export async function openWfdTab(page) {
  const tab = caseTab(page, 'Water Framework Directive')
  await tab.waitFor({ state: 'visible', timeout: D365_NAVIGATION_TIMEOUT })
  await tab.click()
  await page.waitForLoadState('load')
}

export async function readWfdTabMeta(page) {
  return page.evaluate((frameId) => {
    const frame = document.getElementById(frameId)
    if (!frame) return null
    let doc
    try {
      doc = frame.contentDocument || frame.contentWindow.document
    } catch {
      return { crossOrigin: true }
    }
    if (!doc) return null

    const fields = doc.getElementById('mmo-wfd-fields')
    if (!fields) return null

    const hintList = doc.getElementById('mmo-wfd-hint-list')
    return {
      fieldsLoaded: true,
      text: hintList?.innerText?.trim() ?? fields.innerText?.trim() ?? null,
      hasAssessmentUpload: Boolean(doc.getElementById('mmo-doc-download'))
    }
  }, WFD_TAB_WEBRESOURCE_ID)
}

export async function readWfdTabAnswers(page) {
  return page.evaluate((frameId) => {
    const frame = document.getElementById(frameId)
    if (!frame) {
      return {
        nauticalMile: null,
        excludedActivities: null,
        downloadFile: null,
        downloadEnabled: null
      }
    }
    let doc
    try {
      doc = frame.contentDocument || frame.contentWindow.document
    } catch {
      return {
        nauticalMile: null,
        excludedActivities: null,
        downloadFile: null,
        downloadEnabled: null
      }
    }

    const download = doc?.getElementById('mmo-doc-download')
    return {
      nauticalMile:
        doc?.getElementById('mmo-wfd-nautical-mile')?.innerText?.trim() ?? null,
      excludedActivities:
        doc?.getElementById('mmo-wfd-excluded-activities')?.innerText?.trim() ??
        null,
      downloadFile:
        download?.getAttribute('data-filename')?.trim() ||
        download?.innerText?.trim() ||
        null,
      downloadEnabled: download ? !download.disabled : null
    }
  }, WFD_TAB_WEBRESOURCE_ID)
}

export const SITES_ACTIVITIES_WEBRESOURCE_ID = 'WebResource_sitesandactivities'

export async function openSitesAndActivitiesTab(page) {
  const tab = caseTab(page, 'Sites and activities')
  await tab.waitFor({ state: 'visible', timeout: D365_NAVIGATION_TIMEOUT })
  await tab.click()
  await page.waitForLoadState('load')
}

export async function readSitesAndActivitiesMeta(page) {
  return page.evaluate((frameId) => {
    const frame = document.getElementById(frameId)
    if (!frame) return null
    let doc
    try {
      doc = frame.contentDocument || frame.contentWindow.document
    } catch {
      return { crossOrigin: true }
    }
    if (!doc) return null
    const texts = (sel) =>
      [...doc.querySelectorAll(sel)].map((el) => el.innerText.trim())
    const downloadButton = [...doc.querySelectorAll('button.mmo-file-download')]
      .map((b) => b.innerText.trim())
      .find(Boolean)
    return {
      labels: texts('.mmo-sa-label'),
      subtitles: texts('h2.mmo-sa-subtitle'),
      subActivities: texts('ul.mmo-sa-list li'),
      downloadFile: downloadButton ?? null,
      bodyText: doc.body?.innerText?.trim() ?? null
    }
  }, SITES_ACTIVITIES_WEBRESOURCE_ID)
}

export const MARINE_PLAN_POLICIES_WEBRESOURCE_ID =
  'WebResource_marineplanpolicies'

export async function openMarinePlanPoliciesTab(page) {
  const tab = caseTab(page, 'Marine plan policies')
  await tab.waitFor({ state: 'visible', timeout: D365_NAVIGATION_TIMEOUT })
  await tab.click()
  await page.waitForLoadState('load')
}

export async function readMarinePlanPoliciesMeta(page) {
  return page.evaluate((frameId) => {
    const frame = document.getElementById(frameId)
    if (!frame) return null
    let doc
    try {
      doc = frame.contentDocument || frame.contentWindow.document
    } catch {
      return { crossOrigin: true }
    }
    if (!doc) return null
    const texts = (sel) =>
      [...doc.querySelectorAll(sel)].map((el) =>
        el.innerText.replace(/\s+/g, ' ').trim()
      )
    const boxes = texts('.mmo-mpp-box')
    return {
      policyCodes: texts('.mmo-mpp-link'),
      selectedCode: texts('.mmo-mpp-link--active')[0] ?? null,
      detailTitle: texts('.mmo-mpp-detail-title')[0] ?? null,
      subheads: texts('.mmo-mpp-subhead'),
      policyInformation: boxes[0] ?? null,
      applicantConsideration: boxes[1] ?? null,
      bodyText: doc.body?.innerText?.trim() ?? null
    }
  }, MARINE_PLAN_POLICIES_WEBRESOURCE_ID)
}

export async function selectMarinePlanPolicy(page, policyCode) {
  await page.evaluate(
    ({ frameId, code }) => {
      const frame = document.getElementById(frameId)
      const doc = frame.contentDocument || frame.contentWindow.document
      const link = [...doc.querySelectorAll('.mmo-mpp-link')].find(
        (el) => el.innerText.replace(/\s+/g, ' ').trim() === code
      )
      if (!link) throw new Error(`Policy ${code} is not in the list`)
      link.click()
    },
    { frameId: MARINE_PLAN_POLICIES_WEBRESOURCE_ID, code: policyCode }
  )
}
const MARINE_LICENCE_WORKBASKET =
  '[role="treeitem"][title="Marine licence cases"], [role="treeitem"][title="Marine license cases"]'

const REQUEST_TRANSFER_COMMAND =
  'button[data-id^="incident|NoRelationship|Form|Requesttransferto"]'
const COMPLETE_TRANSFER_COMMAND =
  'button[data-id^="incident|NoRelationship|Form|Completetransfert"]'

const CASE_STATUS_CELL = 'div[col-id="statuscode"]'

async function findMarineLicenceCaseRow(page, reference) {
  await marineLicenceWorkbasket(page).click()
  await page.waitForLoadState('load')
  await selectCasesView(page, MARINE_LICENCE_CASES_VIEW)

  const search = page
    .locator('input[data-id^="quickFind_text"], #SearchBoxWithTypeAhead-input')
    .first()
  const firstRow = page.locator('div[role="row"][row-index="0"]')

  for (let attempt = 1; attempt <= 12; attempt++) {
    await search.waitFor({ state: 'visible', timeout: 30_000 })
    await search.fill(reference)
    await search.press('Enter')
    try {
      await firstRow.waitFor({ state: 'visible', timeout: 15_000 })
      await expect(firstRow.locator('[col-id="ticketnumber"]')).toContainText(
        reference,
        { timeout: 5_000 }
      )
      return firstRow
    } catch (error) {
      if (attempt === 12) throw error
      await page.waitForTimeout(15_000)
    }
  }
}

export function marineLicenceWorkbasket(page) {
  return page.locator(MARINE_LICENCE_WORKBASKET).first()
}

export async function openMarineLicenceCaseInD365(page, reference) {
  const row = await findMarineLicenceCaseRow(page, reference)
  await row.locator('div[col-id="title"] a').click()
  await page.waitForURL(/pagetype=entityrecord.*etn=incident/, {
    timeout: 30_000
  })
  await page.waitForLoadState('load')
}

// The MLA case form carries no status field, so the status is read from the
// Status column of the marine licence cases view.
export async function expectMarineLicenceCaseStatus(page, reference, expected) {
  let seen = null
  for (let attempt = 1; attempt <= 10; attempt++) {
    const row = await findMarineLicenceCaseRow(page, reference)
    seen = (await row.locator(CASE_STATUS_CELL).innerText()).trim()
    if (seen === expected) {
      return seen
    }
    await page.waitForTimeout(10_000)
  }
  throw new Error(
    `Case ${reference} status is "${seen}" in D365, expected "${expected}"`
  )
}

const CASE_READ_ONLY_NOTIFICATION = '[data-id="warningNotification"]'

export async function expectCaseReadOnly(page) {
  await expect(
    page
      .locator(CASE_READ_ONLY_NOTIFICATION)
      .filter({ hasText: /Read-only/i })
      .first()
  ).toBeVisible({ timeout: D365_RENDER_TIMEOUT })
}

const CASE_TASKS_SUBGRID = '[data-id^="dataSetRoot_Subgrid_"]'

function caseTasksGrid(page) {
  return page.locator(CASE_TASKS_SUBGRID).filter({ hasText: 'Tasks' }).first()
}

// The subgrid renders only once it is scrolled into view and unmounts again, so
// the rows are polled rather than read once. Each row reads as its subject
// followed by its status, for example "Site check Cancelled".
export async function readCaseTaskRows(page) {
  const grid = caseTasksGrid(page)
  let rows = []
  await expect
    .poll(
      async () => {
        await grid.scrollIntoViewIfNeeded().catch(() => {})
        rows = (await grid.locator('button[role="link"]').allInnerTexts()).map(
          (text) => text.replace(/\s+/g, ' ').trim()
        )
        return rows.length
      },
      {
        timeout: D365_RENDER_TIMEOUT,
        message: 'the case Tasks list renders its rows'
      }
    )
    .toBeGreaterThan(0)
  return rows
}

export async function expectCaseTasksCancelled(page) {
  const rows = await readCaseTaskRows(page)
  for (const row of rows) {
    expect(row).toMatch(/Cancelled/)
  }
  return rows
}

export async function readCaseCommandLabels(page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('button[aria-label]'))
      .map((button) => button.getAttribute('aria-label'))
      .filter(Boolean)
  )
}

async function submitTransferDialog(page, text, buttonPattern) {
  const dialog = page.locator('[role="dialog"]')
  await dialog.waitFor({ state: 'visible', timeout: 60_000 })

  const field = dialog.locator('textarea, input[type="text"]').first()
  try {
    await field.waitFor({ state: 'visible', timeout: 120_000 })
  } catch {
    throw new Error(
      'The transfer dialog opened but its Power Apps body never rendered a ' +
        `field. Dialog text: "${((await dialog.innerText().catch(() => '')) || '').replace(/\s+/g, ' ').trim()}"`
    )
  }

  let lastShown = ''
  for (let attempt = 1; attempt <= 4; attempt++) {
    await page.waitForTimeout(attempt * 3_000)

    await field.click()
    await field.press('ControlOrMeta+a')
    await field.pressSequentially(text, { delay: 20 })

    await dialog.getByRole('button', { name: buttonPattern }).first().click()

    try {
      await dialog.waitFor({ state: 'hidden', timeout: 30_000 })
      await page.waitForLoadState('load')
      return
    } catch {
      lastShown = ((await dialog.innerText().catch(() => '')) || '')
        .replace(/\s+/g, ' ')
        .trim()
    }
  }

  throw new Error(
    `Dialog stayed open after clicking ${buttonPattern}. ` +
      `Field value: ${JSON.stringify(await field.inputValue().catch(() => null))}. ` +
      `Dialog text: ${lastShown}`
  )
}

async function waitForCaseCommandBar(page) {
  await dismissSignInPrompt(page, { timeout: 3_000, attempts: 2 })
  await page
    .locator('button[data-id*="Mscrm.Form.incident.Save"]')
    .first()
    .waitFor({ state: 'visible', timeout: 120_000 })
}

async function waitForCaseCommand(page, commandSelector) {
  await waitForCaseCommandBar(page)

  const button = page.locator(commandSelector).first()
  try {
    await button.waitFor({ state: 'visible', timeout: 60_000 })
    return button
  } catch {
    const labels = await readCaseCommandLabels(page)
    throw new Error(
      `No command matching ${commandSelector} on the case. ` +
        `Commands present: ${JSON.stringify(labels)}`
    )
  }
}

export async function requestTransferToMcms(page, reasons) {
  const button = await waitForCaseCommand(page, REQUEST_TRANSFER_COMMAND)
  await button.click()
  await submitTransferDialog(page, reasons, /^request transfer$/i)
}

export async function completeTransferToMcms(page, mcmsReference) {
  const button = await waitForCaseCommand(page, COMPLETE_TRANSFER_COMMAND)
  await button.click()
  await submitTransferDialog(page, mcmsReference, /^complete transfer$/i)
}

export const MPP_TASK_OUTCOMES = {
  compliant: 'Compliant',
  nonCompliant: 'Non-compliant',
  consultationRequired: 'Consultation required'
}

export async function readMarinePlanPolicyTasks(page) {
  const pageUrl = new URL(page.url())
  const caseId = pageUrl.searchParams.get('id')?.replace(/[{}]/g, '')
  if (!caseId) {
    throw new Error(
      `readMarinePlanPolicyTasks: no case id in URL ${page.url()}`
    )
  }

  return page.evaluate(
    async ({ id, origin }) => {
      const query =
        `${origin}/api/data/v9.2/mmo_marineplanpolicyassessments` +
        `?$filter=_mmo_caseid_value eq ${id}` +
        `&$select=mmo_policycode,mmo_policyname,statuscode` +
        `&$orderby=mmo_policycode`
      const response = await fetch(query, {
        headers: {
          Accept: 'application/json',
          Prefer: 'odata.include-annotations="*"'
        }
      })
      const body = await response.json()
      if (body.error) {
        throw new Error(
          `readMarinePlanPolicyTasks: ${body.error.message ?? 'query failed'}`
        )
      }
      return (body.value ?? []).map((record) => ({
        code: record.mmo_policycode,
        name: record.mmo_policyname,
        status:
          record['statuscode@OData.Community.Display.V1.FormattedValue'] ?? null
      }))
    },
    { id: caseId, origin: pageUrl.origin }
  )
}

export async function waitForMarinePlanPolicyTaskStatus(page, expected) {
  let tasks = []
  for (let attempt = 1; attempt <= 20; attempt++) {
    tasks = await readMarinePlanPolicyTasks(page)
    const statuses = [...new Set(tasks.map((task) => task.status))]
    if (statuses.length === 1 && statuses[0] === expected) {
      return tasks
    }
    await page.waitForTimeout(6_000)
  }
  const seen = [...new Set(tasks.map((task) => task.status))]
  throw new Error(
    `Marine plan policy tasks are ${JSON.stringify(seen)} after two minutes, expected all "${expected}"`
  )
}

export async function openMarinePlanPolicyTask(page, policyCode) {
  const link = page
    .getByRole('link', { name: new RegExp(`^${policyCode}\\b`) })
    .first()
  await link.waitFor({ state: 'visible', timeout: 60_000 })
  await link.click()
  await page.waitForURL(/etn=mmo_marineplanpolicyassessment/, {
    timeout: 60_000
  })
  await page.waitForLoadState('load')
}

export async function readMarinePlanPolicyTaskMeta(page) {
  const pageUrl = new URL(page.url())
  const recordId = pageUrl.searchParams.get('id')?.replace(/[{}]/g, '')
  const entity = pageUrl.searchParams.get('etn')
  if (!recordId || entity !== 'mmo_marineplanpolicyassessment') {
    throw new Error(
      `readMarinePlanPolicyTaskMeta: expected a marine plan policy assessment record, got etn="${entity}" id="${recordId}"`
    )
  }

  return page.evaluate(
    async ({ id, origin }) => {
      const get = async (url) => {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            Prefer: 'odata.include-annotations="*"'
          }
        })
        return response.json()
      }

      const record = await get(
        `${origin}/api/data/v9.2/mmo_marineplanpolicyassessments(${id})`
      )
      if (record.error) {
        throw new Error(
          `readMarinePlanPolicyTaskMeta: ${record.error.message ?? 'read failed'} (id ${id})`
        )
      }

      const outcomeMeta = await get(
        `${origin}/api/data/v9.2/EntityDefinitions(LogicalName='mmo_marineplanpolicyassessment')` +
          `/Attributes(LogicalName='mmo_outcome')/Microsoft.Dynamics.CRM.PicklistAttributeMetadata` +
          `?$select=LogicalName&$expand=OptionSet`
      )

      return {
        policyCode: record.mmo_policycode ?? null,
        policyName: record.mmo_policyname ?? null,
        policyCategory: record.mmo_policycategory ?? null,
        policyInformation: record.mmo_policyinformationtext ?? null,
        applicantConsideration: record.mmo_applicantconsideration ?? null,
        outcome:
          record['mmo_outcome@OData.Community.Display.V1.FormattedValue'] ??
          null,
        reason: record.mmo_reasonforyourdecision ?? null,
        status:
          record['statuscode@OData.Community.Display.V1.FormattedValue'] ??
          null,
        outcomeOptions: (outcomeMeta.OptionSet?.Options ?? [])
          .map((option) => option.Label?.UserLocalizedLabel?.Label)
          .filter(Boolean)
      }
    },
    { id: recordId, origin: pageUrl.origin }
  )
}

const MPP_OUTCOME_COMBOBOX =
  '[data-id="mmo_outcome.fieldControl-option-set-select"]'
const MPP_REASON_INPUT =
  '[data-id="mmo_reasonforyourdecision.fieldControl-text-box-text"]'
const MPP_SAVE_AND_CLOSE = 'button[data-id*="SaveAndClose"]'

const MPP_SAVE_ATTEMPTS = 3

async function readFormMessages(page) {
  const texts = await page
    .evaluate(() =>
      Array.from(
        document.querySelectorAll(
          '[role="alert"], [role="dialog"], [data-id*="errorMessage"]'
        )
      )
        .map((node) => node.innerText)
        .filter(Boolean)
    )
    .catch(() => [])

  return texts
    .map((text) => text.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join(' | ')
    .slice(0, 500)
}

export async function completeMarinePlanPolicyTask(page, outcome, reason) {
  const combobox = page.locator(MPP_OUTCOME_COMBOBOX).first()
  await combobox.waitFor({ state: 'visible', timeout: 60_000 })

  const reasonInput = page.locator(MPP_REASON_INPUT).first()
  await reasonInput.waitFor({ state: 'visible', timeout: 30_000 })

  let lastMessages = ''
  for (let attempt = 1; attempt <= MPP_SAVE_ATTEMPTS; attempt++) {
    await combobox.click()
    await page
      .getByRole('option', { name: outcome, exact: true })
      .first()
      .click()

    await reasonInput.click()
    await reasonInput.press('ControlOrMeta+a')
    await reasonInput.pressSequentially(reason, { delay: 20 })
    await reasonInput.press('Tab')

    const save = page.locator(MPP_SAVE_AND_CLOSE).first()
    await save.waitFor({ state: 'visible', timeout: 30_000 })
    await save.click()

    try {
      await page.waitForURL(/etn=incident/, { timeout: 45_000 })
      await page.waitForLoadState('load')
      return
    } catch {
      lastMessages = await readFormMessages(page)
      await page.waitForTimeout(attempt * 3_000)
    }
  }

  throw new Error(
    `Save and close did not return to the case after ${MPP_SAVE_ATTEMPTS} attempts. ` +
      `Outcome: ${JSON.stringify(outcome)}. ` +
      `Reason field value: ${JSON.stringify(await reasonInput.inputValue().catch(() => null))}. ` +
      `Form messages: ${lastMessages || 'none captured'}`
  )
}

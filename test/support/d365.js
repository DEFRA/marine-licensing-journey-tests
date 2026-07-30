import { chromium } from 'playwright'
import { expect } from '@playwright/test'
import { getConfig } from './config.js'

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
      const value = page
        .locator(
          'xpath=//div[@data-id="form-header"]//div[normalize-space(text())="Status"]/preceding-sibling::div[1]'
        )
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

export async function searchD365Case(page, reference) {
  // The "Please sign in again" modal can reappear between login and grid
  // interaction — dismiss it defensively before searching.
  await dismissSignInPrompt(page, { timeout: 3_000, attempts: 3 })

  const searchInput = page
    .locator('input[data-id^="quickFind_text"], #SearchBoxWithTypeAhead-input')
    .first()
  await searchInput.waitFor({ state: 'visible', timeout: 30_000 })
  await searchInput.fill(reference)
  await searchInput.press('Enter')

  await page
    .locator('div[role="treegrid"][aria-label="Completed Cases"]')
    .waitFor({ state: 'visible', timeout: 30_000 })

  const ticketCell = page.locator(
    'div[role="row"][row-index="0"] div[col-id="ticketnumber"]'
  )
  await page
    .locator(
      `div[role="row"][row-index="0"] div[col-id="ticketnumber"] label[aria-label="${reference}"]`
    )
    .waitFor({ state: 'visible', timeout: 30_000 })

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

export async function openSiteCheckTask(page) {
  const link = siteCheckTaskLink(page)
  await link.waitFor({ state: 'visible', timeout: 30_000 })
  await link.click()
  await page.waitForURL(/pagetype=entityrecord.*etn=task/, { timeout: 30_000 })
  await page.waitForLoadState('load')
  await page
    .locator(siteCheckContainer(SITE_CHECK_FIELDS.coordinatesAndShape))
    .waitFor({ state: 'visible', timeout: 30_000 })
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
  await link.waitFor({ state: 'visible', timeout: 30_000 })
  await link.click()
  await page.waitForURL(/pagetype=entityrecord.*etn=task/, { timeout: 30_000 })
  await page.waitForLoadState('load')
  await page
    .locator(
      `[data-id="${WFD_TASK_FIELDS.sectionComplete}-FieldSectionItemContainer"]`
    )
    .waitFor({ state: 'visible', timeout: 30_000 })
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

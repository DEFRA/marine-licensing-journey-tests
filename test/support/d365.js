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
      return (await page.getByLabel('Reference', { exact: true }).inputValue()).trim()
    case 'Project Name':
      return (await page.getByLabel('Project Name', { exact: true }).inputValue()).trim()
    case 'Submitted Date':
      return (await page.getByLabel('Submitted Date', { exact: true }).inputValue()).trim()
    case 'Applicant':
      return (await page.locator(APPLICANT_SELECTOR).first().innerText()).trim()
    case 'Applicant Organisation':
      return (await page.locator(APPLICANT_ORG_SELECTOR).first().innerText()).trim()
    case 'D365 Status': {
      // Header "Application Status" field has no data-id on the value; find
      // the label text and read its preceding sibling.
      const value = page
        .locator(
          'xpath=//div[normalize-space(text())="Application Status"]/preceding-sibling::div[1]'
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

async function dismissSignInPrompt(page, { timeout = 15_000, attempts = 5 } = {}) {
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

  // Filter the Completed Cases grid by reference number using the in-grid
  // search box (#SearchBoxWithTypeAhead-input). This element filters the
  // already-loaded grid cache — it's the same DOM element whether D365
  // Copilot is enabled (placeholder "Ask about data in this table.") or
  // disabled (placeholder "Filter by keyword"), and pressing Enter performs
  // a plain keyword match either way. Then double-click the first result
  // row to open the case record form.
  const searchInput = page.locator('#SearchBoxWithTypeAhead-input')
  await searchInput.waitFor({ state: 'visible', timeout: 30_000 })
  await searchInput.fill(reference)
  await searchInput.press('Enter')

  await page
    .locator('div[role="treegrid"][aria-label="Completed Cases"]')
    .waitFor({ state: 'visible', timeout: 30_000 })

  // Wait for the grid to reduce to a single matching row.
  await page
    .locator('div[role="row"][row-index="0"]')
    .waitFor({ state: 'visible', timeout: 30_000 })

  // Double-click the first cell of the matched row to open the record.
  await page
    .locator('div[role="row"][row-index="0"] div[role="gridcell"]')
    .first()
    .dblclick()

  await page.waitForURL(/pagetype=entityrecord.*etn=incident/, {
    timeout: 30_000
  })
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

  const appUrlInput = page.locator(APP_URL_SELECTOR)
  await appUrlInput.waitFor({ state: 'visible', timeout: 30_000 })
  return await appUrlInput.getAttribute('value')
}

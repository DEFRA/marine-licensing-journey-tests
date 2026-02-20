import { chromium } from 'playwright'
import { expect } from '@playwright/test'

const COLUMN_MAP = {
  'Reference number': { colId: 'ticketnumber', type: 'label' },
  'Project Name': { colId: 'title', type: 'link' },
  'Applicant Organisation': {
    colId: 'mmo_applicantorganisationid',
    type: 'link'
  },
  Applicant: { colId: 'customerid', type: 'link' },
  'Application Status': { colId: 'statuscode', type: 'label' },
  'Submitted Date': { colId: 'createdon', type: 'label' }
}

function gridCellSelector(colId, type) {
  const suffix = type === 'label' ? ' label' : ' a'
  return `div[role="gridcell"][col-id="${colId}"]${suffix}`
}

export async function launchD365Browser() {
  const args = [
    '--no-sandbox',
    '--disable-infobars',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--ignore-certificate-errors',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions'
  ]

  const launchOptions = {
    headless: process.env.HEADLESS !== 'false',
    args
  }

  if (process.env.ENVIRONMENT === 'test' && process.platform === 'linux') {
    launchOptions.executablePath = '/usr/lib/chromium/chromium'
  }

  const browser = await chromium.launch(launchOptions)

  const contextOptions = {
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  }

  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY
  if (proxy) {
    contextOptions.proxy = { server: proxy }
  }

  const context = await browser.newContext(contextOptions)
  context.setDefaultTimeout(60_000)
  context.setDefaultNavigationTimeout(60_000)

  const page = await context.newPage()
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
  })

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

export async function verifyD365Login(page) {
  // Dismiss repeated "Please sign in again" modal dialogs
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const signInBtn = page.locator('button[data-id="okButton"]')
      await signInBtn.waitFor({ state: 'visible', timeout: 15_000 })
      await signInBtn.click()
      await page.waitForTimeout(2_000)
    } catch {
      break
    }
  }

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
  const searchInput = page.locator('#SearchBoxWithTypeAhead-input')
  await searchInput.waitFor({ state: 'visible', timeout: 30_000 })
  await searchInput.fill(reference)
  await searchInput.press('Enter')

  // Wait for grid to update
  await page
    .locator('div[role="treegrid"][aria-label="Completed Cases"]')
    .waitFor({ state: 'visible', timeout: 30_000 })
}

export async function verifyD365CaseDetails(page, expectedDetails) {
  const maxRetries = 8

  let lastError = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    // Dismiss any D365 modal overlay
    await page.evaluate(() => {
      const portal = document.getElementById('__fluentPortalMountNode')
      if (portal) portal.remove()
    })
    await page.waitForTimeout(1_000)

    // Refresh the grid
    const refreshBtn = page.locator('button[aria-label="Refresh"]').first()
    await refreshBtn.waitFor({ state: 'visible', timeout: 15_000 })
    await refreshBtn.click({ force: true })

    await page.waitForTimeout(5_000)
    await page
      .locator('div[role="row"][row-index="0"]')
      .waitFor({ state: 'visible', timeout: 30_000 })

    try {
      for (const [columnName, expectedValue] of Object.entries(
        expectedDetails
      )) {
        const mapping = COLUMN_MAP[columnName]
        if (!mapping) {
          throw new Error(`Unknown D365 column: ${columnName}`)
        }

        const selector = gridCellSelector(mapping.colId, mapping.type)
        const element = page.locator(selector).first()
        await element.waitFor({ state: 'visible', timeout: 15_000 })
        const actualText = await element.innerText()

        expect(actualText.trim()).toBe(expectedValue)
      }

      // All assertions passed
      return
    } catch (error) {
      lastError = error
      if (attempt < maxRetries) {
        await page.waitForTimeout(15_000)
      }
    }
  }

  throw lastError
}

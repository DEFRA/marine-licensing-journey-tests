import { getConfig } from './config.js'
import {
  registerTestUser,
  loginAsTestUser,
  loginWithRealDefraId,
  selectOrganisationRole,
  acceptCookies
} from './auth.js'
import { buildNavigationUrl } from '../test-data/exemption.js'

const GUIDANCE_PATH = '/guidance/who-is-the-exemption-for'

async function selectGuidanceOptionAndContinueIfPresent(
  page,
  timeout = 10_000
) {
  const radio = page.locator('#whoIsExemptionFor')
  try {
    await radio.waitFor({ state: 'visible', timeout })
    await radio.click()
    await page.locator('button[type="submit"]:not([name="analytics"])').click()
  } catch {
    // Not on guidance page — already authenticated and redirected
  }
}

async function handleConfirmEmployeePageIfPresent(page) {
  try {
    const radio = page.locator('input[type="radio"][value="yes"]')
    await radio.waitFor({ state: 'visible', timeout: 5_000 })
    await radio.click()
    await page.locator('button:has-text("Continue")').click()
    await page.waitForLoadState('load')
  } catch {
    // Confirm employee page not shown — skip
  }
}

export async function navigateAndAuthenticate(world, targetPath, options = {}) {
  const config = getConfig()

  if (!world.data?.iatContext) {
    throw new Error(
      'Test data must include iatContext before navigating. ' +
        'Call a test data factory (e.g. createValidProjectNameData) first.'
    )
  }

  // Register user BEFORE navigating so the authorize page includes their login link
  if (!config.isRealDefraId && !world.testUser) {
    world.testUser = await registerTestUser(config.defraIdUrl)
  }

  const url = buildNavigationUrl(GUIDANCE_PATH, world.data.iatContext)
  await world.page.goto(new URL(url, config.baseURL).toString())
  await selectGuidanceOptionAndContinueIfPresent(world.page)

  if (config.isRealDefraId) {
    if (!world.isAuthenticated) {
      await loginWithRealDefraId(world.page)
      world.isAuthenticated = true
    }
    await selectOrganisationRole(world.page)
  } else {
    await loginAsTestUser(world.page, world.testUser)
  }

  await handleConfirmEmployeePageIfPresent(world.page)

  if (!options.skipCookies) {
    await acceptCookies(world.page)
  }
}

export async function signOut(page) {
  await page.locator('a[href="/sign-out"]').click()
  await page.waitForURL(/login|cdp-defra-id-stub/, { timeout: 10_000 })
}

export async function navigateAndReAuthenticate(world, targetPath) {
  const config = getConfig()
  const url = new URL(targetPath, config.baseURL).toString()
  await world.page.goto(url)

  if (config.isRealDefraId) {
    if (!world.isAuthenticated) {
      await loginWithRealDefraId(world.page)
      world.isAuthenticated = true
    }
    await selectOrganisationRole(world.page)
  } else {
    await loginAsTestUser(world.page, world.testUser)
  }

  await handleConfirmEmployeePageIfPresent(world.page)

  await acceptCookies(world.page)
}

export async function navigateWithRawQueryString(
  world,
  targetPath,
  rawQueryString
) {
  const config = getConfig()

  // Register user BEFORE navigating so the authorize page includes their login link
  if (!config.isRealDefraId && !world.testUser) {
    world.testUser = await registerTestUser(config.defraIdUrl)
  }

  const separator = rawQueryString ? '?' : ''
  const url = new URL(
    `${GUIDANCE_PATH}${separator}${rawQueryString}`,
    config.baseURL
  ).toString()
  await world.page.goto(url)
  await selectGuidanceOptionAndContinueIfPresent(world.page)

  if (config.isRealDefraId) {
    if (!world.isAuthenticated) {
      await loginWithRealDefraId(world.page)
      world.isAuthenticated = true
    }
    await selectOrganisationRole(world.page)
  } else {
    await loginAsTestUser(world.page, world.testUser)
  }

  await handleConfirmEmployeePageIfPresent(world.page)

  await acceptCookies(world.page)
}

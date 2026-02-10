import { getConfig } from './config.js'
import {
  registerTestUser,
  loginAsTestUser,
  loginWithRealDefraId,
  acceptCookies
} from './auth.js'
import { buildNavigationUrl } from '../test-data/exemption.js'

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

  const url = buildNavigationUrl(targetPath, world.data.iatContext)
  await world.page.goto(new URL(url, config.baseURL).toString())

  if (config.isRealDefraId) {
    if (!world.isAuthenticated) {
      await loginWithRealDefraId(world.page)
      world.isAuthenticated = true
    }
  } else {
    await loginAsTestUser(world.page, world.testUser)
  }

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
  } else {
    await loginAsTestUser(world.page, world.testUser)
  }

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
    `${targetPath}${separator}${rawQueryString}`,
    config.baseURL
  ).toString()
  await world.page.goto(url)

  if (config.isRealDefraId) {
    if (!world.isAuthenticated) {
      await loginWithRealDefraId(world.page)
      world.isAuthenticated = true
    }
  } else {
    await loginAsTestUser(world.page, world.testUser)
  }

  await acceptCookies(world.page)
}

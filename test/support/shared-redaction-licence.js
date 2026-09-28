import { mkdir, readFile, rename, rm, stat, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { getConfig } from './config.js'
import {
  completeManualCircleApp,
  readMarineLicenceIdFromProjects,
  submitMarineLicence
} from './lcml-helpers.js'
import { signInWithEntra, redactionUrlSegment } from './entra.js'

const CACHE_FILE = path.join(
  tmpdir(),
  `shared-redaction-licence-${process.ppid}.json`
)
const LOCK_DIR = `${CACHE_FILE}.lock`
const POLL_INTERVAL = 1_000
const MAX_AGE = 1_800_000
const MAX_WAIT = 900_000

let cached = null

async function readCache() {
  try {
    const { mtimeMs } = await stat(CACHE_FILE)
    if (Date.now() - mtimeMs > MAX_AGE) return null
    return JSON.parse(await readFile(CACHE_FILE, 'utf8'))
  } catch {
    return null
  }
}

async function writeCache(fixture) {
  const partial = `${CACHE_FILE}.${process.pid}`
  await writeFile(partial, JSON.stringify(fixture))
  await rename(partial, CACHE_FILE)
}

async function acquireLock() {
  try {
    await mkdir(LOCK_DIR)
    return true
  } catch {
    return false
  }
}

async function releaseLock() {
  await rm(LOCK_DIR, { recursive: true, force: true })
}

export function redactionPath(applicationReference) {
  return `/marine-licence/redaction/${redactionUrlSegment(applicationReference)}`
}

// The activity is otherwise picked at random, and only the construction path
// asks for a drawing, so the document rows would come and go between runs.
const FIXTURE_ACTIVITY = { topLevel: 'Construction', subOptionIndex: 0 }

async function createFixture(world) {
  await completeManualCircleApp(world, { activity: FIXTURE_ACTIVITY })
  await submitMarineLicence(world)
  await readMarineLicenceIdFromProjects(world)
  const applicantState = await world.browserContext.storageState()

  const config = getConfig()
  const caseworker = await world.browserContext.browser().newContext({
    viewport: { width: 1440, height: 1400 }
  })
  const page = await caseworker.newPage()
  page.setDefaultTimeout(60_000)
  await page.goto(
    new URL(
      redactionPath(world.data.applicationReference),
      config.baseURL
    ).toString()
  )
  await signInWithEntra(page)

  // Capturing the cookies the moment sign in returns catches the session before
  // the redirect back has set it, and the handed out context then lands on the
  // Microsoft sign in page instead of the application.
  await page.waitForURL((url) => url.toString().startsWith(config.baseURL), {
    timeout: 60_000
  })
  await page.locator('h1').waitFor({ state: 'visible', timeout: 60_000 })

  const entraState = await caseworker.storageState()
  await caseworker.close()

  return { data: world.data, entraState, applicantState }
}

export async function applySharedRedactionLicence(world) {
  const deadline = Date.now() + MAX_WAIT

  while (!cached) {
    cached = await readCache()
    if (cached) break

    if (await acquireLock()) {
      try {
        const fixture = await createFixture(world)
        cached = structuredClone(fixture)
        await writeCache(fixture)
        break
      } finally {
        await releaseLock()
      }
    }

    if (Date.now() > deadline) {
      throw new Error(
        `Timed out after ${MAX_WAIT / 1000}s waiting for another worker to prepare the redaction fixture (${CACHE_FILE})`
      )
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
  }

  world.data = structuredClone(cached.data)
  world.applicantState = cached.applicantState
  world.keepTestUser = true

  const browser = world.browserContext.browser()
  await world.page.close()
  await world.browserContext.close()
  world.browserContext = await browser.newContext({
    viewport: { width: 1440, height: 1400 },
    storageState: cached.entraState
  })
  world.page = await world.browserContext.newPage()
  world.page.setDefaultTimeout(30_000)

  return world.data
}

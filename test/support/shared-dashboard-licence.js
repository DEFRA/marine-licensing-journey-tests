import { mkdir, readFile, rename, rm, stat, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { completeManualCircleApp, submitMarineLicence } from './lcml-helpers.js'
import { registerTestUser } from './auth.js'
import { getConfig } from './config.js'

// Every worker used to submit its own application, six of them at once in the
// pipeline, each contending with the others for the app. The scenarios only
// read the dashboard, so one submission serves the whole run. The key is the
// coordinator's pid, which every worker in a run shares.
const CACHE_FILE = path.join(
  tmpdir(),
  `shared-dashboard-licence-${process.ppid}.json`
)
const LOCK_DIR = `${CACHE_FILE}.lock`
const POLL_INTERVAL = 1_000
const MAX_AGE = 1_800_000
const MAX_WAIT = 600_000

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

// The organisation name is fixed rather than left to faker: the dashboard
// caption is asserted against it, and faker company names carry apostrophes and
// ampersands.
const FIXTURE_ORGANISATION = 'Windfarm Co'

async function createFixture(world) {
  world.testUser = await registerTestUser(getConfig().defraIdUrl, {
    userType: 'employee',
    organisationName: FIXTURE_ORGANISATION
  })
  await completeManualCircleApp(world)
  await submitMarineLicence(world)

  return {
    data: world.data,
    testUser: world.testUser,
    storageState: await world.browserContext.storageState()
  }
}

async function reseedContext(world, storageState) {
  const browser = world.browserContext.browser()
  const viewport = world.page.viewportSize()

  await world.page.close()
  await world.browserContext.close()

  world.browserContext = await browser.newContext({ storageState, viewport })
  world.page = await world.browserContext.newPage()
  world.page.setDefaultTimeout(30_000)
}

export async function applySharedDashboardLicence(world) {
  const deadline = Date.now() + MAX_WAIT

  while (!cached) {
    cached = await readCache()
    if (cached) break

    if (await acquireLock()) {
      try {
        const fixture = await createFixture(world)
        cached = structuredClone(fixture)
        await writeCache(fixture)
        world.keepTestUser = true
        return world.data
      } finally {
        await releaseLock()
      }
    }

    if (Date.now() > deadline) {
      throw new Error(
        `Timed out after ${MAX_WAIT / 1000}s waiting for another worker to submit the shared dashboard licence (${CACHE_FILE})`
      )
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
  }

  world.data = structuredClone(cached.data)
  world.testUser = structuredClone(cached.testUser)
  world.keepTestUser = true
  await reseedContext(world, cached.storageState)
  return world.data
}

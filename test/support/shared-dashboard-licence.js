import { mkdir, readFile, rename, rm, stat, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { completeManualCircleApp, submitMarineLicence } from './lcml-helpers.js'

const SHARED_ACROSS_WORKERS = process.env.CUCUMBER_PARALLEL === 'true'
const CACHE_FILE = path.join(
  tmpdir(),
  `shared-dashboard-licence-${process.ppid}.json`
)
const LOCK_DIR = `${CACHE_FILE}.lock`
const POLL_INTERVAL = 5_000
const MAX_AGE = 1_800_000
const MAX_WAIT = 600_000

let cached = null

async function readCache() {
  if (!SHARED_ACROSS_WORKERS) return null
  try {
    const { mtimeMs } = await stat(CACHE_FILE)
    if (Date.now() - mtimeMs > MAX_AGE) return null
    return JSON.parse(await readFile(CACHE_FILE, 'utf8'))
  } catch {
    return null
  }
}

async function writeCache(fixture) {
  if (!SHARED_ACROSS_WORKERS) return
  const partial = `${CACHE_FILE}.${process.pid}`
  await writeFile(partial, JSON.stringify(fixture))
  await rename(partial, CACHE_FILE)
}

async function acquireLock() {
  if (!SHARED_ACROSS_WORKERS) return true
  try {
    await mkdir(LOCK_DIR)
    return true
  } catch {
    return false
  }
}

async function releaseLock() {
  if (!SHARED_ACROSS_WORKERS) return
  await rm(LOCK_DIR, { recursive: true, force: true })
}

async function createFixture(world) {
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

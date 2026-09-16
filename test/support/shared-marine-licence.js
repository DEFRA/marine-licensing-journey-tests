import { mkdir, readFile, rename, rm, stat, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import {
  completeMarineAreaShapefileApp,
  submitMarineLicence
} from './lcml-helpers.js'
import { WFD_VARIATIONS } from './lcml-wfd.js'

export const SHARED_WFD_VARIATION = WFD_VARIATIONS['three-answer']

const SHARED_ACROSS_WORKERS = process.env.CUCUMBER_PARALLEL === 'true'
const CACHE_FILE = path.join(
  tmpdir(),
  `shared-marine-licence-${process.ppid}.json`
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

async function writeCache(data) {
  if (!SHARED_ACROSS_WORKERS) return
  const partial = `${CACHE_FILE}.${process.pid}`
  await writeFile(partial, JSON.stringify(data))
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

async function createSharedMarineLicence(world) {
  await completeMarineAreaShapefileApp(world, {
    wfd: SHARED_WFD_VARIATION.wfd
  })
  await submitMarineLicence(world)
  world.data.wfdVariation = SHARED_WFD_VARIATION
  return world.data
}

export async function applySharedMarineLicence(world) {
  const deadline = Date.now() + MAX_WAIT

  while (!cached) {
    cached = await readCache()
    if (cached) break

    if (await acquireLock()) {
      try {
        cached = structuredClone(await createSharedMarineLicence(world))
        await writeCache(cached)
        return world.data
      } finally {
        await releaseLock()
      }
    }

    if (Date.now() > deadline) {
      throw new Error(
        `Timed out after ${MAX_WAIT / 1000}s waiting for another worker to submit the shared marine licence (${CACHE_FILE})`
      )
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
  }

  world.data = structuredClone(cached)
  return world.data
}

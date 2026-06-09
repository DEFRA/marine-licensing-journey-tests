import { getConfig } from './config.js'

export const IAT_START_PATH = '/journey/self-service/start'
export const IAT_BASE = '/journey/self-service'

// Retained for legacy direct-nav helpers (pre-ML-1306). Outcomes are no longer
// anonymously deep-linkable, so these are only used by scenarios that are being
// migrated to walk the journey.
export const OUTCOME_PREFIX = '/journey/self-service/outcome'

export function outcomeUrl(baseURL, route) {
  return new URL(`${OUTCOME_PREFIX}${route}`, baseURL).toString()
}

export async function navigateToOutcome(world, route) {
  const config = getConfig()
  await world.page.goto(outcomeUrl(config.baseURL, route))
  await world.page.waitForLoadState('load')
  if (world.attach) {
    world.attach(`outcome page -> ${route}`, 'text/plain')
  }
}

// ML-1306: the IAT walkthrough now lives under a per-session context slug, e.g.
//   /journey/self-service/c/{slug}/sea
//   /journey/self-service/c/{slug}/outcome/{outcomePath}
//   /journey/self-service/c/{slug}/view-answers/{outcomeTypeId}/{outcomePath}
// The slug is a 22-char base64url id minted on POST /start.
export const CONTEXT_SLUG = '[A-Za-z0-9_-]+'

function escapeForRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Regex matching a slug-prefixed IAT path. Pass the un-slugged path tail
 * (everything after `/journey/self-service/`), e.g. `outcome/exemption/x` or
 * `construction/activity`; it matches `…/c/{slug}/<tail>$`.
 */
export function iatPathRegex(tail) {
  const clean = tail.replace(/^\//, '')
  return new RegExp(
    `${escapeForRegex(IAT_BASE)}\\/c\\/${CONTEXT_SLUG}\\/${escapeForRegex(clean)}$`
  )
}

/** Regex for an outcome page: `…/c/{slug}/outcome/<route>$`. */
export function outcomeRegex(route) {
  return iatPathRegex(`outcome${route.startsWith('/') ? '' : '/'}${route}`)
}

/**
 * Regex for a path the feature expresses as a full `/journey/self-service/<x>`
 * path (e.g. the "lands on path" steps). Tolerates the inserted `/c/{slug}/`.
 */
export function landingPathRegex(fullPath) {
  const tail = fullPath.replace(
    new RegExp(`^${escapeForRegex(IAT_BASE)}\\/?`),
    ''
  )
  return iatPathRegex(tail)
}

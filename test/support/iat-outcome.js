import { getConfig } from './config.js'

export const IAT_START_PATH = '/journey/self-service/start'
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

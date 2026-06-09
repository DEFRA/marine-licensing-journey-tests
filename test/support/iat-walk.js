import { getConfig } from './config.js'
import { IAT_START_PATH } from './iat-outcome.js'

export const IAT_PATHS = {
  '/exemption/licence-not-required/sea': ['Somewhere else'],
  '/licence-not-required-devolved': ['In or over the sea', 'Other UK waters'],
  '/exemption/licence-not-required/Activity-elsewhere': [
    'In or over the sea',
    'Somewhere else in the world',
    'Other'
  ],
  '/exemption/construction-exe-not-available-continue': [
    'In or over the sea',
    'English waters or Northern Ireland offshore waters',
    'Construction',
    'Build or make something new',
    'Moorings or aids to navigation',
    'Something else'
  ],
  '/exemption/deposit-exe-not-available-continue': [
    'In or over the sea',
    'English waters or Northern Ireland offshore waters',
    'Deposit of a substance or object',
    'From a vehicle or vessel',
    'Fishing or shellfish propagation and cultivation',
    'Something else'
  ],
  '/exemption/removal-exe-not-available-continue': [
    'In or over the sea',
    'English waters or Northern Ireland offshore waters',
    'Removal of a substance or object',
    'Using a vehicle or vessel',
    'Yes',
    'Fishing or shellfish propagation and cultivation',
    'Something else'
  ],
  '/exemption/dredging-exe-not-available-continue': [
    'In or over the sea',
    'English waters or Northern Ireland offshore waters',
    'Dredging',
    'Something else'
  ],
  '/fast-track-mla': [
    'In or over the sea',
    'English waters or Northern Ireland offshore waters',
    'Deposit of a substance or object',
    'From a vehicle or vessel',
    'Fishing or shellfish propagation and cultivation',
    'Something else',
    'Check to see if the activity is suitable for self-service marine licensing',
    'Burial at Sea',
    'Yes',
    'Needles, Isle of Wight',
    'Yes'
  ],
  '/dredging/activities': [
    'In or over the sea',
    'English waters or Northern Ireland offshore waters',
    'Dredging',
    'Something else',
    'Check to see if the activity is suitable for self-service marine licensing',
    'Non-navigational clearance dredging'
  ],

  '/mod-permission': [
    'In or over the sea',
    'English waters or Northern Ireland offshore waters',
    'Dredging',
    'Something else',
    'Check to see if the activity is suitable for self-service marine licensing',
    'Non-navigational clearance dredging',
    'Non-navigational clearance dredging (for operational purposes)',
    'Yes',
    'No',
    'No',
    'Yes',
    'Yes',
    'No',
    'No'
  ]
}

/**
 * Follow one step of an IAT path. The label is either a single-select radio
 * answer or an intermediate-outcome fork option heading.
 */
export async function followIatStep(page, label) {
  const radio = page
    .locator('label.govuk-radios__label', { hasText: label })
    .first()
  if (await radio.count()) {
    await radio.click()
    await page.locator('button:has-text("Continue")').first().click()
    await page.waitForLoadState('load')
    return
  }
  const checkbox = page
    .locator('.govuk-checkboxes__item', {
      has: page.locator('label', { hasText: label })
    })
    .locator('input[type="checkbox"]')
    .first()
  if (await checkbox.count()) {
    await checkbox.check()
    await page.locator('button:has-text("Continue")').first().click()
    await page.waitForLoadState('load')
    return
  }
  const option = page
    .locator('.app-iat-option', {
      has: page.locator('h2', { hasText: label })
    })
    .first()
  if (await option.count()) {
    await option
      .locator('button:has-text("Continue"), a:has-text("Continue")')
      .first()
      .click()
    await page.waitForLoadState('load')
    return
  }
  throw new Error(`IAT path step not found on page: "${label}"`)
}

export async function startIat(world) {
  const config = getConfig()
  await world.page.goto(new URL(IAT_START_PATH, config.baseURL).toString())
  await world.page.waitForLoadState('load')
  await world.page
    .locator(
      'a.govuk-button:has-text("Start now"), button:has-text("Start now")'
    )
    .click()
  await world.page.waitForLoadState('load')
}

export async function walkIatPath(world, labels) {
  await startIat(world)
  for (const label of labels) {
    await followIatStep(world.page, label)
  }
}

export async function walkToRoute(world, route) {
  const labels = IAT_PATHS[route]
  if (!labels) {
    throw new Error(`No known IAT answer path for route "${route}"`)
  }
  await walkIatPath(world, labels)
  if (world.attach) {
    world.attach(`walked IAT to -> ${route}`, 'text/plain')
  }
}

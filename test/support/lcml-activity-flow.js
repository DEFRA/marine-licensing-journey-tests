import {
  clickCardLinkAndAwaitNavigation,
  loginAndNavigateToUploadPage,
  uploadFileAndWaitForReviewPage
} from './lcml-helpers.js'
import {
  ACTIVITY_TYPES,
  OTHER_TEXTAREA_ID
} from '../test-data/lcml-activity.js'

async function clickReviewRowLinkAndAwaitNavigation(page, rowSelector) {
  await clickCardLinkAndAwaitNavigation(page, page.locator(`${rowSelector} a`))
}

/**
 * Drives the LCML flow up to the review site details page where the Activity
 * details card (Site 1 - Activity 1) is shown with all rows as Incomplete.
 */
export async function navigateToReviewPage(world, fileType = 'KML') {
  await loginAndNavigateToUploadPage(world, fileType)
  await uploadFileAndWaitForReviewPage(world, fileType)
}

export function activityCardSelector(siteNumber = 1, activityNumber = 1) {
  return `#activity-details-site-${siteNumber}-activity-${activityNumber}`
}

export function activityCardRow(rowTitle, siteNumber = 1, activityNumber = 1) {
  return `${activityCardSelector(siteNumber, activityNumber)} .govuk-summary-list__row:has(dt:text-is("${rowTitle}"))`
}

export async function clickAddTypeOfActivity(
  page,
  siteNumber = 1,
  activityNumber = 1
) {
  await clickReviewRowLinkAndAwaitNavigation(
    page,
    activityCardRow('Type of activity', siteNumber, activityNumber)
  )
}

export async function clickChangeTypeOfActivity(
  page,
  siteNumber = 1,
  activityNumber = 1
) {
  await clickReviewRowLinkAndAwaitNavigation(
    page,
    activityCardRow('Type of activity', siteNumber, activityNumber)
  )
}

export async function clickChangeWhatActivity(
  page,
  reviewRowTitle,
  siteNumber = 1,
  activityNumber = 1
) {
  await clickReviewRowLinkAndAwaitNavigation(
    page,
    activityCardRow(reviewRowTitle, siteNumber, activityNumber)
  )
}

/**
 * On the Type of activity page: click the top-level radio, then the sub-option
 * radio, then submit. Lands on the What activity page.
 */
export async function selectActivityTypeAndContinue(page, topLevel, subOption) {
  const config = ACTIVITY_TYPES[topLevel]
  await page.locator(`#${config.radioId}`).check()
  await page.locator(`#${subOption.radioId}`).check()
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
  await page.waitForLoadState('load')
}

/**
 * Returns ids/labels of all visible non-Other checkboxes on the What activity
 * page. The page renders different checkbox sets per sub-option, but all
 * share name="activities".
 */
export async function listActivityCheckboxes(page) {
  return page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('input[type="checkbox"][name="activities"]')
    ).map((c) => ({
      id: c.id,
      value: c.value,
      label: document.querySelector(`label[for="${c.id}"]`)?.textContent?.trim()
    }))
  })
}

export async function pickRandomNonOtherCheckbox(page) {
  const all = await listActivityCheckboxes(page)
  const candidates = all.filter((c) => c.value !== 'other')
  if (candidates.length === 0) {
    throw new Error('No non-Other checkboxes on the What activity page')
  }
  return candidates[Math.floor(Math.random() * candidates.length)]
}

export async function checkCheckboxById(page, id) {
  await page.locator(`#${id}`).check()
}

export async function fillOtherTextarea(page, text) {
  await page.locator(`#${OTHER_TEXTAREA_ID}`).fill(text)
}

export async function submitWhatActivityForm(
  page,
  { expectNavigation = true } = {}
) {
  const fromUrl = page.url()
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
  if (expectNavigation) {
    await page.waitForURL((url) => url.toString() !== fromUrl, {
      timeout: 30_000
    })
  }
  await page.waitForLoadState('load')
}

/**
 * From the Review site details page, complete the Type of activity flow for
 * Site 1 / Activity 1 by:
 *   1. Clicking the "Add" link on the Type of activity row
 *   2. Selecting a random top-level + sub-option radio and Continue
 *   3. Ticking a random non-Other checkbox and Save and continue
 * The chosen selection is stored on `world.data.activity` so downstream steps
 * (and Allure attachments) can reference it. Lands back on the Review page.
 */
export async function completeRandomActivityFromReviewPage(
  world,
  options = {}
) {
  const { pickRandomActivity } = await import('../test-data/lcml-activity.js')
  await clickAddTypeOfActivity(world.page)
  const { topLevel, subOption } = pickRandomActivity(options)
  world.data.activity = { topLevel, subOption }
  const line = `random activity -> "${topLevel}" / "${subOption.label}"`
  if (world.attach) {
    world.attach(line, 'text/plain')
  }
  await selectActivityTypeAndContinue(world.page, topLevel, subOption)
  const chosen = await pickRandomNonOtherCheckbox(world.page)
  world.data.activity.checkbox = chosen
  if (world.attach) {
    world.attach(`checkbox -> "${chosen.label}"`, 'text/plain')
  }
  await checkCheckboxById(world.page, chosen.id)
  await submitWhatActivityForm(world.page)
}

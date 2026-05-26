import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { getConfig } from './config.js'
import { registerTestUser, loginAsTestUser, acceptCookies } from './auth.js'
import {
  continueFromBeforeYouStart,
  selectProvideMethod,
  selectFileType,
  uploadFile,
  addSiteNameFromReview
} from './site-details-flow.js'
import PublicRegisterPage from '../pages/public.register.page.js'

const SAMPLE_FILES = {
  KML: 'test/resources/EXE_2025_00009-LOCATIONS.kml',
  Shapefile: 'test/resources/valid-shapefile.zip'
}

export function pickRandomFileType() {
  return faker.helpers.arrayElement(['KML', 'Shapefile'])
}

const USER_TYPE_CONFIG = {
  organisation: {
    userType: 'employee',
    confirmRadioId: '#confirmEmployee'
  },
  intermediary: {
    userType: 'agent',
    confirmRadioId: '#confirmAgent'
  },
  individual: {
    userType: 'individual',
    confirmRadioId: '#confirmIndividual'
  }
}

export async function loginAndStartApplication(world, role = 'employee') {
  const config = getConfig()
  const userConfig = USER_TYPE_CONFIG[role]

  if (!config.isRealDefraId && !world.testUser) {
    world.testUser = await registerTestUser(config.defraIdUrl, {
      userType: userConfig.userType
    })
  }

  const projectName = `${faker.location.city()} ${faker.company.buzzNoun()} - Phase ${faker.number.int({ min: 1, max: 9 })} ${faker.number.int({ min: 1000, max: 9999 })}`
  world.data = { role, projectName }

  await world.page.goto(new URL('/home', config.baseURL).toString())

  if (!config.isRealDefraId) {
    await loginAsTestUser(world.page, world.testUser)
  }

  await acceptCookies(world.page)

  // Confirm user type if on confirm page
  if (world.page.url().includes('/confirm-')) {
    await world.page.locator(userConfig.confirmRadioId).click()
    await world.page.locator('button[type="submit"]').click()
    await world.page.waitForLoadState('load')
  }

  // Click "Apply for a marine licence" on home page
  await world.page
    .getByRole('link', { name: 'Apply for a marine licence' })
    .click()
  await world.page.waitForLoadState('load')

  // Enter project name
  await world.page.locator('#projectName').fill(projectName)
  await world.page.locator('button:has-text("Save and continue")').click()
  await world.page.waitForLoadState('load')
}

export async function completeSpecialLegalPowers(page, answer) {
  await expect(page.locator('h2:has-text("Other permissions")')).toBeVisible({
    timeout: 30_000
  })

  await page.locator('a:has-text("Special legal powers")').click()
  await page.waitForLoadState('load')

  if (answer === 'Yes') {
    await page.locator('#agree').click()
    await page.locator('#details').fill(faker.lorem.sentence())
  } else {
    await page.locator('#agree-2').click()
  }

  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')

  await expect(
    page.locator('#other-permissions-task-list-1-status')
  ).toContainText('Completed', { timeout: 30_000 })
}

export async function completeOtherAuthorities(page, answer) {
  await page.locator('a:has-text("Other authorities")').click()
  await page.waitForLoadState('load')

  if (answer === 'Yes') {
    await page.getByRole('radio', { name: 'Yes' }).click()
    await page
      .getByRole('textbox', { name: 'Provide details' })
      .fill(faker.lorem.sentence())
  } else {
    await page.getByRole('radio', { name: 'No' }).click()
  }

  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')
}

export async function completePublicConsultation(page, answer = 'No') {
  await page.locator('a:has-text("Pre-application consultation")').click()
  await page.waitForLoadState('load')

  if (answer === 'Yes') {
    await page.locator('#consulted').click()
    await page.locator('#details').fill(faker.lorem.sentence())
  } else {
    await page.locator('#consulted-2').click()
  }

  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')
}

export async function completeSharingConsent(page, answer) {
  await page
    .locator('a:has-text("Sharing your project information publicly")')
    .first()
    .click()
  await page.waitForLoadState('load')

  const publicRegister = new PublicRegisterPage(page)
  const consent = answer === 'Yes'
  const reason = consent ? undefined : faker.lorem.sentence()
  await publicRegister.completeAndSave(consent, reason)
  await page.waitForLoadState('load')
}

export async function completeProjectBackground(page, text) {
  await page.locator('a:has-text("Project background")').click()
  await page.waitForLoadState('load')

  await page.locator('#projectBackground').fill(text)
  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')
}

export async function loginAndReachTaskList(world, role = 'organisation') {
  await loginAndStartApplication(world, role)
  await completeSpecialLegalPowers(world.page, 'No')
}

export async function loginAndNavigateToUploadPage(world, fileType) {
  await loginAndReachTaskList(world)
  await navigateToUploadPage(world, fileType)
}

export async function navigateToUploadPage(world, fileType) {
  await world.page.locator('a:has-text("Site details")').click()
  await world.page.waitForLoadState('load')
  await continueFromBeforeYouStart(world.page)
  await world.page.waitForLoadState('load')
  await selectProvideMethod(world.page, 'file-upload')
  await world.page.waitForLoadState('load')
  await selectFileType(world.page, fileType)
  await world.page.waitForLoadState('load')
}

export async function uploadFileAndWaitForReviewPage(world, fileType) {
  await uploadFile(world.page, SAMPLE_FILES[fileType])
  await world.page.waitForLoadState('load')
  // Spinner page redirects to review site details once upload completes
  await world.page.waitForURL(
    (url) => !url.toString().includes('upload-and-wait'),
    { timeout: 60_000 }
  )
  await world.page.waitForLoadState('load')
}

export function activityCardLocator(page, cardTitle) {
  return page.locator(
    `.govuk-summary-card:has(.govuk-summary-card__title:text("${cardTitle}"))`
  )
}

export async function expectOnReviewSiteDetailsPage(page) {
  await expect(page).toHaveURL(/review-site-details/, { timeout: 30_000 })
}

export async function uploadCoordinatesFile(world, fileType) {
  world.data.fileType = fileType
  if (world.attach) {
    world.attach(`file type -> ${fileType}`, 'text/plain')
  }
  await loginAndNavigateToUploadPage(world, fileType)
  await uploadFileAndWaitForReviewPage(world, fileType)
}

export async function uploadRandomCoordinatesFile(world) {
  await uploadCoordinatesFile(world, pickRandomFileType())
}

async function clickAddLinkInActivityCard(page, cardTitle, rowName) {
  await activityCardLocator(page, cardTitle)
    .locator(`.govuk-summary-list__row:has(dt:text-is("${rowName}"))`)
    .locator('a:text-is("Add")')
    .click()
  await page.waitForLoadState('load')
}

export async function completeActivityDescriptionForActivity(
  page,
  cardTitle,
  description = faker.lorem.sentence(8)
) {
  await clickAddLinkInActivityCard(page, cardTitle, 'Activity description')
  await page.locator('#activityDescription').fill(description)
  await page
    .locator('button[type="submit"]:has-text("Save and continue")')
    .click()
  await page.waitForLoadState('load')
}

export async function completeMaximumDurationForActivity(
  page,
  cardTitle,
  years = '1',
  months = '0'
) {
  await clickAddLinkInActivityCard(
    page,
    cardTitle,
    'Maximum duration of activity'
  )
  await page.locator('#activity-duration-years').fill(years)
  await page.locator('#activity-duration-months').fill(months)
  await page
    .locator('button[type="submit"]:has-text("Save and continue")')
    .click()
  await page.waitForLoadState('load')
}

export async function completeCompletionDateForActivity(
  page,
  cardTitle,
  answer = 'No',
  reason
) {
  await clickAddLinkInActivityCard(page, cardTitle, 'Completion date')
  if (answer === 'Yes') {
    await page.locator('#date').check()
    await page.locator('#reason').fill(reason || faker.lorem.sentence(8))
  } else {
    await page.locator('#date-2').check()
  }
  await page
    .locator('button[type="submit"]:has-text("Save and continue")')
    .click()
  await page.waitForLoadState('load')
}

export async function completeSpecificMonthsForActivity(
  page,
  cardTitle,
  answer = 'No',
  details
) {
  await clickAddLinkInActivityCard(
    page,
    cardTitle,
    'Activity limited to specific months'
  )
  if (answer === 'Yes') {
    await page.locator('#months').check()
    await page.locator('#details').fill(details || faker.lorem.sentence(8))
  } else {
    await page.locator('#months-2').check()
  }
  await page
    .locator('button[type="submit"]:has-text("Save and continue")')
    .click()
  await page.waitForLoadState('load')
}

export async function completeWorkingHoursForActivity(
  page,
  cardTitle,
  workingHours = faker.lorem.sentence(8)
) {
  await clickAddLinkInActivityCard(page, cardTitle, 'Proposed working hours')
  await page.locator('#workingHours').fill(workingHours)
  await page
    .locator('button[type="submit"]:has-text("Save and continue")')
    .click()
  await page.waitForLoadState('load')
}

export async function completeActivityDetailsFromReview(
  worldOrPage,
  cardTitle = 'Site 1 - Activity 1'
) {
  const page = worldOrPage.page || worldOrPage
  const world = worldOrPage.page ? worldOrPage : null

  const description = faker.lorem.sentence(8)
  const years = '1'
  const months = '0'
  const completionDateAnswer = 'No'
  const specificMonthsAnswer = 'No'
  const workingHoursText = faker.lorem.sentence(8)

  await completeActivityDescriptionForActivity(page, cardTitle, description)
  await completeMaximumDurationForActivity(page, cardTitle, years, months)
  await completeCompletionDateForActivity(page, cardTitle, completionDateAnswer)
  await completeSpecificMonthsForActivity(page, cardTitle, specificMonthsAnswer)
  await completeWorkingHoursForActivity(page, cardTitle, workingHoursText)

  if (world) {
    world.data.activityDetails = world.data.activityDetails || {}
    world.data.activityDetails[cardTitle] = {
      activityDescription: description,
      maxDuration: { years, months },
      completionDateAnswer,
      specificMonthsAnswer,
      workingHours: workingHoursText
    }
  }
}

const ACTIVITY_CARD_ROWS = [
  'Type of activity',
  'Activity description',
  'Maximum duration of activity',
  'Completion date',
  'Activity limited to specific months',
  'Proposed working hours'
]

export async function verifyActivityCardCompleted(
  page,
  cardTitle = 'Site 1 - Activity 1'
) {
  const card = activityCardLocator(page, cardTitle)
  await expect(card).toBeVisible({ timeout: 30_000 })
  for (const rowName of ACTIVITY_CARD_ROWS) {
    const row = card.locator(
      `.govuk-summary-list__row:has(dt:text-is("${rowName}"))`
    )
    await expect(row.locator('.govuk-summary-list__value')).not.toContainText(
      'Incomplete',
      { timeout: 30_000 }
    )
    await expect(row.locator('.govuk-summary-list__actions a')).toContainText(
      'Change',
      { timeout: 30_000 }
    )
  }
}

export async function completeSiteDetailsViaFileUpload(
  world,
  fileType = 'KML'
) {
  await navigateToUploadPage(world, fileType)
  await uploadFileAndWaitForReviewPage(world, fileType)
  // Add site name for site 1
  await addSiteNameFromReview(world.page, 1)
  // Complete a random Type of activity + What activity selection for Site 1
  // before leaving the review page (the Add link only exists here).
  const { completeRandomActivityFromReviewPage } = await import(
    './lcml-activity-flow.js'
  )
  await completeRandomActivityFromReviewPage(world)
  // Fill the activity sub-tasks for Site 1 - Activity 1 from the Review page
  await completeActivityDetailsFromReview(world, 'Site 1 - Activity 1')
  // Verify the card now shows all sub-tasks completed before leaving the page
  await verifyActivityCardCompleted(world.page, 'Site 1 - Activity 1')
  // Continue from review page → back to task list
  await world.page.locator('button:has-text("Continue")').click()
  await world.page.waitForLoadState('load')
}

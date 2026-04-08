import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { getConfig } from './config.js'
import { registerTestUser, loginAsTestUser, acceptCookies } from './auth.js'
import {
  continueFromBeforeYouStart,
  selectProvideMethod,
  selectFileType,
  uploadFile
} from './site-details-flow.js'

const SAMPLE_FILES = {
  KML: 'test/resources/EXE_2025_00009-LOCATIONS.kml',
  Shapefile: 'test/resources/valid-shapefile.zip'
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

export async function completeSiteDetailsViaFileUpload(
  world,
  fileType = 'KML'
) {
  await navigateToUploadPage(world, fileType)
  await uploadFileAndWaitForReviewPage(world, fileType)
  // Continue from review page → back to task list
  await world.page.locator('button:has-text("Continue")').click()
  await world.page.waitForLoadState('load')
}

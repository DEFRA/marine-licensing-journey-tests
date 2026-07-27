import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { getConfig } from './config.js'
import {
  registerTestUser,
  loginAsTestUser,
  acceptCookies,
  loginWithRealDefraId,
  selectOrganisationRole
} from './auth.js'
import {
  continueFromBeforeYouStart,
  selectProvideMethod,
  selectFileType,
  uploadFile,
  addSiteNameFromReview,
  enterSiteName,
  selectCoordinatesEntryMethod,
  selectCoordinateSystem,
  enterCentrePointWGS84,
  enterCentrePointOSGB36,
  enterWidth,
  enterPolygonCoordinatesWGS84,
  enterPolygonCoordinatesOSGB36
} from './site-details-flow.js'
import PublicRegisterPage from '../pages/public.register.page.js'
import WaterFrameworkDirectivePage from '../pages/water.framework.directive.page.js'

export const WFD_ASSESSMENT_FILE = 'test/resources/WFD.odt'

export const MARINE_PLAN_POLICY_RESPONSE =
  'We have considered this policy and the proposal is compatible with it.'

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

  // Real DEFRA ID (ENVIRONMENT=test): sign in via Government Gateway and select
  // the Windfarm organisation, then confirm the org role — mirrors the exemption
  // navigateAndAuthenticate flow. Stub environments just click the login link.
  if (config.isRealDefraId) {
    if (!world.isAuthenticated) {
      await loginWithRealDefraId(world.page)
      world.isAuthenticated = true
    }
    await selectOrganisationRole(world.page)
  } else {
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

export async function waitForTaskList(page) {
  await page.waitForURL(/marine-licence\/task-list/, { timeout: 30_000 })
  await page.waitForLoadState('load')
}

export async function completeSpecialLegalPowers(page, answer) {
  await waitForTaskList(page)
  await expect(page.locator('h2:has-text("Other permissions")')).toBeVisible({
    timeout: 30_000
  })

  await page.locator('a:has-text("Special legal powers")').click()
  await page.waitForLoadState('load')

  const radio =
    answer === 'Yes' ? page.locator('#agree') : page.locator('#agree-2')
  await expect(radio).toBeVisible({ timeout: 30_000 })
  await radio.check()
  if (answer === 'Yes') {
    await page.locator('#details').fill(faker.lorem.sentence())
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

export async function completeHarbourAuthority(page, answer = 'No') {
  await page.locator('a:has-text("Harbour authority")').click()
  await page.waitForLoadState('load')

  if (answer === 'Yes') {
    await page.getByRole('radio', { name: 'Yes' }).click()
    await page
      .getByRole('textbox', {
        name: 'Provide details of the harbour authority'
      })
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

export async function completePreferredDates(page) {
  await page
    .locator('a:has-text("Preferred start and end dates of the licence")')
    .click()
  await page.waitForLoadState('load')

  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth() + 3, 1)
  const endDate = new Date(now.getFullYear(), now.getMonth() + 15, 1)

  await page.locator('#start-date-month').fill(String(startDate.getMonth() + 1))
  await page.locator('#start-date-year').fill(String(startDate.getFullYear()))
  await page.locator('#end-date-month').fill(String(endDate.getMonth() + 1))
  await page.locator('#end-date-year').fill(String(endDate.getFullYear()))

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
  await waitForTaskList(page)
}

export async function completeWaterFrameworkDirective(page, answer = 'No') {
  await page
    .locator('a:has-text("Water Framework Directive assessment")')
    .click()
  await page.waitForLoadState('load')

  if (/water-framework-directive-before-you-start/.test(page.url())) {
    await page.locator('a.govuk-button:has-text("Continue")').click()
    await page.waitForLoadState('load')
  }
  await page
    .locator(answer === 'Yes' ? '#nauticalMile' : '#nauticalMile-2')
    .click()
  await page.locator('main button[type="submit"]').click()
  await page.waitForLoadState('load')
}

export async function completeFeeEstimate(page, answer = 'Yes') {
  await page.locator('a[href="/marine-licence/fee-estimate"]').click()
  await page.waitForLoadState('load')

  const terms = page.locator('#termsAndConditions')
  await expect(terms).toBeVisible({ timeout: 30_000 })
  await terms.check()
  await page.locator(answer === 'Yes' ? '#accept' : '#accept-2').check()
  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')
}

export async function openMarinePlanPolicyList(page) {
  await page.locator('a[href="/marine-licence/marine-plan-policies"]').click()
  await page.waitForLoadState('load')
}

export async function completeWaterFrameworkDirectiveUpload(
  page,
  filePath = WFD_ASSESSMENT_FILE
) {
  const wfd = new WaterFrameworkDirectivePage(page)
  await wfd.openTaskFromList()
  await wfd.continueFromBeforeYouStart()
  await wfd.answerNauticalMile('Yes')
  await wfd.answerExcludedActivities('No')
  await wfd.uploadAssessment(filePath)
  await wfd.expectOnReviewPage()
  await page
    .locator('main button[type="submit"]:not([name="analytics"])')
    .click()
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

export async function uploadFileAndWaitForReviewPage(
  world,
  fileType,
  filePath = SAMPLE_FILES[fileType]
) {
  await uploadFile(world.page, filePath)
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

export function cardTitlesInOrder(page) {
  return page
    .locator('.govuk-summary-card__title')
    .evaluateAll((titles) =>
      titles.map((t) => t.textContent.replace(/\s+/g, ' ').trim())
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

// Clicking a summary-card Add/Change/Delete link navigates to a new page. In the
// slower CDP environments the review page (with its site map) can still be
// settling when the click runs, so a bare click + waitForLoadState races the
// navigation and times out. Assert the link, scroll it into view, then wait for
// the URL to actually change.
export async function clickCardLinkAndAwaitNavigation(page, link) {
  await expect(link).toBeVisible({ timeout: 30_000 })
  await link.scrollIntoViewIfNeeded()
  const fromUrl = page.url()
  await link.click()
  await page.waitForURL((url) => url.toString() !== fromUrl, {
    timeout: 30_000
  })
  await page.waitForLoadState('load')
}

async function clickAddLinkInActivityCard(page, cardTitle, rowName) {
  await page.waitForURL(/review-site-details/, { timeout: 30_000 })
  await expect(activityCardLocator(page, cardTitle)).toBeVisible({
    timeout: 30_000
  })
  await clickCardLinkAndAwaitNavigation(
    page,
    activityCardLocator(page, cardTitle)
      .locator(`.govuk-summary-list__row:has(dt:text-is("${rowName}"))`)
      .locator('a:text-is("Add")')
  )
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

export async function navigateToManualSiteEntry(world) {
  await world.page.locator('a:has-text("Site details")').click()
  await world.page.waitForLoadState('load')
  await continueFromBeforeYouStart(world.page)
  await world.page.waitForLoadState('load')
  await selectProvideMethod(world.page, 'enter-manually')
  await world.page.waitForLoadState('load')
}

export async function enterCircleSiteDetails(world, options = {}) {
  const {
    siteName = `Barryshingles Bay ${faker.location.city()}`,
    coordinateSystem = 'WGS84',
    latitude = '50.000000',
    longitude = '-1.000000',
    eastings = '432675',
    northings = '181310',
    width = '20'
  } = options

  const page = world.page
  await enterSiteName(page, siteName)
  await page.waitForLoadState('load')
  await selectCoordinatesEntryMethod(page, 'circle')
  await page.waitForLoadState('load')
  await selectCoordinateSystem(page, coordinateSystem)
  await page.waitForLoadState('load')

  if (coordinateSystem === 'WGS84') {
    await enterCentrePointWGS84(page, latitude, longitude)
  } else {
    await enterCentrePointOSGB36(page, eastings, northings)
  }
  await page.waitForLoadState('load')
  await enterWidth(page, width)
  await page.waitForLoadState('load')

  return {
    siteType: 'circle',
    siteName,
    coordinateSystem,
    latitude,
    longitude,
    eastings,
    northings,
    width
  }
}

export async function completeManualCircleSite(world, options = {}) {
  await loginAndReachTaskList(world)
  await navigateToManualSiteEntry(world)
  world.data.site = await enterCircleSiteDetails(world, options)
  return world.data.site
}

export async function completeTwoManualCircleSites(world) {
  const first = await completeManualCircleSite(world, {
    siteName: `First Site ${faker.location.city()}`
  })

  await world.page
    .locator('button[name="add"]:has-text("Add another site")')
    .click()
  await world.page.waitForLoadState('load')

  const second = await enterCircleSiteDetails(world, {
    siteName: `Second Site ${faker.location.city()}`,
    latitude: '51.500000',
    longitude: '-2.000000',
    width: '30'
  })

  world.data.sites = [first, second]
  return world.data.sites
}

export async function submitPrimaryAndWait(page) {
  await page.locator('button[type="submit"]:not([name="analytics"])').click()
  await page.waitForLoadState('load')
}

export async function openReviewSiteDetailsFromTaskList(world) {
  // Once site details are completed the "Site details" task on the task list
  // links straight to the review page.
  await world.page.locator('a:has-text("Site details")').click()
  await world.page.waitForLoadState('load')
  await expectReviewSiteDetailsPage(world.page)
}

export async function expectReviewSiteDetailsPage(page) {
  await expect(page.locator('h1').first()).toContainText(
    'Review site details',
    {
      timeout: 30_000
    }
  )
}

export async function expectReviewSiteDetailsAnchor(page, siteNumber) {
  await expectReviewSiteDetailsPage(page)
  expect(page.url()).toContain(`#site-details-${siteNumber}`)
}

export function siteCardRow(page, key) {
  return page.locator(
    `#site-details-1 .govuk-summary-list__row:has(dt.govuk-summary-list__key:text-is("${key}"))`
  )
}

export function siteCardRowValue(page, key) {
  return siteCardRow(page, key).locator('.govuk-summary-list__value')
}

export function coordinateSystemLines(coordinateSystem) {
  if (coordinateSystem === 'OSGB36') {
    return ['OSGB36 (National Grid)', 'Eastings and Northings']
  }
  return ['WGS84 (World Geodetic System 1984)', 'Latitude and longitude']
}

export async function givenManualSite(world, siteType) {
  if (siteType === 'polygon') {
    await completeManualPolygonSite(world)
  } else {
    await completeManualCircleSite(world)
  }
  await expectReviewSiteDetailsPage(world.page)
}

const COORDINATE_SYSTEM_RADIO = {
  WGS84: '#coordinateSystem',
  OSGB36: '#coordinateSystem-2'
}

export async function expectFieldPrePopulated(page, field, site) {
  switch (field) {
    case 'Site name':
      await expect(page.locator('#siteName')).toHaveValue(site.siteName, {
        timeout: 30_000
      })
      break
    case 'Single or multiple sets of coordinates': {
      const value = site.siteType === 'polygon' ? 'multiple' : 'single'
      await expect(
        page.locator(`input[name="coordinatesEntry"][value="${value}"]`)
      ).toBeChecked({ timeout: 30_000 })
      break
    }
    case 'Coordinate system':
      await expect(
        page.locator(COORDINATE_SYSTEM_RADIO[site.coordinateSystem])
      ).toBeChecked({ timeout: 30_000 })
      break
    case 'Coordinates at centre of site':
      await expect(page.locator('#latitude')).toHaveValue(site.latitude, {
        timeout: 30_000
      })
      await expect(page.locator('#longitude')).toHaveValue(site.longitude, {
        timeout: 30_000
      })
      break
    case 'Width of circular site':
      await expect(page.locator('#width')).toHaveValue(site.width, {
        timeout: 30_000
      })
      break
    case 'Start and end points':
      await expect(page.locator('#coordinates-0-latitude')).toHaveValue(
        site.coordinates[0].latitude,
        { timeout: 30_000 }
      )
      await expect(page.locator('#coordinates-0-longitude')).toHaveValue(
        site.coordinates[0].longitude,
        { timeout: 30_000 }
      )
      break
    default:
      throw new Error(
        `No pre-population assertion defined for field "${field}"`
      )
  }
}

export async function completeManualPolygonSite(world, options = {}) {
  const {
    siteName = `Polygon Cove ${faker.location.city()}`,
    coordinateSystem = 'WGS84',
    coordinates = [
      { latitude: '50.000000', longitude: '-1.000000' },
      { latitude: '50.001000', longitude: '-0.999000' },
      { latitude: '50.000500', longitude: '-0.999500' }
    ]
  } = options

  await loginAndReachTaskList(world)
  await navigateToManualSiteEntry(world)

  const page = world.page
  await enterSiteName(page, siteName)
  await page.waitForLoadState('load')
  await selectCoordinatesEntryMethod(page, 'boundary')
  await page.waitForLoadState('load')
  await selectCoordinateSystem(page, coordinateSystem)
  await page.waitForLoadState('load')

  if (coordinateSystem === 'WGS84') {
    await enterPolygonCoordinatesWGS84(page, coordinates)
  } else {
    await enterPolygonCoordinatesOSGB36(page, coordinates)
  }
  await page.waitForLoadState('load')

  world.data.site = {
    siteType: 'polygon',
    siteName,
    coordinateSystem,
    coordinates
  }
  return world.data.site
}

export async function completeSiteDetailsViaFileUpload(
  world,
  fileType = 'KML',
  filePath = SAMPLE_FILES[fileType]
) {
  await navigateToUploadPage(world, fileType)
  await uploadFileAndWaitForReviewPage(world, fileType, filePath)

  await addSiteNameFromReview(world.page, 1)

  const { completeRandomActivityFromReviewPage } = await import(
    './lcml-activity-flow.js'
  )
  await completeRandomActivityFromReviewPage(world)

  await completeActivityDetailsFromReview(world, 'Site 1 - Activity 1')

  await verifyActivityCardCompleted(world.page, 'Site 1 - Activity 1')

  await finishSiteDetailsAndContinue(world.page)
}

async function completeNonSiteTasks(world, { wfd = 'nautical-no' } = {}) {
  await completeProjectBackground(world.page, faker.lorem.sentence(10))
  await completeSpecialLegalPowers(world.page, 'No')
  await completeOtherAuthorities(world.page, 'No')
  await completeHarbourAuthority(world.page, 'No')
  await completePublicConsultation(world.page)
  await completePreferredDates(world.page)
  await completeSharingConsent(world.page, 'No')
  if (wfd === 'upload') {
    await completeWaterFrameworkDirectiveUpload(world.page)
  } else {
    await completeWaterFrameworkDirective(world.page)
  }
  await completeFeeEstimate(world.page, 'Yes')
}

export async function finishSiteDetailsAndContinue(page, answer = 'yes') {
  const radio = page.locator(
    answer === 'no'
      ? '#finishedEnteringSiteDetails-2'
      : '#finishedEnteringSiteDetails'
  )
  if (await radio.count()) {
    await radio.check()
  }
  await page.locator('button:has-text("Continue")').click()
  await page.waitForURL(/marine-licence\/task-list/, { timeout: 60_000 })
  await page.waitForLoadState('load')
}

async function addActivityForSite1AndContinue(world) {
  const { completeRandomActivityFromReviewPage } = await import(
    './lcml-activity-flow.js'
  )
  await completeRandomActivityFromReviewPage(world)
  await completeActivityDetailsFromReview(world, 'Site 1 - Activity 1')
  await finishSiteDetailsAndContinue(world.page)
}

const POLYGON_COORDINATES = [
  { latitude: '50.100000', longitude: '-1.100000' },
  { latitude: '50.110000', longitude: '-1.090000' },
  { latitude: '50.105000', longitude: '-1.095000' },
  { latitude: '50.102000', longitude: '-1.098000' }
]

export async function completeUploadApp(world) {
  await loginAndStartApplication(world, 'organisation')
  await completeNonSiteTasks(world)
  await completeSiteDetailsViaFileUpload(world, 'KML')
  world.data.siteType = 'upload'
}

const MARINE_AREA_SHAPEFILE = 'test/resources/magic_graphics1.zip'

export async function completeMarineAreaShapefileApp(world) {
  await loginAndStartApplication(world, 'organisation')
  await completeNonSiteTasks(world)
  await completeSiteDetailsViaFileUpload(
    world,
    'Shapefile',
    MARINE_AREA_SHAPEFILE
  )
  world.data.siteType = 'upload'
}

export async function completeManualCircleApp(world, opts = {}) {
  await loginAndStartApplication(world, 'organisation')
  await completeNonSiteTasks(world, opts)
  await navigateToManualSiteEntry(world)
  world.data.site = await enterCircleSiteDetails(world, {
    siteName: `Circle Site ${faker.location.city()}`,
    coordinateSystem: 'WGS84',
    latitude: '50.123456',
    longitude: '-1.234567',
    width: '150'
  })
  world.data.siteType = 'circle'
  await addActivityForSite1AndContinue(world)
}

export async function completeManualPolygonApp(world) {
  await loginAndStartApplication(world, 'organisation')
  await completeNonSiteTasks(world)
  await navigateToManualSiteEntry(world)
  const siteName = `Polygon Site ${faker.location.city()}`
  await enterSiteName(world.page, siteName)
  await world.page.waitForLoadState('load')
  await selectCoordinatesEntryMethod(world.page, 'boundary')
  await world.page.waitForLoadState('load')
  await selectCoordinateSystem(world.page, 'WGS84')
  await world.page.waitForLoadState('load')
  await enterPolygonCoordinatesWGS84(world.page, POLYGON_COORDINATES)
  await world.page.waitForLoadState('load')
  world.data.site = {
    siteType: 'polygon',
    siteName,
    coordinateSystem: 'WGS84',
    coordinates: POLYGON_COORDINATES
  }
  world.data.siteType = 'polygon'
  await addActivityForSite1AndContinue(world)
}

const SITE_TYPE_BUILDERS = {
  upload: completeUploadApp,
  circle: completeManualCircleApp,
  polygon: completeManualPolygonApp
}

export async function completeRandomSiteTypeApp(world) {
  const siteType = faker.helpers.arrayElement(Object.keys(SITE_TYPE_BUILDERS))
  await SITE_TYPE_BUILDERS[siteType](world)
  return siteType
}

export async function completeMarinePlanPolicies(page) {
  if (/calculate-marine-plan-policies/.test(page.url())) {
    await page.waitForURL(/marine-licence\/task-list/, { timeout: 30_000 })
  }
  const taskLink = page.locator(
    'a[href="/marine-licence/marine-plan-policies"]'
  )
  if (!(await taskLink.count())) {
    return
  }
  await taskLink.first().click()
  await page.waitForURL(/marine-licence\/marine-plan-policies/, {
    timeout: 30_000
  })

  const codes = await page
    .locator('main a[href^="/marine-licence/marine-plan-policy/"]')
    .evaluateAll((links) =>
      links.map((a) => a.getAttribute('href').split('/').pop())
    )
  for (const code of codes) {
    await page
      .locator(`main a[href="/marine-licence/marine-plan-policy/${code}"]`)
      .click()
    await page.waitForURL(new RegExp(`marine-plan-policy/${code}$`), {
      timeout: 30_000
    })
    await page.locator('#policyConsideration').fill(MARINE_PLAN_POLICY_RESPONSE)
    await page.locator('button:has-text("Save and continue")').click()
    await page.waitForURL(/marine-licence\/marine-plan-policies/, {
      timeout: 30_000
    })
  }

  await page
    .locator('button:has-text("Continue"), a.govuk-button:has-text("Continue")')
    .first()
    .click()
  await page.waitForURL(/marine-licence\/task-list/, { timeout: 30_000 })
}

export const INVOICING_FIXTURE = {
  addressType: 'UK',
  addressLine1: '1 Test Street',
  town: 'London',
  postcode: 'SW1A 1AA',
  fullName: 'Invoice Contact',
  organisationName: 'Windfarm Co',
  phoneNumber: '01234567890',
  emailAddress: 'invoice@example.com',
  purchaseOrder: 'Not required'
}

export async function completeInvoicingDetails(page) {
  await page.getByRole('link', { name: 'Invoicing details' }).click()
  await page.waitForLoadState('load')

  await page
    .getByRole('radio', { name: INVOICING_FIXTURE.addressType, exact: true })
    .click()
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')

  await page.locator('#addressLine1').fill(INVOICING_FIXTURE.addressLine1)
  await page.locator('#addressTown').fill(INVOICING_FIXTURE.town)
  await page.locator('#addressPostcode').fill(INVOICING_FIXTURE.postcode)
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')

  if (await page.locator('#fullName').count()) {
    await page.locator('#fullName').fill(INVOICING_FIXTURE.fullName)
    if (await page.locator('#organisationName').count()) {
      await page
        .locator('#organisationName')
        .fill(INVOICING_FIXTURE.organisationName)
    }
    await page.locator('#phoneNumber').fill(INVOICING_FIXTURE.phoneNumber)
    await page.locator('#emailAddress').fill(INVOICING_FIXTURE.emailAddress)
    await page.locator('button:has-text("Continue")').click()
    await page.waitForLoadState('load')
  }

  if (await page.locator('input[name="requiresPurchaseOrder"]').count()) {
    await page
      .locator('input[name="requiresPurchaseOrder"][value="no"]')
      .check()
    await page.locator('button:has-text("Continue")').click()
    await page.waitForLoadState('load')
  }

  if (/check-invoicing-details/.test(page.url())) {
    await page.locator('button:has-text("Continue")').click()
    await page.waitForLoadState('load')
  }

  await page.waitForURL(/marine-licence\/task-list/, { timeout: 30_000 })
}

export async function ensureReadyForReviewAndSend(page) {
  if (await page.locator('#review-and-send').count()) {
    return
  }
  // Only the marine licence task list has an Invoicing details task that can
  // gate the button; skip elsewhere (e.g. the exemption flow).
  if (!(await page.getByRole('link', { name: 'Invoicing details' }).count())) {
    return
  }
  await completeInvoicingDetails(page)
}

export async function submitMarineLicence(world) {
  const page = world.page
  await completeMarinePlanPolicies(page)
  await ensureReadyForReviewAndSend(page)
  await page.locator('#review-and-send').click()
  await page.waitForLoadState('load')
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
  await page.locator('button:has-text("Confirm and send information")').click()
  await page.waitForLoadState('load')
  const reference = await page
    .locator('.govuk-panel__body strong')
    .textContent()
  world.data.applicationReference = reference.trim()
}

export async function openViewDetailsFromDashboard(world) {
  const page = world.page
  await page.getByRole('link', { name: 'Projects' }).click()
  await page.waitForLoadState('load')
  await page
    .locator(
      `xpath=//tr[td[1][normalize-space(text())="${world.data.projectName}"]]//a[normalize-space(text())="View details"]`
    )
    .click()
  await page.waitForLoadState('load')
}

export async function openPublicViewDetailsFromDashboard(world) {
  const page = world.page
  await page.getByRole('link', { name: 'Projects' }).click()
  await page.waitForLoadState('load')
  const href = await page
    .locator(
      `xpath=//tr[td[1][normalize-space(text())="${world.data.projectName}"]]//a[normalize-space(text())="View details"]`
    )
    .getAttribute('href')
  const marineLicenceId = href.split('/').pop()
  await page.goto(
    new URL(
      `/marine-licence/view-public-details/${marineLicenceId}`,
      getConfig().baseURL
    ).toString()
  )
  await page.waitForLoadState('load')
}

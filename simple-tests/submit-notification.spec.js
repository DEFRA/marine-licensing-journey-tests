import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'
import { ProjectNamePage } from './pages/project-name.page.js'
import { TaskListPage } from './pages/task-list.page.js'
import { BeforeYouStartSiteDetailsPage } from './pages/before-you-start-site-details.page.js'
import { HowDoYouWantToProvideCoordinatesPage } from './pages/how-do-you-want-to-provide-coordinates.page.js'
import { DoYouNeedToTellUsAboutMoreThanOneSitePage } from './pages/do-you-need-to-tell-us-about-more-than-one-site.page.js'
import { HowDoYouWantToEnterCoordinatesPage } from './pages/how-do-you-want-to-enter-coordinates.page.js'
import { WhatCoordinateSystemPage } from './pages/what-coordinate-system.page.js'
import { EnterCentrePointPage } from './pages/enter-centre-point.page.js'
import { WidthOfCircularSitePage } from './pages/width-of-circular-site.page.js'
import { ReviewSiteDetailsPage } from './pages/review-site-details.page.js'
import { ActivityDatesPage } from './pages/activity-dates.page.js'
import { ActivityDescriptionPage } from './pages/activity-description.page.js'
import { PublicRegisterPage } from './pages/public-register.page.js'
import { CheckYourAnswersPage } from './pages/check-your-answers.page.js'
import { ConfirmationPage } from './pages/confirmation.page.js'
import { DefraIdLoginPage } from './pages/defra-id-login.page.js'
import { DefraIdSelectionPage } from './pages/defra-id-selection.page.js'
import { CookieBannerPage } from './pages/cookie-banner.page.js'

// Test data - using defaults from SiteDetailsFactory.DEFAULT_COORDINATES
const DEFAULT_COORDINATES = {
  latitude: 51.507412,
  longitude: -0.127812,
  width: 20
}

const BASE_URL =
  process.env.BASE_URL || 'http://marine-licensing-frontend.local:3000'
const DEFRA_ID_URL = process.env.DEFRA_ID_URL || 'http://localhost:3200'
const ENVIRONMENT = process.env.ENVIRONMENT || 'local'

// Helper function to register test user with DEFRA ID stub
async function registerTestUser(scenarioName) {
  const userId = uuidv4()
  const userData = {
    userId,
    email: `${userId}@example.com`,
    firstName: 'Test',
    lastName: 'User',
    loa: '1',
    aal: '1',
    enrolmentCount: 1,
    enrolmentRequestCount: 1,
    relationships: [
      {
        organisationName: 'Test Organisation',
        relationshipRole: 'Employee',
        roleName: 'Test role',
        roleStatus: '1'
      }
    ]
  }

  const response = await fetch(
    `${DEFRA_ID_URL}/cdp-defra-id-stub/API/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to register test user: ${response.status} ${response.statusText}`
    )
  }

  return userData
}

// Helper function to authenticate user
async function authenticate(page) {
  // Navigate to app - will redirect to DEFRA ID
  await page.goto(BASE_URL)

  if (ENVIRONMENT === 'test') {
    // Real DEFRA ID authentication
    // Select Government Gateway authentication
    await DefraIdSelectionPage.selectGovernmentGateway(page)
    await DefraIdSelectionPage.clickContinue(page)

    // Enter credentials from environment variables
    const username = process.env.DEFRA_ID_USER_ID
    const password = process.env.DEFRA_ID_USER_PASSWORD

    if (!username || !password) {
      throw new Error(
        'DEFRA_ID_USER_ID and DEFRA_ID_USER_PASSWORD environment variables are required for test environment'
      )
    }

    await DefraIdLoginPage.enterCredentials(page, username, password)
    await DefraIdLoginPage.clickSignIn(page)
  } else {
    // DEFRA ID stub authentication
    // Register test user
    const testUser = await registerTestUser('submit-notification')

    // Wait for DEFRA ID stub page to load and click login link
    // Refresh page every second until login link appears
    const loginLinkLocator = page.locator(
      DefraIdLoginPage.loginLinkForUser(testUser.email)
    )
    const startTime = Date.now()
    const timeout = 30000

    while (Date.now() - startTime < timeout) {
      try {
        await loginLinkLocator.waitFor({ timeout: 1000, state: 'visible' })
        break // Found the locator, exit loop
      } catch (error) {
        // Locator not found yet, refresh and try again
        await page.reload()
        // Wait 1 second before next check
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    // Final check - if still not found, this will throw with a clear error
    await loginLinkLocator.waitFor({ timeout: 1000 })
    await DefraIdLoginPage.clickLoginLinkForUser(page, testUser.email)
  }

  // Handle cookie banner after authentication
  await CookieBannerPage.acceptAnalytics(page)

  // Wait for navigation back to app
  await page.waitForURL(BASE_URL + '/home', { timeout: 10000 })
}

test.describe('Submit exemption notification', () => {
  test('After successfully completing all the tasks on the task list, the user is able to submit their notification', async ({
    page
  }) => {
    // Authenticate user (handles DEFRA ID login and cookie banner)
    await authenticate(page)

    // Complete project name
    await ProjectNamePage.navigateTo(
      page,
      BASE_URL +
        '/?ACTIVITY_TYPE=SCUTTLING&ARTICLE=13&pdfDownloadUrl=https%3A%2F%2Fmarinelicensing.marinemanagement.org.uk%2Fpath%2Fjourney%2Fself-service%2Foutcome-document%2F97c39c8d-5c21-4288-9332-8731d868dc88'
    )
    await ProjectNamePage.enterProjectName(page, 'Test Project')
    await ProjectNamePage.clickSaveAndContinue(page)

    // Complete site details task
    await TaskListPage.clickTask(page, 'Site details')

    // Continue from "Before you start" page
    await BeforeYouStartSiteDetailsPage.clickContinue(page)

    // Select manual entry
    await HowDoYouWantToProvideCoordinatesPage.selectEnterCoordinates(page)
    await HowDoYouWantToProvideCoordinatesPage.clickSaveAndContinue(page)

    // Select "No" for multiple sites
    await DoYouNeedToTellUsAboutMoreThanOneSitePage.selectNo(page)
    await DoYouNeedToTellUsAboutMoreThanOneSitePage.clickSaveAndContinue(page)

    // Enter activity dates
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    await ActivityDatesPage.enterDates(
      page,
      {
        day: tomorrow.getDate(),
        month: tomorrow.getMonth() + 1,
        year: tomorrow.getFullYear()
      },
      {
        day: nextWeek.getDate(),
        month: nextWeek.getMonth() + 1,
        year: nextWeek.getFullYear()
      }
    )
    await ActivityDatesPage.clickSaveAndContinue(page)

    // Enter activity description
    await ActivityDescriptionPage.enterDescription(
      page,
      'Test activity description'
    )
    await ActivityDescriptionPage.clickSaveAndContinue(page)

    // Select circle
    await HowDoYouWantToEnterCoordinatesPage.selectCircle(page)
    await HowDoYouWantToEnterCoordinatesPage.clickSaveAndContinue(page)

    // Select WGS84 coordinate system
    await WhatCoordinateSystemPage.selectWGS84(page)
    await WhatCoordinateSystemPage.clickSaveAndContinue(page)

    // Enter centre point coordinates
    await EnterCentrePointPage.enterCoordinates(
      page,
      DEFAULT_COORDINATES.latitude,
      DEFAULT_COORDINATES.longitude
    )
    await EnterCentrePointPage.clickSaveAndContinue(page)

    // Enter width
    await WidthOfCircularSitePage.enterWidth(page, DEFAULT_COORDINATES.width)
    await WidthOfCircularSitePage.clickSaveAndContinue(page)

    // Review and save site details
    await ReviewSiteDetailsPage.clickSaveAndContinue(page)

    // Complete public register task
    await TaskListPage.clickTask(
      page,
      'Sharing your project information publicly'
    )
    await PublicRegisterPage.selectYes(page)
    await PublicRegisterPage.clickSaveAndContinue(page)

    // Navigate to Check Your Answers page
    await TaskListPage.clickReviewAndSend(page)

    // Verify we're on Check Your Answers page
    await expect(page).toHaveURL(/.*\/exemption\/check-your-answers/)

    // Check declaration and submit
    await CheckYourAnswersPage.clickConfirmAndSend(page)

    // Verify confirmation page
    await ConfirmationPage.verifyApplicationReference(page)
    await ConfirmationPage.verifyFeedbackLink(page)

    // Verify panel title
    const panelTitle = page.locator(ConfirmationPage.selectors.panelTitle)
    await expect(panelTitle).toBeVisible()
  })
})

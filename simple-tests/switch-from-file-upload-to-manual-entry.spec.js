import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'
import { ProjectNamePage } from './pages/project-name.page.js'
import { TaskListPage } from './pages/task-list.page.js'
import { BeforeYouStartSiteDetailsPage } from './pages/before-you-start-site-details.page.js'
import { HowDoYouWantToProvideCoordinatesPage } from './pages/how-do-you-want-to-provide-coordinates.page.js'
import { WhichTypeOfFilePage } from './pages/which-type-of-file.page.js'
import { FileUploadPage } from './pages/file-upload.page.js'
import { HowDoYouWantToEnterCoordinatesPage } from './pages/how-do-you-want-to-enter-coordinates.page.js'
import { WhatCoordinateSystemPage } from './pages/what-coordinate-system.page.js'
import { EnterCentrePointPage } from './pages/enter-centre-point.page.js'
import { WidthOfCircularSitePage } from './pages/width-of-circular-site.page.js'
import { ReviewSiteDetailsPage } from './pages/review-site-details.page.js'
import { DefraIdLoginPage } from './pages/defra-id-login.page.js'
import { DefraIdSelectionPage } from './pages/defra-id-selection.page.js'
import { CookieBannerPage } from './pages/cookie-banner.page.js'

// Test data - using defaults from SiteDetailsFactory.DEFAULT_COORDINATES
const DEFAULT_COORDINATES = {
  latitude: 51.507412,
  longitude: -0.127812,
  width: 20
}

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
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
    const testUser = await registerTestUser(
      'switch-from-file-upload-to-manual-entry'
    )

    // Wait for DEFRA ID stub page to load and click login link
    await page.waitForSelector(
      DefraIdLoginPage.loginLinkForUser(testUser.email),
      { timeout: 10000 }
    )
    await DefraIdLoginPage.clickLoginLinkForUser(page, testUser.email)
  }

  // Handle cookie banner after authentication
  await CookieBannerPage.acceptAnalytics(page)

  // Wait for navigation back to app
  await page.waitForURL(/.*\/$/, { timeout: 10000 })
}

test.describe('Submit exemption notification', () => {
  test('Site details completion fails after switching from file upload to manual entry', async ({
    page
  }) => {
    // Authenticate user (handles DEFRA ID login and cookie banner)
    await authenticate(page)

    // Given: the user has explored file upload options during site details entry
    // Complete project name
    await ProjectNamePage.enterProjectName(page, 'Test Project')
    await ProjectNamePage.clickSaveAndContinue(page)

    // Select "Site details" task
    await TaskListPage.clickTask(page, 'Site details')

    // Continue from "Before you start" page
    await BeforeYouStartSiteDetailsPage.clickContinue(page)

    // Select file upload option
    await HowDoYouWantToProvideCoordinatesPage.selectFileUpload(page)
    await HowDoYouWantToProvideCoordinatesPage.clickSaveAndContinue(page)

    // Select KML file type
    await WhichTypeOfFilePage.selectKML(page)
    await WhichTypeOfFilePage.clickSaveAndContinue(page)

    // Click cancel link to return to task list
    await FileUploadPage.clickCancel(page)

    // When: the user completes site details using manual coordinate entry instead
    // Select "Site details" task again
    await TaskListPage.clickTask(page, 'Site details')

    // Continue from "Before you start" page
    await BeforeYouStartSiteDetailsPage.clickContinue(page)

    // Select manual entry
    await HowDoYouWantToProvideCoordinatesPage.selectEnterCoordinates(page)
    await HowDoYouWantToProvideCoordinatesPage.clickSaveAndContinue(page)

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
    // Clicking "Save and continue" should save and return to task list
    await ReviewSiteDetailsPage.clickSaveAndContinue(page)

    // Wait for navigation back to task list
    await page.waitForURL(/.*\/task-list/, { timeout: 10000 })

    // Then: the site details task should be marked as completed
    // Verify task status is "Completed" on task list
    await TaskListPage.verifyTaskStatus(page, 'Site details', 'Completed')
  })
})

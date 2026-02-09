import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

export async function registerTestUser(stubUrl) {
  const userData = createUserData()
  let lastError

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(
        `${stubUrl}/cdp-defra-id-stub/API/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        }
      )

      if (response.ok) {
        if (!global.testUsersCreated) {
          global.testUsersCreated = []
        }
        global.testUsersCreated.push(userData.userId)
        return userData
      }

      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`)
    } catch (error) {
      lastError = error
    }

    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  throw new Error(
    `Failed to register test user after 3 attempts: ${lastError.message}`
  )
}

export async function expireTestUser(stubUrl, userId) {
  try {
    await fetch(`${stubUrl}/cdp-defra-id-stub/API/register/${userId}/expire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    // Swallow cleanup errors
  }
}

export async function loginAsTestUser(page, testUser) {
  const loginLink = page.locator(`a[href*="user=${testUser.email}"]`)
  try {
    await loginLink.waitFor({ state: 'visible', timeout: 15_000 })
    await loginLink.click()
  } catch {
    // Already authenticated or not on login page — skip
  }
}

export async function loginWithRealDefraId(page) {
  const userId = process.env.DEFRA_ID_USER_ID
  const password = process.env.DEFRA_ID_USER_PASSWORD

  if (!userId || !password) {
    throw new Error(
      'DEFRA_ID_USER_ID and DEFRA_ID_USER_PASSWORD environment variables are required for real DEFRA ID authentication'
    )
  }

  // Step 1: Select Government Gateway authentication
  const govGatewayRadio = page.locator('#scp')
  try {
    await govGatewayRadio.waitFor({ state: 'visible', timeout: 15_000 })
    await govGatewayRadio.click()
    await page.locator('#continueReplacement').click()
    await page.waitForLoadState('load')
  } catch {
    // Already past the selection page — skip
  }

  // Step 2: Enter credentials on the Government Gateway login page
  const userIdField = page.locator('#user_id')
  try {
    await userIdField.waitFor({ state: 'visible', timeout: 15_000 })
    await userIdField.fill(userId)
    await page.locator('#password').fill(password)
    await page.locator('#continue').click()
    await page.waitForLoadState('load')
  } catch {
    // Already authenticated — skip
  }

  // Step 3: Select organisation relationship if prompted
  const orgName = process.env.DEFRA_ID_ORG_NAME || 'Windfarm Co'
  try {
    const orgLabel = page.locator(`label:has-text("${orgName}")`)
    await orgLabel.waitFor({ state: 'visible', timeout: 15_000 })
    await orgLabel.click()
    await page.locator('#continueReplacement').click()
    await page.waitForLoadState('load')
  } catch {
    // No relationship selection page — skip
  }

  // Wait for redirect back to the app (skip if already there)
  if (!page.url().includes('marine-licensing')) {
    await page.waitForURL(/marine-licensing/, { timeout: 30_000 })
  }
}

export async function acceptCookies(page) {
  const acceptButton = page.locator('button[name="analytics"][value="yes"]')
  try {
    await acceptButton.click({ timeout: 3000 })
  } catch {
    // Cookie banner not displayed — already accepted or not applicable
  }
}

function createUserData() {
  const userId = uuidv4()
  return {
    userId,
    email: `${userId}@example.com`,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    loa: '1',
    aal: '1',
    enrolmentCount: 1,
    enrolmentRequestCount: 1,
    relationships: [
      {
        organisationName: faker.company.name(),
        relationshipRole: 'Employee',
        roleName: 'Some role',
        roleStatus: '1'
      }
    ]
  }
}

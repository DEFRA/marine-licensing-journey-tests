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

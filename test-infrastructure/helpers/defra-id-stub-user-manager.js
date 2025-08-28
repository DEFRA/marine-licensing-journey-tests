import { faker } from '@faker-js/faker'
import { expect } from 'chai'
import { v4 as uuidv4 } from 'uuid'
import {
  attachJson,
  logOperation
} from '~/test-infrastructure/capture/index.js'

export class DefraIdStubUserManager {
  constructor(stubUrl) {
    this.stubUrl = stubUrl
    this.apiPath = '/cdp-defra-id-stub/API'
    faker.locale = 'en_GB'
  }

  createUserData() {
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

  async makeRegistrationRequest(userData) {
    return await fetch(`${this.stubUrl}${this.apiPath}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
  }

  handleSuccessfulRegistration(userData, scenarioName) {
    attachJson(
      {
        email: userData.email,
        scenario: scenarioName,
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName
      },
      'Test User Created'
    )

    if (!global.testUsersCreated) {
      global.testUsersCreated = []
    }
    global.testUsersCreated.push(userData.userId)
    return userData
  }

  handleRegistrationFailure(attempt, error) {
    logOperation(
      'User Registration',
      `Attempt ${attempt} failed: ${error.message}`,
      true
    )
  }

  async registerTestUser(scenarioName) {
    let lastError

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const userData = this.createUserData()
        const response = await this.makeRegistrationRequest(userData)

        if (response.ok) {
          return this.handleSuccessfulRegistration(userData, scenarioName)
        }

        lastError = new Error(`HTTP ${response.status}: ${response.statusText}`)
      } catch (error) {
        lastError = error
        this.handleRegistrationFailure(attempt, error)
      }

      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    expect.fail(
      `Failed to register test user after 3 attempts: ${lastError.message}`
    )
  }

  async expireTestUser(userId) {
    try {
      await fetch(`${this.stubUrl}${this.apiPath}/register/${userId}/expire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      logOperation('User Cleanup', `Successfully expired user: ${userId}`)
    } catch (error) {
      logOperation(
        'User Cleanup',
        `Failed to expire user ${userId}: ${error.message}`,
        true
      )
    }
  }
}

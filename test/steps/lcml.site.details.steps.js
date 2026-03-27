import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { getConfig } from '../support/config.js'
import {
  registerTestUser,
  loginAsTestUser,
  acceptCookies
} from '../support/auth.js'

async function loginAndReachTaskList(world) {
  const config = getConfig()

  if (!config.isRealDefraId && !world.testUser) {
    world.testUser = await registerTestUser(config.defraIdUrl, {
      userType: 'employee'
    })
  }

  const projectName = `${faker.location.city()} ${faker.company.buzzNoun()} - Phase ${faker.number.int({ min: 1, max: 9 })} ${faker.number.int({ min: 1000, max: 9999 })}`
  world.data = { projectName }

  await world.page.goto(new URL('/home', config.baseURL).toString())

  if (!config.isRealDefraId) {
    await loginAsTestUser(world.page, world.testUser)
  }

  await acceptCookies(world.page)

  // Confirm user type if on confirm page
  if (world.page.url().includes('/confirm-')) {
    await world.page.locator('#confirmEmployee').click()
    await world.page.locator('button[type="submit"]').click()
    await world.page.waitForLoadState('load')
  }

  // Click "Apply for a marine licence" on home page
  await world.page
    .getByRole('link', { name: 'Apply for a marine licence' })
    .click()
  await world.page.waitForLoadState('load')

  await world.page.locator('#projectName').fill(projectName)
  await world.page.locator('button:has-text("Save and continue")').click()
  await world.page.waitForLoadState('load')

  // Complete special legal powers if present
  const slpLink = world.page.locator('a:has-text("Special legal powers")')
  if (await slpLink.isVisible({ timeout: 3000 }).catch(() => false)) {
    await slpLink.click()
    await world.page.waitForLoadState('load')
    await world.page.locator('#agree-2').click()
    await world.page.locator('button:has-text("Save and continue")').click()
    await world.page.waitForLoadState('load')
  }
}

Given('an organisation user is on the site details page', async function () {
  await loginAndReachTaskList(this)
  await this.page.locator('a:has-text("Site details")').click()
  await this.page.waitForLoadState('load')
})

Given(
  'an organisation user is on the provide coordinates page',
  async function () {
    await loginAndReachTaskList(this)
    await this.page.locator('a:has-text("Site details")').click()
    await this.page.waitForLoadState('load')
    await this.page.locator('a.govuk-button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
  }
)

Given(
  'an organisation user is on the choose file type page',
  async function () {
    await loginAndReachTaskList(this)
    await this.page.locator('a:has-text("Site details")').click()
    await this.page.waitForLoadState('load')
    await this.page.locator('a.govuk-button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
    await this.page.locator('#coordinatesType').click()
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the site details page heading and project name are displayed',
  async function () {
    await expect(this.page.locator('h1').first()).toContainText(
      'Site details',
      { timeout: 30_000 }
    )
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
  }
)

Then(
  'the Continue, Cancel and Back links are displayed on the site details page',
  async function () {
    await expect(
      this.page.locator('a.govuk-button:has-text("Continue")')
    ).toBeVisible({ timeout: 30_000 })
    await expect(this.page.locator('a:has-text("Cancel")')).toBeVisible({
      timeout: 30_000
    })
    await expect(this.page.locator('a.govuk-back-link')).toBeVisible({
      timeout: 30_000
    })
  }
)

When('the user views the site details page', async function () {
  // No action needed — page is already loaded from Given step
})

When('the user clicks Continue without selecting an option', async function () {
  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')
})

When('the user selects {string}', async function (optionText) {
  await this.page.locator(`label:has-text("${optionText}")`).click()
})

When('the user clicks Continue', async function () {
  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')
})

Then('the error {string} is displayed', async function (errorMessage) {
  await expect(this.page.locator('.govuk-error-summary')).toContainText(
    errorMessage,
    { timeout: 30_000 }
  )
})

Then(
  'the choose file type page heading and project name are displayed',
  async function () {
    await expect(this.page.locator('h1').first()).toContainText(
      'Which type of file do you want to upload?',
      { timeout: 30_000 }
    )
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
  }
)

Then(
  'the Continue, Cancel and Back links are displayed on the choose file type page',
  async function () {
    await expect(this.page.locator('button:has-text("Continue")')).toBeVisible({
      timeout: 30_000
    })
    await expect(this.page.locator('a:has-text("Cancel")')).toBeVisible({
      timeout: 30_000
    })
    await expect(this.page.locator('a.govuk-back-link')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then('the {string} details section is displayed', async function (summaryText) {
  await expect(
    this.page.locator(`details summary:has-text("${summaryText}")`)
  ).toBeVisible({ timeout: 30_000 })
})

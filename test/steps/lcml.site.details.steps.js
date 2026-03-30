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

When(
  'the user navigates through site details to the choose file type page',
  async function () {
    // Verify site details intro page
    await expect(this.page.locator('h1').first()).toContainText(
      'Site details',
      {
        timeout: 30_000
      }
    )
    // Navigate to provide coordinates page
    await this.page.locator('a.govuk-button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
    // Select file upload and continue
    await this.page.locator('#coordinatesType').click()
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
  }
)

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

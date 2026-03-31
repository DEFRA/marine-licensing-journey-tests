import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  loginAndStartApplication,
  completeSpecialLegalPowers
} from '../support/lcml-helpers.js'

async function loginAndReachTaskList(world) {
  await loginAndStartApplication(world, 'organisation')
  await completeSpecialLegalPowers(world.page, 'No')
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

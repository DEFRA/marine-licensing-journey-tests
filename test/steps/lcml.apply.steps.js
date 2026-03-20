import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { getConfig } from '../support/config.js'
import {
  registerTestUser,
  loginAsTestUser,
  acceptCookies
} from '../support/auth.js'

Given('a user is ready to apply for a marine licence', async function () {
  const config = getConfig()

  // Register and login
  if (!config.isRealDefraId && !this.testUser) {
    this.testUser = await registerTestUser(config.defraIdUrl)
  }

  await this.page.goto(new URL('/home', config.baseURL).toString())

  if (!config.isRealDefraId) {
    await loginAsTestUser(this.page, this.testUser)
  }

  await acceptCookies(this.page)
})

When('the user submits a marine licence application', async function () {
  // Click "Apply for a marine licence" on home page
  await this.page
    .getByRole('link', { name: 'Apply for a marine licence' })
    .click()
  await this.page.waitForLoadState('load')

  // Enter project name
  const projectName = `${faker.location.city()} ${faker.company.buzzNoun()} - Phase ${faker.number.int({ min: 1, max: 9 })} ${faker.number.int({ min: 1000, max: 9999 })}`
  this.data = { projectName }

  await this.page.locator('#projectName').fill(projectName)
  await this.page.locator('button:has-text("Save and continue")').click()
  await this.page.waitForLoadState('load')

  // Task list → Review and send
  await this.page
    .getByRole('button', { name: 'Review and send your information' })
    .click()
  await this.page.waitForLoadState('load')

  // Check your answers → Continue
  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')

  // Declaration → Confirm and send
  await this.page
    .locator('button:has-text("Confirm and send information")')
    .click()
  await this.page.waitForLoadState('load')
})

Then(
  'the confirmation page is displayed with a marine licence reference',
  async function () {
    const panel = this.page.locator('.govuk-panel__title')
    await expect(panel).toContainText(
      'marine licence application has been sent',
      { timeout: 30_000 }
    )

    const reference = await this.page
      .locator('.govuk-panel__body strong')
      .textContent()
    expect(reference).toMatch(/^MLA\/\d{4}\/\d+$/)

    this.data.applicationReference = reference.trim()
  }
)

Then(
  'the submitted marine licence application is displayed on the projects page',
  async function () {
    await this.page.getByRole('link', { name: 'Projects' }).click()
    await this.page.waitForLoadState('load')

    const row = this.page.locator(
      `xpath=//tr[td[contains(text(), "${this.data.projectName}")]]`
    )
    await expect(row).toBeVisible({ timeout: 30_000 })

    await expect(row.locator('td:nth-child(2)')).toContainText(
      'Marine licence application'
    )
    await expect(row.locator('td:nth-child(3)')).toContainText(
      this.data.applicationReference
    )
    await expect(row.locator('td:nth-child(4)')).toContainText('Submitted')
  }
)

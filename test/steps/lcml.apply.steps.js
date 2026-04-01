import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  loginAndStartApplication,
  completeSpecialLegalPowers
} from '../support/lcml-helpers.js'

Given(
  'an organisation user has started a marine licence application and completed special legal powers with {string}',
  async function (answer) {
    await loginAndStartApplication(this, 'organisation')
    await completeSpecialLegalPowers(this.page, answer)
  }
)

Given(
  'an intermediary user has started a marine licence application and completed special legal powers with {string}',
  async function (answer) {
    await loginAndStartApplication(this, 'intermediary')
    await completeSpecialLegalPowers(this.page, answer)
  }
)

Given(
  'an individual user has started a marine licence application',
  async function () {
    await loginAndStartApplication(this, 'individual')

    await expect(
      this.page.locator('h2:has-text("Other permissions")')
    ).not.toBeVisible()
  }
)

When(
  'the user submits the marine licence application from the task list',
  async function () {
    await this.page.locator('#review-and-send').click()
    await this.page.waitForLoadState('load')

    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')

    await this.page
      .locator('button:has-text("Confirm and send information")')
      .click()
    await this.page.waitForLoadState('load')
  }
)

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

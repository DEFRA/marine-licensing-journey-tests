import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  loginAndStartApplication,
  completeSpecialLegalPowers,
  completeOtherAuthorities,
  completeSharingConsent,
  completeSiteDetailsViaFileUpload,
  completeProjectBackground,
  pickRandomFileType
} from '../support/lcml-helpers.js'

Given(
  'an organisation user has completed all tasks with special legal powers {string}, other authorities {string} and sharing consent {string}',
  async function (slpAnswer, oaAnswer, consentAnswer) {
    await loginAndStartApplication(this, 'organisation')
    await completeProjectBackground(this.page, faker.lorem.sentence(10))
    await completeSpecialLegalPowers(this.page, slpAnswer)
    await completeOtherAuthorities(this.page, oaAnswer)
    await completeSharingConsent(this.page, consentAnswer)
    await completeSiteDetailsViaFileUpload(this, pickRandomFileType())
  }
)

Given(
  'an intermediary user has completed all tasks with special legal powers {string}, other authorities {string} and sharing consent {string}',
  async function (slpAnswer, oaAnswer, consentAnswer) {
    await loginAndStartApplication(this, 'intermediary')
    await completeSiteDetailsViaFileUpload(this, pickRandomFileType())
    await completeProjectBackground(this.page, faker.lorem.sentence(10))
    await completeSpecialLegalPowers(this.page, slpAnswer)
    await completeOtherAuthorities(this.page, oaAnswer)
    await completeSharingConsent(this.page, consentAnswer)
  }
)

Given(
  'an individual user has completed all tasks with other authorities {string} and sharing consent {string}',
  async function (oaAnswer, consentAnswer) {
    await loginAndStartApplication(this, 'individual')
    await completeSiteDetailsViaFileUpload(this, pickRandomFileType())
    await completeProjectBackground(this.page, faker.lorem.sentence(10))
    await completeOtherAuthorities(this.page, oaAnswer)
    await completeSharingConsent(this.page, consentAnswer)
  }
)

Then(
  'the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved',
  function () {
    const cardTitle = 'Site 1 - Activity 1'
    const activity = this.data.activity
    expect(activity).toBeTruthy()
    expect(typeof activity.topLevel).toBe('string')
    expect(activity.subOption?.label).toBeTruthy()

    const saved = this.data.activityDetails?.[cardTitle]
    expect(saved).toBeTruthy()
    expect(typeof saved.activityDescription).toBe('string')
    expect(saved.activityDescription.length).toBeGreaterThan(0)
    expect(saved.maxDuration?.years).toBeTruthy()
    expect(saved.maxDuration?.months).toBeDefined()
    expect(saved.completionDateAnswer).toMatch(/^(Yes|No)$/)
    expect(saved.specificMonthsAnswer).toMatch(/^(Yes|No)$/)
    expect(typeof saved.workingHours).toBe('string')
    expect(saved.workingHours.length).toBeGreaterThan(0)
  }
)

When(
  'the user submits the marine licence application from the task list',
  async function () {
    // Task list → Check your answers
    await this.page.locator('#review-and-send').click()
    await this.page.waitForLoadState('load')
    await expect(
      this.page.locator('#check-your-answers-heading')
    ).toContainText('Check your answers before sending your information', {
      timeout: 30_000
    })
    await expect(this.page.locator('main')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )

    // Check your answers → Declaration
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('h1')).toContainText('Declaration', {
      timeout: 30_000
    })

    // Declaration → Confirmation
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

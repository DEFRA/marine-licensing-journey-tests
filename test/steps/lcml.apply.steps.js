import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { getConfig } from '../support/config.js'
import {
  registerTestUser,
  loginAsTestUser,
  acceptCookies
} from '../support/auth.js'

const USER_TYPE_CONFIG = {
  organisation: {
    userType: 'employee',
    confirmRadioId: '#confirmEmployee'
  },
  intermediary: {
    userType: 'agent',
    confirmRadioId: '#confirmAgent'
  },
  individual: {
    userType: 'individual',
    confirmRadioId: '#confirmIndividual'
  }
}

async function confirmUserType(page, confirmRadioId) {
  const radio = page.locator(confirmRadioId)
  try {
    await radio.waitFor({ state: 'visible', timeout: 10_000 })
    await radio.click()
    await page.locator('button[type="submit"]:not([name="analytics"])').click()
    await page.waitForLoadState('load')
  } catch {
    // Not on confirm page — skip
  }
}

async function loginAndStartApplication(world, role) {
  const config = getConfig()
  const userConfig = USER_TYPE_CONFIG[role]

  if (!config.isRealDefraId && !world.testUser) {
    world.testUser = await registerTestUser(config.defraIdUrl, {
      userType: userConfig.userType
    })
  }

  const projectName = `${faker.location.city()} ${faker.company.buzzNoun()} - Phase ${faker.number.int({ min: 1, max: 9 })} ${faker.number.int({ min: 1000, max: 9999 })}`
  world.data = { role, projectName }

  await world.page.goto(new URL('/home', config.baseURL).toString())

  if (!config.isRealDefraId) {
    await loginAsTestUser(world.page, world.testUser)
  }

  await acceptCookies(world.page)
  await confirmUserType(world.page, userConfig.confirmRadioId)

  await world.page
    .getByRole('link', { name: 'Apply for a marine licence' })
    .click()
  await world.page.waitForLoadState('load')

  await world.page.locator('#projectName').fill(projectName)
  await world.page.locator('button:has-text("Save and continue")').click()
  await world.page.waitForLoadState('load')
}

Given(
  'an organisation user has started a marine licence application',
  async function () {
    await loginAndStartApplication(this, 'organisation')
  }
)

Given(
  'an intermediary user has started a marine licence application',
  async function () {
    await loginAndStartApplication(this, 'intermediary')
  }
)

Given(
  'an individual user has started a marine licence application',
  async function () {
    await loginAndStartApplication(this, 'individual')
  }
)

When('the user submits the marine licence application', async function () {
  await this.page.locator('#review-and-send').click()
  await this.page.waitForLoadState('load')

  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')

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

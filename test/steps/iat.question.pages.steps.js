import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { getConfig } from '../support/config.js'

const IAT_START_PATH = '/journey/self-service/start'

Given('a user is on an IAT question page', async function () {
  const config = getConfig()
  await this.page.goto(new URL(IAT_START_PATH, config.baseURL).toString())
  await this.page.waitForLoadState('load')
  await this.page
    .locator(
      'button:has-text("Start now"), a.govuk-button:has-text("Start now")'
    )
    .click()
  await this.page.waitForLoadState('load')
})

Given(
  'a user has answered an IAT question and is on the next page',
  async function () {
    const config = getConfig()
    await this.page.goto(new URL(IAT_START_PATH, config.baseURL).toString())
    await this.page.waitForLoadState('load')
    await this.page
      .locator(
        'button:has-text("Start now"), a.govuk-button:has-text("Start now")'
      )
      .click()
    await this.page.waitForLoadState('load')

    // Select first radio and continue
    await this.page.locator('input[type="radio"]').first().click()
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
  }
)

When('the user selects an option and clicks Continue', async function () {
  await this.page.locator('input[type="radio"]').first().click()
  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')
})

When('the user clicks the Back link', async function () {
  await this.page.locator('.govuk-back-link').click()
  await this.page.waitForLoadState('load')
})

When(
  'the user answers the first option on each question page',
  async function () {
    await this.page
      .locator(
        'button:has-text("Start now"), a.govuk-button:has-text("Start now")'
      )
      .click()
    await this.page.waitForLoadState('load')

    const questionsVisited = []
    let hasNextQuestion = true

    while (hasNextQuestion) {
      const radios = await this.page.locator('input[type="radio"]').count()
      const continueBtn = await this.page
        .locator('button:has-text("Continue")')
        .count()

      hasNextQuestion = radios > 0 && continueBtn > 0

      if (hasNextQuestion) {
        questionsVisited.push(new URL(this.page.url()).pathname)
        await this.page.locator('input[type="radio"]').first().click()
        await this.page.locator('button:has-text("Continue")').click()
        await this.page.waitForLoadState('load')
      }
    }

    this.data = { ...this.data, questionsVisited }
  }
)

Then('the user is taken to the next question page', async function () {
  await expect(this.page.locator('h1').first()).toBeVisible({
    timeout: 30_000
  })
  await expect(this.page.locator('input[type="radio"]').first()).toBeVisible({
    timeout: 30_000
  })
})

Then(
  'the previous question page is displayed with the previously selected answer',
  async function () {
    await expect(this.page.locator('h1').first()).toBeVisible({
      timeout: 30_000
    })
    const checked = this.page.locator('input[type="radio"]:checked')
    await expect(checked).toHaveCount(1, { timeout: 30_000 })
  }
)

Then('an outcome page is reached', async function () {
  const radios = await this.page.locator('input[type="radio"]').count()
  expect(radios).toBe(0)
  expect(this.data.questionsVisited.length).toBeGreaterThan(1)
})

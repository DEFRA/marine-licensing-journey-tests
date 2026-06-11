import { Given, When, Then, After } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { getConfig } from '../support/config.js'
import { IAT_START_PATH } from '../support/iat-outcome.js'

const SLUG_IN_URL = /\/journey\/self-service\/c\/([A-Za-z0-9_-]+)\//
const BASE64URL_22 = /^[A-Za-z0-9_-]{22}$/

function contextIdFromUrl(url) {
  const match = url.match(SLUG_IN_URL)
  return match ? match[1] : null
}

async function gotoStartPage(page) {
  const config = getConfig()
  await page.goto(new URL(IAT_START_PATH, config.baseURL).toString())
  await page.waitForLoadState('load')
}

async function clickStartNow(page) {
  await page
    .locator(
      'a.govuk-button:has-text("Start now"), button:has-text("Start now")'
    )
    .first()
    .click()
  await page.waitForLoadState('load')
}

async function answerAndContinue(page, label) {
  await page
    .locator(`label.govuk-radios__label:has-text("${label}")`)
    .first()
    .click()
  await page.locator('button:has-text("Continue")').first().click()
  await page.waitForLoadState('load')
}

Given(
  'the user has started an IAT journey in a browser tab',
  async function () {
    await gotoStartPage(this.page)
    await clickStartNow(this.page)
    this.firstTabContextId = contextIdFromUrl(this.page.url())
    expect(this.firstTabContextId).toMatch(BASE64URL_22)
  }
)

When('the user answers {string} in that tab', async function (answer) {
  await answerAndContinue(this.page, answer)
})

When(
  'the user starts another IAT journey in a separate browser tab',
  async function () {
    this.secondTab = await this.browserContext.newPage()
    this.secondTab.setDefaultTimeout(30_000)
    await gotoStartPage(this.secondTab)
    await clickStartNow(this.secondTab)
    this.secondTabContextId = contextIdFromUrl(this.secondTab.url())
    expect(this.secondTabContextId).toMatch(BASE64URL_22)
  }
)

Then('the two IAT journeys are given different context IDs', async function () {
  expect(this.firstTabContextId).toMatch(BASE64URL_22)
  expect(this.secondTabContextId).toMatch(BASE64URL_22)
  expect(this.secondTabContextId).not.toBe(this.firstTabContextId)
  if (this.attach) {
    this.attach(
      `tab 1 -> ${this.firstTabContextId}\ntab 2 -> ${this.secondTabContextId}`,
      'text/plain'
    )
  }
})

Then(
  'the first question in the second tab has no answer pre-selected',
  async function () {
    const checked = this.secondTab.locator('input[type="radio"]:checked')
    await expect(checked).toHaveCount(0, { timeout: 30_000 })
  }
)

When(
  'the user starts the IAT and answers these questions:',
  async function (dataTable) {
    await clickStartNow(this.page)
    this.journeyContextIds = [contextIdFromUrl(this.page.url())]
    for (const { answer } of dataTable.hashes()) {
      await answerAndContinue(this.page, answer)
      this.journeyContextIds.push(contextIdFromUrl(this.page.url()))
    }
  }
)

Then(
  'the same IAT context ID is kept on every page of the journey',
  async function () {
    const [first, ...rest] = this.journeyContextIds
    expect(first).toMatch(BASE64URL_22)
    for (const id of rest) {
      expect(id).toBe(first)
    }
    if (this.attach) {
      this.attach(
        `context IDs across journey -> ${this.journeyContextIds.join(', ')}`,
        'text/plain'
      )
    }
  }
)

Given(
  'the user has started the IAT and answered {string}',
  async function (answer) {
    await gotoStartPage(this.page)
    await clickStartNow(this.page)
    this.contextId = contextIdFromUrl(this.page.url())
    expect(this.contextId).toMatch(BASE64URL_22)
    this.firstQuestionPath = new URL(this.page.url()).pathname
    await answerAndContinue(this.page, answer)
  }
)

When(
  'the user revisits the first question using the same context ID',
  async function () {
    const config = getConfig()
    await this.page.goto(
      new URL(this.firstQuestionPath, config.baseURL).toString()
    )
    await this.page.waitForLoadState('load')
    expect(contextIdFromUrl(this.page.url())).toBe(this.contextId)
  }
)

Then('the IAT answer {string} is still selected', async function (answer) {
  const radio = this.page.locator('input[type="radio"]:checked')
  await expect(radio).toHaveCount(1, { timeout: 30_000 })
  const labelText = await this.page
    .locator(`label.govuk-radios__label:has-text("${answer}")`)
    .first()
    .getAttribute('for')
  await expect(this.page.locator(`#${labelText}`)).toBeChecked({
    timeout: 30_000
  })
})

After(async function () {
  if (this.secondTab && !this.secondTab.isClosed()) {
    await this.secondTab.close()
  }
})

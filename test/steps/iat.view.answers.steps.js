import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { outcomeRegex, iatPathRegex } from '../support/iat-outcome.js'

const FIRST_QUESTION_REGEX = /\/journey\/self-service\/c\/[^/]+\/sea$/
const ANSWER_URL_PATTERN = /\/journey\/self-service\/outcome-document\/[\w-]+$/

Then(
  'the "View answers" link is displayed beneath the main action button',
  async function () {
    const beneath = await this.page.evaluate(() => {
      const main = document.querySelector('main')
      // ML-1167: the main CTA is the handoff button (labelled with the outcome
      // heading), no longer literally "Continue" — match the primary button.
      const cta =
        main.querySelector('.app-iat-actions a.govuk-button') ||
        main.querySelector('a.govuk-button')
      const va = [...main.querySelectorAll('a')].find((a) =>
        /view answers/i.test(a.textContent)
      )
      if (!cta || !va) return false

      return !!(cta.compareDocumentPosition(va) & 4)
    })
    expect(
      beneath,
      'View answers link should appear after the main action button'
    ).toBe(true)
  }
)

When('the user opens the IAT answers page', async function () {
  const popupPromise = this.page.waitForEvent('popup')
  await this.page
    .locator('main a.govuk-link:has-text("View answers")')
    .first()
    .click()
  const answers = await popupPromise
  await answers.waitForLoadState('load')
  this.answersPage = answers
  this.answersUrl = answers.url()
})

Then(
  'the IAT answers page shows the date of check, summary and answers',
  async function () {
    const main = this.answersPage.locator('main')
    for (const section of ['Date of check', 'Summary', 'Answers']) {
      await expect(
        main.getByRole('heading', { name: section, exact: true })
      ).toBeVisible({ timeout: 30_000 })
    }

    const dateText = await main
      .locator('h2:has-text("Date of check") + p')
      .innerText()
    expect(dateText.trim()).toMatch(/\d{1,2}\s+\w+\s+\d{4}/)

    await expect(
      this.answersPage.locator('.govuk-summary-list__row').first()
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the IAT answers page lists the question {string} with answer {string}',
  async function (question, answer) {
    const row = this.answersPage.locator('.govuk-summary-list__row', {
      has: this.answersPage.locator('.govuk-summary-list__key', {
        hasText: question
      })
    })
    await expect(row.locator('.govuk-summary-list__value')).toContainText(
      answer,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the IAT answers page has a unique URL that can be reopened directly',
  async function () {
    expect(this.answersUrl).toMatch(ANSWER_URL_PATTERN)

    await this.page.goto(this.answersUrl)
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('h1').first()).toContainText(
      'Marine licence requirement check',
      { timeout: 30_000 }
    )
    await expect(
      this.page.getByRole('heading', { name: 'Answers', exact: true })
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the IAT answers page omits header navigation, the Back link and non-essential print elements',
  async function () {
    const page = this.answersPage

    await expect(
      page.locator('.govuk-header__navigation, .govuk-service-navigation__list')
    ).toHaveCount(0, { timeout: 30_000 })
    await expect(page.locator('a.govuk-back-link')).toHaveCount(0, {
      timeout: 30_000
    })

    await expect(page.locator('.print-link')).toBeVisible({ timeout: 30_000 })
    await page.emulateMedia({ media: 'print' })
    for (const selector of [
      '.govuk-footer',
      '.govuk-phase-banner',
      '.print-link',
      '.print-instructions'
    ]) {
      await expect(page.locator(selector).first()).toBeHidden({
        timeout: 30_000
      })
    }
    await page.emulateMedia({ media: 'screen' })
  }
)

When(
  'the user goes back to the first IAT question and follows this answer path:',
  async function (dataTable) {
    const onFirstQuestion = () =>
      FIRST_QUESTION_REGEX.test(new URL(this.page.url()).pathname)
    for (let i = 0; i < 10 && !onFirstQuestion(); i++) {
      const back = this.page.locator('a.govuk-back-link')
      if (!(await back.count())) break
      await back.first().click()
      await this.page.waitForLoadState('load')
    }

    for (const { answer } of dataTable.hashes()) {
      await this.page
        .locator(`label.govuk-radios__label:has-text("${answer}")`)
        .first()
        .click()
      await this.page.locator('button:has-text("Continue")').click()
      await this.page.waitForLoadState('load')
    }
  }
)

Then(
  'the IAT licence-not-required outcome page {string} is displayed with heading {string}',
  async function (route, heading) {
    await expect(this.page).toHaveURL(outcomeRegex(route), { timeout: 30_000 })
    await expect(this.page.locator('h1').first()).toContainText(heading, {
      timeout: 30_000
    })
  }
)

Then(
  'the page has a {string} link that opens in a new tab',
  async function (label) {
    const link = this.page.locator(`main a.govuk-link:has-text("${label}")`)
    await expect(link.first()).toBeVisible({ timeout: 30_000 })
    await expect(link.first()).toHaveAttribute('target', '_blank', {
      timeout: 30_000
    })
  }
)

Then('the page has a Back link', async function () {
  const back = this.page.locator('a.govuk-back-link', { hasText: 'Back' })
  await expect(back.first()).toBeVisible({ timeout: 30_000 })
  const href = await back.first().getAttribute('href')
  expect(href, 'Back link must have an href').toBeTruthy()
  expect(href).not.toBe('#')
})

Then('the Back link points to the first IAT question', async function () {
  const back = this.page.locator('a.govuk-back-link', { hasText: 'Back' })
  const href = await back.first().getAttribute('href')
  expect(href, 'Back link must have an href').toBeTruthy()
  expect(href).toMatch(iatPathRegex('sea'))
})

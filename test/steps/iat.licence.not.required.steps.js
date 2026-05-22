import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { OUTCOME_PREFIX } from '../support/iat-outcome.js'

Then(
  'the IAT licence-not-required outcome page {string} is displayed with heading {string}',
  async function (route, heading) {
    await expect(this.page).toHaveURL(
      new RegExp(
        `${OUTCOME_PREFIX.replace(/\//g, '\\/')}${route.replace(/\//g, '\\/')}$`
      ),
      { timeout: 30_000 }
    )
    await expect(this.page.locator('h1').first()).toContainText(heading, {
      timeout: 30_000
    })
  }
)

Then('the page has a placeholder {string} button', async function (label) {
  // The Download PDF action is a placeholder pending ML-1165 (print-friendly
  // answers page). It renders as an anchor with role="button" and href="#".
  const button = this.page.locator(`main a.govuk-button:has-text("${label}")`)
  await expect(button.first()).toBeVisible({ timeout: 30_000 })
  await expect(button.first()).toHaveAttribute('href', '#', {
    timeout: 30_000
  })
})

Then('the page has a Back link', async function () {
  const back = this.page.locator('a.govuk-back-link', { hasText: 'Back' })
  await expect(back.first()).toBeVisible({ timeout: 30_000 })
  const href = await back.first().getAttribute('href')
  expect(href, 'Back link must have an href').toBeTruthy()
  expect(href).not.toBe('#')
})

Then('the Back link points to {string}', async function (expectedPath) {
  const back = this.page.locator('a.govuk-back-link', { hasText: 'Back' })
  await expect(back.first()).toHaveAttribute('href', expectedPath, {
    timeout: 30_000
  })
})

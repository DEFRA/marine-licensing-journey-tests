import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { navigateToOutcome, outcomeRegex } from '../support/iat-outcome.js'

Given(
  'an anonymous user navigates directly to the IAT outcome {string}',
  async function (route) {
    // The IAT routes are configured with auth: false in the frontend, so a
    // deep-link works without any login. Asserting we did not pass through a
    // sign-in page proves the page is publicly accessible.
    await navigateToOutcome(this, route)
    await expect(this.page).not.toHaveURL(/sign-in|login|defra-id-stub/, {
      timeout: 5_000
    })
  }
)

Then(
  'the IAT terminal outcome page {string} is displayed with heading {string}',
  async function (route, heading) {
    await expect(this.page).toHaveURL(outcomeRegex(route), { timeout: 30_000 })
    await expect(this.page.locator('h1').first()).toContainText(heading, {
      timeout: 30_000
    })
  }
)

Then('the page has a body content block', async function () {
  // The terminal outcome template renders body text inside `.govuk-body`. For
  // terminal-multi each option carries its own body block.
  const bodies = this.page.locator('main .govuk-body')
  await expect(bodies.first()).toBeVisible({ timeout: 30_000 })
  const text = (await bodies.first().innerText()).trim()
  expect(text.length).toBeGreaterThan(0)
})

Then(
  'the page has an MCMS handoff button labelled {string}',
  async function (label) {
    // ML-1167: an outcome that hands off to MCMS labels its main button with
    // the outcome heading (not "Continue") and points it at the internal
    // /continue/{id}/{route} route, which 302-redirects to the MCMS service.
    const button = this.page.locator(`main a.govuk-button:has-text("${label}")`)
    await expect(button.first()).toBeVisible({ timeout: 30_000 })
    const href = await button.first().getAttribute('href')
    expect(href).toMatch(/\/continue\//)
  }
)

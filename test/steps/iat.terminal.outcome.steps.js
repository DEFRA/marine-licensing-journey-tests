import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { OUTCOME_PREFIX, navigateToOutcome } from '../support/iat-outcome.js'

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

Then('the page has a body content block', async function () {
  // The terminal outcome template renders body text inside `.govuk-body`. For
  // terminal-multi each option carries its own body block.
  const bodies = this.page.locator('main .govuk-body')
  await expect(bodies.first()).toBeVisible({ timeout: 30_000 })
  const text = (await bodies.first().innerText()).trim()
  expect(text.length).toBeGreaterThan(0)
})

Then('the page has a placeholder {string} button', async function (buttonText) {
  // Continue / Download a PDF on terminal pages are placeholders today —
  // anchor buttons with href="#" (see ML-1166 / ML-1167 / ML-1165).
  const button = this.page.locator(
    `main a.govuk-button:has-text("${buttonText}")`
  )
  await expect(button.first()).toBeVisible({ timeout: 30_000 })
  await expect(button.first()).toHaveAttribute('href', '#', {
    timeout: 30_000
  })
})

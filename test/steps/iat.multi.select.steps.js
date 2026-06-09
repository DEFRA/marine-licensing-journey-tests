import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { getConfig } from '../support/config.js'
import { iatPathRegex } from '../support/iat-outcome.js'

const QUESTION_PREFIX = '/journey/self-service'

function questionUrl(baseURL, route) {
  return new URL(`${QUESTION_PREFIX}${route}`, baseURL).toString()
}

Given(
  'an anonymous user navigates directly to the IAT question {string}',
  async function (route) {
    const config = getConfig()
    await this.page.goto(questionUrl(config.baseURL, route))
    await this.page.waitForLoadState('load')
    this.data.iatQuestionRoute = route
    if (this.attach) {
      this.attach(`question page -> ${route}`, 'text/plain')
    }
    // IAT routes are auth:false — assert we did not land on a sign-in page.
    await expect(this.page).not.toHaveURL(/sign-in|login|defra-id-stub/, {
      timeout: 5_000
    })
  }
)

When('the user views the IAT question page', async function () {
  await expect(this.page.locator('h1').first()).toBeVisible({ timeout: 30_000 })
})

When('the user selects the IAT checkbox {string}', async function (label) {
  const checkbox = this.page
    .locator('.govuk-checkboxes__item', {
      has: this.page.locator('label', { hasText: label })
    })
    .locator('input[type="checkbox"]')
  await checkbox.first().check()
  if (this.attach) {
    this.attach(`checked checkbox -> "${label}"`, 'text/plain')
  }
})

When('the user clicks the IAT Continue button', async function () {
  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')
})

When('the user clicks the IAT Back link', async function () {
  await this.page.locator('a.govuk-back-link').click()
  await this.page.waitForLoadState('load')
})

Then(
  'the IAT question page caption shows the section {string} and heading contains {string}',
  async function (sectionText, headingText) {
    await expect(this.page.locator('.govuk-caption-l').first()).toContainText(
      sectionText,
      { timeout: 30_000 }
    )
    // The legend is rendered as <h1> via isPageHeading: true. The h1 contains
    // both the caption span and the question text, so a substring match works.
    await expect(this.page.locator('h1').first()).toContainText(headingText, {
      timeout: 30_000
    })
  }
)

Then(
  'the IAT question page shows checkboxes named {string} with a Back link and a Continue button',
  async function (fieldName) {
    const checkboxes = this.page.locator(
      `input[type="checkbox"][name="${fieldName}"]`
    )
    const count = await checkboxes.count()
    expect(count).toBeGreaterThan(0)
    await expect(this.page.locator('a.govuk-back-link')).toBeVisible({
      timeout: 30_000
    })
    await expect(this.page.locator('button:has-text("Continue")')).toBeVisible({
      timeout: 30_000
    })
  }
)

Then(
  'the IAT question page has no header navigation links and any external guidance links open in a new tab',
  async function () {
    // Service-navigation list links (Home / Projects / etc.) must not be
    // rendered for the anonymous IAT.
    const headerNavLinks = this.page.locator(
      '.govuk-service-navigation__list a, .govuk-header__navigation a'
    )
    await expect(headerNavLinks).toHaveCount(0)
    // Any anchor in main content pointing at an external URL must open in a
    // new tab. (Currently the multi-select pages have no such links, so this
    // is vacuously satisfied — but it'll start asserting the property the
    // moment content authors add a guidance link to a multi-select page.)
    const externals = await this.page
      .locator('main a[href^="http"], main a[href^="https"]')
      .evaluateAll((els) =>
        els.map((a) => ({ href: a.getAttribute('href'), target: a.target }))
      )
    for (const link of externals) {
      expect(link.target).toBe('_blank')
    }
  }
)

Then(
  'the IAT question page URL has changed from {string}',
  async function (originalRoute) {
    // Anything but the original (slug-prefixed) route proves navigation away.
    await expect(this.page).not.toHaveURL(iatPathRegex(originalRoute), {
      timeout: 30_000
    })
    if (this.attach) {
      this.attach(
        `navigated to -> ${new URL(this.page.url()).pathname}`,
        'text/plain'
      )
    }
  }
)

Then(
  'no IAT checkbox is checked on the current question page',
  async function () {
    const checkedCount = await this.page
      .locator('input[type="checkbox"]:checked')
      .count()
    expect(checkedCount).toBe(0)
  }
)

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { getConfig } from '../support/config.js'

const IAT_START_PATH = '/journey/self-service/start'

const EXPECTED_LINKS = [
  {
    text: 'jurisdiction',
    href: 'https://www.gov.uk/guidance/marine-licensing-definitions#jurisdiction'
  },
  {
    text: 'exemptions',
    href: 'https://www.gov.uk/guidance/do-i-need-a-marine-licence#exemptions'
  },
  {
    text: 'self-service marine licensing',
    href: 'https://www.gov.uk/guidance/do-i-need-a-marine-licence#self-service'
  },
  {
    text: 'guidance',
    href: 'https://www.gov.uk/guidance/do-i-need-a-marine-licence'
  }
]

Given('a user navigates to the IAT start page', async function () {
  const config = getConfig()
  await this.page.goto(new URL(IAT_START_PATH, config.baseURL).toString())
  await this.page.waitForLoadState('load')
})

Given('a user is on the IAT start page', async function () {
  const config = getConfig()
  await this.page.goto(new URL(IAT_START_PATH, config.baseURL).toString())
  await this.page.waitForLoadState('load')
})

When('the user views the start page', async function () {
  // Already on start page from Given step
})

Then('the heading {string} is displayed', async function (expectedHeading) {
  await expect(this.page.locator('h1').first()).toContainText(expectedHeading, {
    timeout: 30_000
  })
})

Then(
  'the start page contains guidance links that open in a new tab',
  async function () {
    for (const link of EXPECTED_LINKS) {
      const locator = this.page.locator(`main a[href="${link.href}"]`)
      await expect(locator).toBeVisible({ timeout: 30_000 })
      await expect(locator).toHaveAttribute('target', '_blank')
    }
  }
)

Then('there are no links in the page header', async function () {
  const headerNavLinks = this.page.locator(
    '.govuk-service-navigation__list a, .govuk-header__navigation a'
  )
  await expect(headerNavLinks).toHaveCount(0)
})

Then('a {string} button is displayed', async function (buttonText) {
  await expect(
    this.page.locator(
      `button:has-text("${buttonText}"), a.govuk-button:has-text("${buttonText}")`
    )
  ).toBeVisible({ timeout: 30_000 })
})

Then('the start page does not have a Back link', async function () {
  await expect(this.page.locator('a.govuk-back-link')).toHaveCount(0)
})

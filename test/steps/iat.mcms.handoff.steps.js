import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

const MCMS_URL =
  process.env.MCMS_URL || 'https://marinelicensingtest.marinemanagement.org.uk/'
const MCMS_PATH =
  process.env.MCMS_PATH || 'mmofox5uat/fox/mmo/MMO_IAT_INTEGRATION'

When('the user follows the MCMS handoff button', async function () {
  await expect(this.page).toHaveURL(/\/outcome\//, { timeout: 30_000 })

  const button = this.page.locator('main a.govuk-button').first()
  await expect(button).toBeVisible({ timeout: 30_000 })
  const href = await button.getAttribute('href')
  expect(href, 'handoff button href').toMatch(/\/continue\//)

  // The /continue route 302-redirects to the external MCMS service — capture the
  // Location header without following it so we can assert the query string the
  // frontend built. page.request shares the browser context cookies / IAT session.
  const absolute = new URL(href, this.page.url()).toString()
  const response = await this.page.request.get(absolute, { maxRedirects: 0 })
  expect(response.status(), 'continue route should 302 to MCMS').toBe(302)

  this.mcmsHandoffUrl = response.headers().location
  expect(this.mcmsHandoffUrl, 'MCMS handoff Location header').toBeTruthy()
  if (this.attach) {
    this.attach(`MCMS handoff URL -> ${this.mcmsHandoffUrl}`, 'text/plain')
  }
})

Then(
  'the MCMS handoff URL points at the configured MCMS service',
  async function () {
    const url = new URL(this.mcmsHandoffUrl)
    const expected = new URL(MCMS_PATH, MCMS_URL)
    expect(`${url.origin}${url.pathname}`).toBe(
      `${expected.origin}${expected.pathname}`
    )
  }
)

Then(
  'the MCMS handoff URL carries the journey id and the view answers link',
  async function () {
    const params = new URL(this.mcmsHandoffUrl).searchParams
    expect(params.get('journeyId'), 'journeyId query param').toBeTruthy()
    expect(
      params.get('viewAnswersUrl'),
      'viewAnswersUrl query param'
    ).toBeTruthy()
  }
)

Then(
  'the MCMS handoff URL includes mapped answers for',
  async function (dataTable) {
    const params = new URL(this.mcmsHandoffUrl).searchParams
    for (const { mapping } of dataTable.hashes()) {
      expect(
        params.get(mapping),
        `mapped answer ${mapping} should be present and non-empty`
      ).toBeTruthy()
    }
  }
)

Then(
  'the MCMS handoff URL contains the outcome parameters',
  async function (dataTable) {
    const params = new URL(this.mcmsHandoffUrl).searchParams
    for (const { parameter, value } of dataTable.hashes()) {
      expect(params.get(parameter), `outcome param ${parameter}`).toBe(value)
    }
  }
)

Then('the MCMS handoff URL responds with status 200', async function () {
  // Live contract check: the MCMS service must accept the handoff URL the
  // frontend built from the IAT context (needs outbound access to MCMS).
  const response = await this.page.request.get(this.mcmsHandoffUrl, {
    timeout: 30_000
  })
  expect(response.status(), `GET ${this.mcmsHandoffUrl}`).toBe(200)
})

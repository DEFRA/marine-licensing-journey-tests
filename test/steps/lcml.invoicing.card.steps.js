import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  INVOICING_FIXTURE,
  cardTitlesInOrder
} from '../support/lcml-helpers.js'

const INVOICING_CARD = '#invoicing-card'
const FEE_ESTIMATE_CARD = '#fee-estimate-card'
const OTHER_PERMISSIONS_TITLE = 'Other permissions'
const INVOICING_TITLE = 'Invoicing details'
const FEE_ESTIMATE_TITLE = 'Fee estimate'
const CHECK_PATH = '/marine-licence/check-invoicing-details'
// The card on Check your answers / View details reflects the same information
// the user entered, so assert against the shared invoicing fixture.
const EXPECTED_INVOICING_VALUES = [
  INVOICING_FIXTURE.addressType,
  INVOICING_FIXTURE.addressLine1,
  INVOICING_FIXTURE.town,
  INVOICING_FIXTURE.postcode,
  INVOICING_FIXTURE.fullName,
  INVOICING_FIXTURE.organisationName,
  INVOICING_FIXTURE.phoneNumber,
  INVOICING_FIXTURE.emailAddress,
  INVOICING_FIXTURE.purchaseOrder
]

function cardActionLink(page) {
  return page.locator(`${INVOICING_CARD} .govuk-summary-card__actions a`)
}

Then(
  'the fee estimate and invoicing details cards are displayed beneath the Other permissions card',
  async function () {
    await expect(this.page.locator(FEE_ESTIMATE_CARD)).toBeVisible({
      timeout: 30_000
    })
    await expect(this.page.locator(INVOICING_CARD)).toBeVisible({
      timeout: 30_000
    })

    // Fee estimate sits directly after Other permissions, invoicing directly after that.
    const titles = await cardTitlesInOrder(this.page)
    const otherPermissionsIndex = titles.indexOf(OTHER_PERMISSIONS_TITLE)
    expect(otherPermissionsIndex).toBeGreaterThanOrEqual(0)
    expect(titles[otherPermissionsIndex + 1]).toBe(FEE_ESTIMATE_TITLE)
    expect(titles[otherPermissionsIndex + 2]).toBe(INVOICING_TITLE)
  }
)

Then(
  'the fee estimate and invoicing details cards are not displayed',
  async function () {
    await expect(this.page.locator(FEE_ESTIMATE_CARD)).toHaveCount(0)
    await expect(this.page.locator(INVOICING_CARD)).toHaveCount(0)
  }
)

Then(
  'the invoicing details card shows the invoicing details entered',
  async function () {
    const card = this.page.locator(INVOICING_CARD)
    for (const value of EXPECTED_INVOICING_VALUES) {
      await expect(card).toContainText(value, { timeout: 30_000 })
    }
  }
)

Then(
  'the invoicing details card has a Change link to the check invoicing details page',
  async function () {
    const link = cardActionLink(this.page)
    await expect(link).toContainText('Change', { timeout: 30_000 })
    // Includes the returnTo marker that routes Continue back to Check your answers.
    await expect(link).toHaveAttribute(
      'href',
      /check-invoicing-details\?from=check-your-answers/,
      { timeout: 30_000 }
    )
  }
)

Then('the invoicing details card has no Change link', async function () {
  await expect(cardActionLink(this.page)).toHaveCount(0)
})

When(
  'the user selects Change on the invoicing details card',
  async function () {
    await cardActionLink(this.page).click()
    await this.page.waitForURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
    await this.page.waitForLoadState('load')
  }
)

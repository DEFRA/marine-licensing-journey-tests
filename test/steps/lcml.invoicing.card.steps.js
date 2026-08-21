import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { fakerEN_GB as faker } from '@faker-js/faker'
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
const FEE_ESTIMATE_PATH = '/marine-licence/fee-estimate'
const INVOICING_REVIEW = '#invoicing-review'
// The card mirrors the rows on the "Check invoicing details" page, in order.
const EXPECTED_INVOICING_ROW_KEYS = [
  'Address type',
  'Address',
  'Full name',
  'Organisation name',
  'Phone number',
  'Email address',
  'Purchase order number'
]
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

// The fee estimate card's Change link is a summary-list row action, not a card action.
function feeEstimateChangeLink(page) {
  return page.locator(`${FEE_ESTIMATE_CARD} .govuk-summary-list__actions a`)
}

function invoicingCardRowKeys(page) {
  return page
    .locator(`${INVOICING_CARD} dt.govuk-summary-list__key`)
    .evaluateAll((keys) => keys.map((k) => k.textContent.trim()))
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

Then(
  'the fee estimate card has a Change link to the fee estimate page',
  async function () {
    const link = feeEstimateChangeLink(this.page)
    await expect(link).toContainText('Change', { timeout: 30_000 })
    // Includes the returnTo marker that routes Save and continue back to Check your answers.
    await expect(link).toHaveAttribute(
      'href',
      /fee-estimate\?from=check-your-answers/,
      { timeout: 30_000 }
    )
  }
)

Then('the fee estimate card has no Change link', async function () {
  await expect(feeEstimateChangeLink(this.page)).toHaveCount(0)
})

Then(
  'the invoicing details card lists the invoicing rows in the check invoicing details format',
  async function () {
    await expect(this.page.locator(INVOICING_CARD)).toBeVisible({
      timeout: 30_000
    })
    expect(await invoicingCardRowKeys(this.page)).toEqual(
      EXPECTED_INVOICING_ROW_KEYS
    )
  }
)

When('the user selects Change on the fee estimate card', async function () {
  await feeEstimateChangeLink(this.page).click()
  await this.page.waitForURL(new RegExp(FEE_ESTIMATE_PATH), { timeout: 30_000 })
  await this.page.waitForLoadState('load')
})

When('the user changes the invoice contact full name', async function () {
  const page = this.page
  await page
    .locator(`${INVOICING_REVIEW} a[href*="invoice-contact-details"]`)
    .click()
  await page.waitForURL(/invoice-contact-details/, { timeout: 30_000 })

  this.data.updatedInvoiceFullName = faker.person.fullName()
  await page.locator('#fullName').fill(this.data.updatedInvoiceFullName)
  await page.locator('button:has-text("Save and continue")').click()
  // The change flow saves and drops the user back on Check invoicing details.
  await page.waitForURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
  await page.waitForLoadState('load')
})

Then(
  'the invoicing details card shows the updated full name',
  async function () {
    await expect(this.page.locator(INVOICING_CARD)).toContainText(
      this.data.updatedInvoiceFullName,
      { timeout: 30_000 }
    )
  }
)

const FEE_ANSWER_RADIO = { Yes: '#accept', No: '#accept-2' }

const FEE_CHANGE_DESTINATIONS = {
  'check your answers': {
    url: /marine-licence\/check-your-answers/,
    heading: 'Check your answers before sending your information'
  },
  'confirm fee estimate rejection': {
    url: /fee-estimate-are-you-sure/,
    heading: 'Are you sure you do not accept the fee estimate?'
  },
  'projects dashboard': { url: /\/projects/ }
}

async function expectDestination(page, destination) {
  const { url, heading } = FEE_CHANGE_DESTINATIONS[destination]
  await expect(page).toHaveURL(url, { timeout: 30_000 })
  if (heading) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible({
      timeout: 30_000
    })
  }
}

When(
  'the user agrees to the terms and answers {string} to the fee estimate',
  async function (answer) {
    const page = this.page
    await page.locator('#termsAndConditions').check()
    await page.locator(FEE_ANSWER_RADIO[answer]).check()
    await page.locator('button:has-text("Save and continue")').click()
    await page.waitForLoadState('load')
  }
)

Then(
  'the fee estimate change lands on the {string} page',
  async function (destination) {
    await expectDestination(this.page, destination)
  }
)

Then(
  'selecting Finish leads to the {string} page',
  async function (destination) {
    // Blank in the Examples table: the accept path never offers a Finish button.
    if (!destination) {
      return
    }
    await this.page.locator('a:has-text("Finish")').click()
    await this.page.waitForLoadState('load')
    await expectDestination(this.page, destination)
  }
)

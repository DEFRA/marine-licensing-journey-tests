import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

const POSTCODE_SEARCH_PATH = '/marine-licence/invoice-address-postcode-search'

const DESTINATIONS = {
  'confirm address': /marine-licence\/confirm-address/,
  'choose your address': /marine-licence\/choose-your-address/
}

When(
  'the user selects UK and continues to the postcode search page',
  async function () {
    const page = this.page
    await page.getByRole('radio', { name: 'UK', exact: true }).click()
    await page.locator('button:has-text("Continue")').click()
    await page.waitForURL(new RegExp(POSTCODE_SEARCH_PATH), { timeout: 30_000 })
    await page.waitForLoadState('load')
  }
)

When('the user searches for the postcode {string}', async function (postcode) {
  const page = this.page
  await page.locator('#postcode').fill(postcode)
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
})

Then(
  'the postcode search moves the user to the {string} page',
  async function (destination) {
    await expect(this.page).toHaveURL(DESTINATIONS[destination], {
      timeout: 30_000
    })
  }
)

Then(
  'the postcode search error {string} is displayed',
  async function (message) {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(POSTCODE_SEARCH_PATH), {
      timeout: 30_000
    })
    await expect(page.locator('.govuk-error-summary')).toContainText(message, {
      timeout: 30_000
    })
  }
)

const UK_ADDRESS_PATH = '/marine-licence/uk-invoice-address'
const CHECK_PATH = '/marine-licence/check-invoicing-details'

const LOOKED_UP_ADDRESS = {
  postcode: 'NE4 7AR',
  addressLine1: 'ENVIRONMENT AGENCY TYNESIDE HOUSE SKINNERBURN ROAD',
  addressLine2: 'NEWCASTLE BUSINESS PARK',
  town: 'NEWCASTLE UPON TYNE',
  county: 'TYNE & WEAR'
}

async function searchPostcode(page, postcode) {
  await page.locator('#postcode').fill(postcode)
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
}

async function selectUkAndSearch(world, postcode) {
  const page = world.page
  await page.getByRole('radio', { name: 'UK', exact: true }).click()
  await page.locator('button:has-text("Continue")').click()
  await page.waitForURL(new RegExp(POSTCODE_SEARCH_PATH), { timeout: 30_000 })
  await page.waitForLoadState('load')
  await searchPostcode(page, postcode)
}

When(
  'the user picks the first address from the address picker',
  async function () {
    const page = this.page
    await page.locator('input[type="radio"]').first().check()
    await page.locator('button:has-text("Continue")').click()
    await page.waitForLoadState('load')
  }
)

When('the user selects None of these on the address picker', async function () {
  const page = this.page
  await page.getByRole('radio', { name: 'None of these' }).check()
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
})

When(
  'the user searches for a single-result postcode and confirms the address',
  async function () {
    const page = this.page
    await selectUkAndSearch(this, LOOKED_UP_ADDRESS.postcode)
    await page.waitForURL(/marine-licence\/confirm-address/, {
      timeout: 30_000
    })
    await page.locator('button:has-text("Confirm address")').click()
    await page.waitForLoadState('load')

    await page.locator('#fullName').fill('Invoice Contact')
    if (await page.locator('#organisationName').count()) {
      await page.locator('#organisationName').fill('Windfarm Co')
    }
    await page.locator('#phoneNumber').fill('01234567890')
    await page.locator('#emailAddress').fill('invoice@example.com')
    await page.locator('button:has-text("Continue")').click()
    await page.waitForLoadState('load')

    if (await page.locator('input[name="requiresPurchaseOrder"]').count()) {
      await page
        .locator('input[name="requiresPurchaseOrder"][value="no"]')
        .check()
      await page.locator('button:has-text("Continue")').click()
      await page.waitForLoadState('load')
    }
    await page.waitForURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
  }
)

Then(
  'the UK invoice address page is prefilled with the searched postcode',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(UK_ADDRESS_PATH), {
      timeout: 30_000
    })
    await expect(page.locator('#addressPostcode')).toHaveValue('NE1 1EE', {
      timeout: 30_000
    })
  }
)

Then(
  'the check invoicing details page shows the looked up address',
  async function () {
    const addressRow = this.page.locator(
      'xpath=//*[@id="invoicing-review"]//dt[normalize-space(text())="Address"]/following-sibling::dd[1]'
    )

    for (const value of [
      LOOKED_UP_ADDRESS.addressLine1,
      LOOKED_UP_ADDRESS.addressLine2,
      LOOKED_UP_ADDRESS.town,
      LOOKED_UP_ADDRESS.county,
      LOOKED_UP_ADDRESS.postcode
    ]) {
      await expect(addressRow).toContainText(value, { timeout: 30_000 })
    }
  }
)

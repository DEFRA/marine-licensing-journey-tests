import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { loginAndReachTaskList } from '../support/lcml-helpers.js'

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

const CHOOSE_ADDRESS_PATH = '/marine-licence/choose-your-address'
const CONFIRM_ADDRESS_PATH = '/marine-licence/confirm-address'
const CONTACT_PATH = '/marine-licence/invoice-contact-details'
const PURCHASE_ORDER_PATH = '/marine-licence/purchase-order-details'

const MULTI_RESULT_POSTCODE = 'NE1 1EE'

function checkPageAddressRow(page) {
  return page.locator(
    'xpath=//*[@id="invoicing-review"]//dt[normalize-space(text())="Address"]/following-sibling::dd[1]'
  )
}

function addressLines(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

async function readSummaryAddressLines(page) {
  return addressLines(await checkPageAddressRow(page).innerText())
}

async function readConfirmAddressLines(page) {
  return addressLines(await page.locator('#confirm-address').innerText())
}

async function clickAddressChangeLink(page) {
  await page
    .locator(
      'xpath=//*[@id="invoicing-review"]//dt[normalize-space(text())="Address"]/following-sibling::dd//a[normalize-space(text())="Change"]'
    )
    .click()
  await page.waitForLoadState('load')
}

function confirmAddressButton(page) {
  return page.locator('main form button.govuk-button--primary')
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

async function enterInvoiceContactAndPurchaseOrder(page) {
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
}

async function lookUpAddressAndReachCheckPage(world) {
  const page = world.page
  await selectUkAndSearch(world, LOOKED_UP_ADDRESS.postcode)
  await page.waitForURL(new RegExp(CONFIRM_ADDRESS_PATH), { timeout: 30_000 })

  world.data.confirmAddressLines = await readConfirmAddressLines(page)
  await confirmAddressButton(page).click()
  await page.waitForLoadState('load')

  await enterInvoiceContactAndPurchaseOrder(page)
  await page.waitForURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
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
    await lookUpAddressAndReachCheckPage(this)
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

When('the user selects Change for the looked up address', async function () {
  await clickAddressChangeLink(this.page)
})

When(
  'the user searches again and confirms an address from the picker',
  async function () {
    const page = this.page
    await clickAddressChangeLink(page)
    await page.waitForURL(new RegExp(POSTCODE_SEARCH_PATH), { timeout: 30_000 })

    await searchPostcode(page, MULTI_RESULT_POSTCODE)
    await page.waitForURL(new RegExp(CHOOSE_ADDRESS_PATH), { timeout: 30_000 })

    this.data.pickerHadCancel =
      (await page.locator('main a.govuk-link:has-text("Cancel")').count()) > 0

    const firstOption = page.locator('input[type="radio"]').first()
    await firstOption.check()
    // Which addresses a postcode returns differs between the stubbed and the real
    // lookup, so the chosen one is read off the picker rather than hard coded.
    this.data.chosenAddress = (
      await page
        .locator(`label[for="${await firstOption.getAttribute('id')}"]`)
        .innerText()
    ).trim()

    await page.locator('button:has-text("Continue")').click()
    await page.waitForURL(new RegExp(CONFIRM_ADDRESS_PATH), { timeout: 30_000 })

    this.data.visitedAfterConfirm = []
    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        this.data.visitedAfterConfirm.push(frame.url())
      }
    })

    await confirmAddressButton(page).click()
    await page.waitForLoadState('load')
  }
)

Then(
  'the check invoicing details page shows the looked up address in the confirm address format',
  async function () {
    const confirmLines = this.data.confirmAddressLines
    expect(confirmLines.length).toBeGreaterThan(0)

    const checkPageLines = await readSummaryAddressLines(this.page)

    expect(checkPageLines).toEqual(confirmLines)
  }
)

Then(
  'the postcode search page is displayed with no Cancel link',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(POSTCODE_SEARCH_PATH), {
      timeout: 30_000
    })
    await expect(
      page.locator('main a.govuk-link:has-text("Cancel")')
    ).toHaveCount(0)
  }
)

Then(
  'the user is returned to the check invoicing details page with the newly chosen address',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(CHECK_PATH), { timeout: 30_000 })

    const chosen = this.data.chosenAddress
    expect(chosen).toBeTruthy()

    const shown = (await readSummaryAddressLines(page)).join(', ')
    for (const part of chosen.split(',').map((value) => value.trim())) {
      expect(shown).toContain(part)
    }

    expect(this.data.pickerHadCancel).toBe(false)

    const visited = this.data.visitedAfterConfirm ?? []
    expect(visited.some((url) => url.includes(CHECK_PATH))).toBe(true)

    const detoured = visited.filter(
      (url) => url.includes(CONTACT_PATH) || url.includes(PURCHASE_ORDER_PATH)
    )
    expect(detoured).toEqual([])
  }
)

Given(
  'an organisation user has opened the check invoicing details page with a looked up address',
  { timeout: 180_000 },
  async function () {
    await loginAndReachTaskList(this, 'organisation')
    await this.page.getByRole('link', { name: 'Invoicing details' }).click()
    await this.page.waitForLoadState('load')
    await lookUpAddressAndReachCheckPage(this)
  }
)

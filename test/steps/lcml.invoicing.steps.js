import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { fakerEN_GB as faker } from '@faker-js/faker'
import { loginAndStartApplication } from '../support/lcml-helpers.js'

const TASK_LINK = 'Invoicing details'
const TASK_SECTION_ID_PREFIX = 'fee-estimate-task-list'

const IS_INVOICE_PATH = '/marine-licence/is-invoice-address-uk-or-international'
const IS_INVOICE_HEADING =
  "Is the invoice contact's address in the UK or international?"

const UK_PATH = '/marine-licence/uk-invoice-address'
const UK_HEADING = 'UK invoice address'
const UK_FIELD_IDS = [
  'addressLine1',
  'addressLine2',
  'addressTown',
  'addressCounty',
  'addressPostcode'
]

const INTL_PATH = '/marine-licence/international-invoice-address'
const INTL_HEADING = 'International invoice address'

const CONTACT_PATH = '/marine-licence/invoice-contact-details'
const CONTACT_HEADING = 'Invoice contact details'

const PO_PATH = '/marine-licence/purchase-order-details'
const PO_HEADING = 'Do you require a purchase order number on the invoice?'
const CHECK_PATH = '/marine-licence/check-invoicing-details'
const CHECK_HEADING = 'Check your invoicing details'
const PHONE_NUMBER = '0191 376 2791'
// Countries known to exist in the app's country list, so the type-ahead resolves
// to a real option — a random faker.location.country() may not match the list.
const SUPPORTED_COUNTRIES = [
  'Australia',
  'Brazil',
  'Canada',
  'France',
  'Germany',
  'India',
  'Japan',
  'Spain'
]

// The GB locale generates UK-format postcodes; the only ones the app rejects are
// BFPO ("BF" + digit), excluded by its UK_POSTCODE_PATTERN, so regenerate those.
function ukPostcode() {
  let postcode
  do {
    postcode = faker.location.zipCode()
  } while (/^BF\d/i.test(postcode))
  return postcode
}

function taskStatusLocator(page) {
  return page.locator(
    `xpath=//a[normalize-space(text())="${TASK_LINK}"]/ancestor::li//div[contains(@class,"govuk-task-list__status")]`
  )
}

async function openInvoicingFromTaskList(page) {
  await page.getByRole('link', { name: TASK_LINK }).click()
  await page.waitForLoadState('load')
}

async function chooseInvoiceType(page, option) {
  await page.getByRole('radio', { name: option, exact: true }).click()
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
}

async function submitValidUkAddress(page) {
  const values = {
    addressLine1: faker.location.streetAddress(),
    addressLine2: '',
    addressTown: faker.location.city().slice(0, 30),
    addressCounty: '',
    addressPostcode: ukPostcode()
  }
  for (const [id, value] of Object.entries(values)) {
    await page.locator(`#${id}`).fill(value)
  }
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
}

async function submitValidInternationalAddress(page) {
  const country = faker.helpers.arrayElement(SUPPORTED_COUNTRIES)
  const address = `${faker.location.streetAddress()}, ${faker.location.city()}`
  const input = page.locator('input#country')
  await input.waitFor({ state: 'visible', timeout: 30_000 })
  await input.fill(country)
  await page.getByRole('option', { name: country, exact: true }).first().click()
  await page.locator('#address').fill(address)
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
}

// Fills the contact details and records the entered values in `store` so the
// check page can later be asserted against them. The organisation name field is
// absent for individual users, so it is only filled (and stored) when present.
async function fillContactDetails(page, store) {
  const fullName = faker.person.fullName()
  await page.locator('#fullName').fill(fullName)
  store.fullName = fullName
  if (await page.locator('#organisationName').count()) {
    const organisationName = faker.company.name()
    await page.locator('#organisationName').fill(organisationName)
    store.organisationName = organisationName
  }
  await page.locator('#phoneNumber').fill(PHONE_NUMBER)
  store.phoneNumber = PHONE_NUMBER
  const emailAddress = faker.internet.email()
  await page.locator('#emailAddress').fill(emailAddress)
  store.emailAddress = emailAddress
  // "Continue" also matches the "Save and continue" button shown to individuals.
  await page.locator('button:has-text("Continue")').click()
  await page.waitForLoadState('load')
}

async function submitValidContactDetails(page) {
  await fillContactDetails(page, {})
}

// Drives an organisation user from login to the purchase order page, recording
// the entered invoicing values in world.data.invoicing for later assertions.
async function driveOrgToPurchaseOrder(world) {
  await loginAndStartApplication(world, 'organisation')
  await openInvoicingFromTaskList(world.page)
  await chooseInvoiceType(world.page, 'UK')
  await submitValidUkAddress(world.page)
  world.data.invoicing = { addressType: 'UK' }
  await fillContactDetails(world.page, world.data.invoicing)
}

// Selects "No" for the purchase order requirement, which lands on the check page.
async function confirmNoPurchaseOrder(world) {
  await world.page
    .locator('input[name="requiresPurchaseOrder"][value="no"]')
    .click()
  await world.page.locator('button:has-text("Save and continue")').click()
  await world.page.waitForLoadState('load')
  world.data.invoicing.purchaseOrder = 'Not required'
}

Given(
  'an organisation user has opened the invoicing details task',
  async function () {
    await loginAndStartApplication(this, 'organisation')
    await openInvoicingFromTaskList(this.page)
    await expect(this.page).toHaveURL(new RegExp(IS_INVOICE_PATH), {
      timeout: 30_000
    })
  }
)

Given(
  'an organisation user has opened the UK invoice address page',
  async function () {
    await loginAndStartApplication(this, 'organisation')
    await openInvoicingFromTaskList(this.page)
    await chooseInvoiceType(this.page, 'UK')
    await expect(this.page).toHaveURL(new RegExp(UK_PATH), { timeout: 30_000 })
  }
)

Given(
  'an organisation user has opened the international invoice address page',
  async function () {
    await loginAndStartApplication(this, 'organisation')
    await openInvoicingFromTaskList(this.page)
    await chooseInvoiceType(this.page, 'International')
    await expect(this.page).toHaveURL(new RegExp(INTL_PATH), {
      timeout: 30_000
    })
  }
)

Given(
  'an individual user has opened the UK invoice address page',
  async function () {
    await loginAndStartApplication(this, 'individual')
    await openInvoicingFromTaskList(this.page)
    await chooseInvoiceType(this.page, 'UK')
    await expect(this.page).toHaveURL(new RegExp(UK_PATH), { timeout: 30_000 })
  }
)

Given(
  'an organisation user has opened the invoice contact details page',
  async function () {
    await loginAndStartApplication(this, 'organisation')
    await openInvoicingFromTaskList(this.page)
    await chooseInvoiceType(this.page, 'UK')
    await submitValidUkAddress(this.page)
    await expect(this.page).toHaveURL(new RegExp(CONTACT_PATH), {
      timeout: 30_000
    })
  }
)

When('the user opens the invoicing details task', async function () {
  await openInvoicingFromTaskList(this.page)
})

When(
  'the user selects {string} as the invoice address type and continues',
  async function (option) {
    await chooseInvoiceType(this.page, option)
  }
)

When(
  'the user submits a valid UK invoice address without the optional fields',
  async function () {
    await submitValidUkAddress(this.page)
  }
)

When(
  'the user submits a valid international invoice address',
  async function () {
    await submitValidInternationalAddress(this.page)
  }
)

When('the user submits valid invoice contact details', async function () {
  await submitValidContactDetails(this.page)
})

Then(
  'the invoicing details task is shown in the {string} section with status {string}',
  async function (section, status) {
    await expect(
      this.page.locator('h2', { hasText: section }).first()
    ).toBeVisible({ timeout: 30_000 })
    await expect(this.page.getByRole('link', { name: TASK_LINK })).toBeVisible({
      timeout: 30_000
    })
    const statusEl = taskStatusLocator(this.page)
    await expect(statusEl).toHaveAttribute(
      'id',
      new RegExp(`^${TASK_SECTION_ID_PREFIX}-`)
    )
    await expect(statusEl).toContainText(status, { timeout: 30_000 })
  }
)

Then(
  'the UK or international invoice address page is shown with neither option selected',
  async function () {
    await expect(this.page).toHaveURL(new RegExp(IS_INVOICE_PATH), {
      timeout: 30_000
    })
    await expect(this.page.locator('h1')).toContainText(IS_INVOICE_HEADING, {
      timeout: 30_000
    })
    const uk = this.page.getByRole('radio', { name: 'UK', exact: true })
    const international = this.page.getByRole('radio', {
      name: 'International',
      exact: true
    })
    expect(await uk.isChecked()).toBe(false)
    expect(await international.isChecked()).toBe(false)
  }
)

Then(
  'the UK invoice address page shows the address fields with the project name caption',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(UK_PATH), { timeout: 30_000 })
    await expect(page.locator('h1')).toContainText(UK_HEADING, {
      timeout: 30_000
    })
    await expect(page.locator('.govuk-caption-l')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )
    for (const id of UK_FIELD_IDS) {
      await expect(page.locator(`#${id}`)).toBeVisible({ timeout: 30_000 })
    }
  }
)

Then(
  'no validation error is shown on the UK invoice address page',
  async function () {
    await expect(this.page.locator('.govuk-error-summary')).toHaveCount(0)
  }
)

Then(
  'the international invoice address page shows the country and address fields with the project name caption',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(INTL_PATH), { timeout: 30_000 })
    await expect(page.locator('h1')).toContainText(INTL_HEADING, {
      timeout: 30_000
    })
    await expect(page.locator('.govuk-caption-l')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )
    await expect(page.locator('input#country')).toBeVisible({ timeout: 30_000 })
    await expect(page.locator('#address')).toBeVisible({ timeout: 30_000 })
  }
)

Then('the country field can be searched by name', async function () {
  const input = this.page.locator('input#country')
  await input.fill('Aus')
  await expect(
    this.page.getByRole('option', { name: 'Australia', exact: true })
  ).toBeVisible({ timeout: 30_000 })
})

Then(
  'no validation error is shown on the international invoice address page',
  async function () {
    await expect(this.page.locator('.govuk-error-summary')).toHaveCount(0)
  }
)

Then(
  'the invoice contact details page shows the contact fields with the project name caption',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(CONTACT_PATH), { timeout: 30_000 })
    await expect(page.locator('h1')).toContainText(CONTACT_HEADING, {
      timeout: 30_000
    })
    await expect(page.locator('.govuk-caption-l')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )
    for (const id of [
      'fullName',
      'organisationName',
      'phoneNumber',
      'emailAddress'
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible({ timeout: 30_000 })
    }
    await expect(
      page.getByRole('button', { name: 'Continue', exact: true })
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the invoice contact details page hides the organisation name field and labels the button {string}',
  async function (buttonText) {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(CONTACT_PATH), { timeout: 30_000 })
    await expect(page.locator('#fullName')).toBeVisible({ timeout: 30_000 })
    await expect(page.locator('#organisationName')).toHaveCount(0)
    await expect(
      page.getByRole('button', { name: buttonText, exact: true })
    ).toBeVisible({ timeout: 30_000 })
  }
)

Given(
  'an organisation user has opened the purchase order details page',
  async function () {
    await driveOrgToPurchaseOrder(this)
    await expect(this.page).toHaveURL(new RegExp(PO_PATH), { timeout: 30_000 })
  }
)

Given(
  'an individual user has opened the invoice contact details page',
  async function () {
    await loginAndStartApplication(this, 'individual')
    await openInvoicingFromTaskList(this.page)
    await chooseInvoiceType(this.page, 'UK')
    await submitValidUkAddress(this.page)
    await expect(this.page).toHaveURL(new RegExp(CONTACT_PATH), {
      timeout: 30_000
    })
  }
)

Given(
  'an organisation user has opened the check invoicing details page',
  async function () {
    await driveOrgToPurchaseOrder(this)
    await confirmNoPurchaseOrder(this)
    await expect(this.page).toHaveURL(new RegExp(CHECK_PATH), {
      timeout: 30_000
    })
  }
)

Given(
  'an organisation user has completed the invoicing details task',
  async function () {
    await driveOrgToPurchaseOrder(this)
    await confirmNoPurchaseOrder(this)
    await expect(this.page).toHaveURL(new RegExp(CHECK_PATH), {
      timeout: 30_000
    })
    await this.page.locator('#continue').click()
    await this.page.waitForLoadState('load')
  }
)

When('the user confirms no purchase order is required', async function () {
  await confirmNoPurchaseOrder(this)
})

When(
  'the user requires a purchase order number and enters one',
  async function () {
    const purchaseOrder = `PO-${faker.string.numeric(6)}`
    await this.page
      .locator('input[name="requiresPurchaseOrder"][value="yes"]')
      .click()
    await this.page.locator('#purchaseOrderNumber').fill(purchaseOrder)
    await this.page.locator('button:has-text("Save and continue")').click()
    await this.page.waitForLoadState('load')
    this.data.invoicing.purchaseOrder = purchaseOrder
  }
)

When(
  'the user selects Continue on the check invoicing details page',
  async function () {
    await this.page.locator('#continue').click()
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the check invoicing details page shows the invoicing details entered',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
    await expect(page.locator('h1')).toContainText(CHECK_HEADING, {
      timeout: 30_000
    })
    await expect(page.locator('.govuk-caption-l')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )
    const review = page.locator('#invoicing-review')
    const {
      addressType,
      fullName,
      organisationName,
      phoneNumber,
      emailAddress
    } = this.data.invoicing
    for (const value of [
      addressType,
      fullName,
      organisationName,
      phoneNumber,
      emailAddress,
      'Not required'
    ]) {
      await expect(review).toContainText(value, { timeout: 30_000 })
    }
  }
)

Then(
  'the check invoicing details page hides the organisation name and purchase order rows',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
    const review = page.locator('#invoicing-review')
    await expect(review).toContainText('Full name', { timeout: 30_000 })
    await expect(review).toContainText('Email address', { timeout: 30_000 })
    await expect(review).not.toContainText('Organisation name')
    await expect(review).not.toContainText('Purchase order number')
  }
)

Then('the check invoicing details page is displayed', async function () {
  await expect(this.page).toHaveURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
  await expect(this.page.locator('h1')).toContainText(CHECK_HEADING, {
    timeout: 30_000
  })
})

Then(
  'the purchase order details page shows the question with the project name caption',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(PO_PATH), { timeout: 30_000 })
    await expect(page.locator('h1')).toContainText(PO_HEADING, {
      timeout: 30_000
    })
    await expect(page.locator('.govuk-caption-l')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )
    await expect(
      page.getByRole('radio', { name: 'Yes', exact: true })
    ).toBeVisible({ timeout: 30_000 })
    await expect(
      page.getByRole('radio', { name: 'No', exact: true })
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the check invoicing details page shows the purchase order number entered',
  async function () {
    const page = this.page
    await expect(page).toHaveURL(new RegExp(CHECK_PATH), { timeout: 30_000 })
    await expect(page.locator('#invoicing-review')).toContainText(
      this.data.invoicing.purchaseOrder,
      { timeout: 30_000 }
    )
  }
)

// --- ML-1397: Change links on the Check invoicing details page ---

// Accessible names of the Change links on the check page (text + visually hidden text).
const CHANGE_LINK_NAMES = {
  'address type': 'Change address type',
  address: 'Change address',
  'contact details': 'Change contact details',
  'purchase order': 'Change purchase order details'
}

async function clickInvoicingChangeLink(page, rowLabel) {
  await page
    .getByRole('link', { name: CHANGE_LINK_NAMES[rowLabel], exact: true })
    .click()
  await page.waitForLoadState('load')
}

Given(
  'an organisation user has selected Change for the address type',
  async function () {
    await driveOrgToPurchaseOrder(this)
    await confirmNoPurchaseOrder(this)
    await clickInvoicingChangeLink(this.page, 'address type')
    await expect(this.page).toHaveURL(new RegExp(IS_INVOICE_PATH), {
      timeout: 30_000
    })
  }
)

When('the user selects Change for the address type', async function () {
  await clickInvoicingChangeLink(this.page, 'address type')
  await expect(this.page).toHaveURL(new RegExp(IS_INVOICE_PATH), {
    timeout: 30_000
  })
})

// Selecting the same type saves and returns to the check page; selecting a
// different type routes to the appropriate address page. Re-selecting the
// already-checked radio is a no-op, so this covers the "keep" case too.
When(
  'the user selects {string} as the address type and saves',
  async function (type) {
    await this.page.getByRole('radio', { name: type, exact: true }).click()
    await this.page.locator('button:has-text("Save and continue")').click()
    await this.page.waitForLoadState('load')
  }
)

// Opens a change link, asserts the target page is pre-populated with the value
// entered earlier, updates it (storing the new value on world.data.invoicing),
// then saves — one step covers the address, contact details and purchase order
// change links.
const UPDATE_VIA_CHANGE = {
  address: async function (page, invoicing) {
    await expect(page).toHaveURL(new RegExp(UK_PATH), { timeout: 30_000 })
    await expect(page.locator('#addressLine1')).not.toHaveValue('')
    const updatedLine1 = faker.location.streetAddress()
    await page.locator('#addressLine1').fill(updatedLine1)
    invoicing.addressLine1 = updatedLine1
  },
  'contact details': async function (page, invoicing) {
    await expect(page).toHaveURL(new RegExp(CONTACT_PATH), { timeout: 30_000 })
    await expect(page.locator('#fullName')).toHaveValue(invoicing.fullName, {
      timeout: 30_000
    })
    const updatedFullName = faker.person.fullName()
    await page.locator('#fullName').fill(updatedFullName)
    invoicing.fullName = updatedFullName
  },
  'purchase order': async function (page, invoicing) {
    await expect(page).toHaveURL(new RegExp(PO_PATH), { timeout: 30_000 })
    await expect(
      page.locator('input[name="requiresPurchaseOrder"][value="no"]')
    ).toBeChecked({ timeout: 30_000 })
    const purchaseOrder = `PO-${faker.string.numeric(6)}`
    await page
      .locator('input[name="requiresPurchaseOrder"][value="yes"]')
      .click()
    await page.locator('#purchaseOrderNumber').fill(purchaseOrder)
    invoicing.purchaseOrder = purchaseOrder
  }
}

When('the user updates the {string} via its Change link', async function (row) {
  await clickInvoicingChangeLink(this.page, row)
  await UPDATE_VIA_CHANGE[row](this.page, this.data.invoicing)
  await this.page.locator('button:has-text("Save and continue")').click()
  await this.page.waitForLoadState('load')
})

When(
  'the user opens the address Change link and selects Back',
  async function () {
    await clickInvoicingChangeLink(this.page, 'address')
    await expect(this.page).toHaveURL(new RegExp(UK_PATH), { timeout: 30_000 })
    await this.page.locator('a.govuk-back-link:has-text("Back")').click()
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the UK or international invoice address page is shown with {string} selected',
  async function (type) {
    await expect(this.page).toHaveURL(new RegExp(IS_INVOICE_PATH), {
      timeout: 30_000
    })
    await expect(
      this.page.getByRole('radio', { name: type, exact: true })
    ).toBeChecked({ timeout: 30_000 })
  }
)

Then(
  'the invoicing page has a {string} button and no Cancel link',
  async function (buttonText) {
    await expect(
      this.page.getByRole('button', { name: buttonText, exact: true })
    ).toBeVisible({ timeout: 30_000 })
    await expect(
      this.page.getByRole('link', { name: 'Cancel', exact: true })
    ).toHaveCount(0)
    await expect(
      this.page.getByRole('button', { name: 'Cancel', exact: true })
    ).toHaveCount(0)
  }
)

// Maps the row label used in the feature to the world.data.invoicing key holding
// the value the update step stored, so one Then covers all three change links.
const UPDATED_FIELD_KEYS = {
  address: 'addressLine1',
  'contact details': 'fullName',
  'purchase order': 'purchaseOrder'
}

Then(
  'the check invoicing details page shows the updated {string}',
  async function (label) {
    await expect(this.page).toHaveURL(new RegExp(CHECK_PATH), {
      timeout: 30_000
    })
    await expect(this.page.locator('#invoicing-review')).toContainText(
      this.data.invoicing[UPDATED_FIELD_KEYS[label]],
      { timeout: 30_000 }
    )
  }
)

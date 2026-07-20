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
const COUNTRY_LIST_SAMPLE = 'Australia'

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

Then(
  'the country field lists all countries in alphabetical order',
  async function () {
    const options = await this.page
      .locator('select[name="country"] option')
      .evaluateAll((els) =>
        els.map((e) => e.textContent.trim()).filter(Boolean)
      )
    expect(options.length).toBe(196)
    expect(options[0]).toBe('Afghanistan')
    expect(options[options.length - 1]).toBe('Zimbabwe')
    expect(options).toContain(COUNTRY_LIST_SAMPLE)
  }
)

Then(
  'no validation error is shown on the international invoice address page',
  async function () {
    await expect(this.page.locator('.govuk-error-summary')).toHaveCount(0)
  }
)

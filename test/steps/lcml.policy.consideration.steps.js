import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { openMarinePlanPolicyList } from '../support/lcml-helpers.js'

const POLICY_MAP_URL =
  'https://environment.data.gov.uk/marine-plans-explorer/policy'

async function openFirstPolicyConsideration(page) {
  await openMarinePlanPolicyList(page)

  const firstPolicy = page
    .locator('main a[href^="/marine-licence/marine-plan-policy/"]')
    .first()
  await firstPolicy.waitFor({ state: 'visible', timeout: 30_000 })
  const href = await firstPolicy.getAttribute('href')
  const code = href.split('/').pop()
  await firstPolicy.click()
  await page.waitForURL(new RegExp(`marine-plan-policy/${code}$`), {
    timeout: 30_000
  })
  return code
}

async function saveConsideration(page) {
  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')
}

When(
  'the user opens a policy from the marine plan policy list',
  async function () {
    this.data.policyCode = await openFirstPolicyConsideration(this.page)
  }
)

When(
  'the user opens a policy and saves an empty consideration',
  async function () {
    this.data.policyCode = await openFirstPolicyConsideration(this.page)
    await saveConsideration(this.page)
  }
)

When(
  'the user opens a policy and saves a consideration of {int} characters',
  async function (count) {
    this.data.policyCode = await openFirstPolicyConsideration(this.page)
    await this.page.locator('#policyConsideration').evaluate((el, n) => {
      el.value = 'a'.repeat(n)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }, count)
    await saveConsideration(this.page)
  }
)

When(
  'the user opens a policy and saves a valid consideration',
  async function () {
    this.data.policyCode = await openFirstPolicyConsideration(this.page)
    this.data.policyResponse =
      'We have considered this policy and the proposal has been designed to mitigate the relevant impacts.'
    await this.page
      .locator('#policyConsideration')
      .fill(this.data.policyResponse)
    await saveConsideration(this.page)
  }
)

When('the user reopens the saved policy', async function () {
  await this.page
    .locator(
      `a[href="/marine-licence/marine-plan-policy/${this.data.policyCode}"]`
    )
    .click()
  await this.page.waitForLoadState('load')
})

Then(
  'the policy consideration page shows the policy code, policy information and a blank consideration textarea',
  async function () {
    const page = this.page
    const code = this.data.policyCode

    await expect(
      page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })

    await expect(page.locator('h1')).toHaveText(code, { timeout: 30_000 })

    await expect(
      page.locator('h2', { hasText: 'Policy information' }).first()
    ).toBeVisible({ timeout: 30_000 })

    const findOut = page.locator(`a[href="${POLICY_MAP_URL}/${code}"]`).first()
    await expect(findOut).toBeVisible({ timeout: 30_000 })
    await expect(findOut).toHaveAttribute('target', '_blank')

    const textarea = page.locator('#policyConsideration')
    await expect(textarea).toBeVisible({ timeout: 30_000 })
    await expect(textarea).toHaveValue('')
    await expect(textarea).toHaveAttribute('rows', '8')
  }
)

Then(
  'the policy consideration error {string} is shown',
  async function (message) {
    await expect(this.page.locator('.govuk-error-summary')).toContainText(
      message,
      { timeout: 30_000 }
    )
    await expect(this.page).toHaveURL(/marine-plan-policy\//, {
      timeout: 30_000
    })
  }
)

Then(
  'the saved policy is shown as {string} with an updated completed count',
  async function (status) {
    const page = this.page
    await expect(page).toHaveURL(/marine-licence\/marine-plan-policies/, {
      timeout: 30_000
    })

    const row = page
      .locator('main ul li', { hasText: this.data.policyCode })
      .first()
    await expect(row).toContainText(status, { timeout: 30_000 })

    await expect(
      page.getByText(/\d+ of \d+ policies completed/i).first()
    ).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the policy consideration textarea contains the saved response',
  async function () {
    await expect(this.page.locator('#policyConsideration')).toHaveValue(
      this.data.policyResponse,
      { timeout: 30_000 }
    )
  }
)

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeManualCircleApp,
  openMarinePlanPolicyList
} from '../support/lcml-helpers.js'

const POLICY_MAP_URL =
  'https://environment.data.gov.uk/marine-plans-explorer/policy'

function taskItem(page, taskName) {
  return page.locator('li.govuk-task-list__item', { hasText: taskName }).first()
}

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

async function completeAllPolicyConsiderations(page) {
  await openMarinePlanPolicyList(page)
  const codes = await page
    .locator('main a[href^="/marine-licence/marine-plan-policy/"]')
    .evaluateAll((links) =>
      links.map((a) => a.getAttribute('href').split('/').pop())
    )
  for (const code of codes) {
    await page
      .locator(`main a[href="/marine-licence/marine-plan-policy/${code}"]`)
      .click()
    await page.waitForURL(new RegExp(`marine-plan-policy/${code}$`), {
      timeout: 30_000
    })
    await page
      .locator('#policyConsideration')
      .fill(
        'We have considered this policy and the proposal is compatible with it.'
      )
    await saveConsideration(page)
    await page.waitForURL(/marine-licence\/marine-plan-policies/, {
      timeout: 30_000
    })
  }
}

Given(
  'an organisation user has completed the site details for a marine licence application',
  { timeout: 180_000 },
  async function () {
    await completeManualCircleApp(this)
    // Completing the site details triggers the marine plan policy query (served
    // by the marine-licensing-api-stub), which redirects to the task list once
    // the query has completed.
    await expect(this.page).toHaveURL(/marine-licence\/task-list/, {
      timeout: 60_000
    })
  }
)

Then(
  'the marine plan policies section shows the {string} task',
  async function (taskName) {
    await expect(
      this.page.locator('h2', { hasText: 'Marine plan policies' }).first()
    ).toBeVisible({ timeout: 30_000 })
    await expect(taskItem(this.page, taskName)).toBeVisible({ timeout: 30_000 })
  }
)

Then(
  'the {string} task is {string} and is not a link',
  async function (taskName, status) {
    const task = taskItem(this.page, taskName)
    await expect(task).toBeVisible({ timeout: 30_000 })
    await expect(task.locator('.govuk-task-list__status')).toContainText(
      status,
      { timeout: 30_000 }
    )
    await expect(task.locator('a')).toHaveCount(0)
  }
)

Then(
  'the {string} task is {string} and shows the number of policies to complete',
  async function (taskName, status) {
    const task = taskItem(this.page, taskName)
    await expect(task).toBeVisible({ timeout: 30_000 })
    await expect(task.locator('.govuk-task-list__status')).toContainText(
      status,
      { timeout: 30_000 }
    )
    await expect(task.locator('a')).toContainText(/\(\d+ to complete\)/, {
      timeout: 30_000
    })
  }
)

When(
  'the user opens the Marine plan policy considerations task',
  async function () {
    await openMarinePlanPolicyList(this.page)
    await expect(this.page).toHaveURL(/marine-licence\/marine-plan-policies/, {
      timeout: 30_000
    })
  }
)

Then(
  'the policy list page shows the policy count and an alphabetically sorted list of policy codes',
  async function () {
    const page = this.page
    await expect(
      page.locator('h1', { hasText: 'Marine plan policies' }).first()
    ).toBeVisible({ timeout: 30_000 })

    await expect(
      page.getByText(/\d+ policies to complete/i).first()
    ).toBeVisible({ timeout: 30_000 })

    // Extract the policy code from each row (leading e.g. "E-AGG-3"), independent
    // of whether the row is rendered as a link.
    const codes = await page
      .locator('main ul li')
      .evaluateAll((items) =>
        items
          .map(
            (li) => (li.textContent.trim().match(/^[A-Z]-[A-Z]+-\d+/) || [])[0]
          )
          .filter(Boolean)
      )
    expect(codes.length).toBeGreaterThan(0)
    expect(codes).toEqual([...codes].sort())
  }
)

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

When(
  'the user completes all marine plan policy considerations',
  { timeout: 180_000 },
  async function () {
    await completeAllPolicyConsiderations(this.page)
  }
)

When(
  'the user returns to the task list from the policy list',
  async function () {
    await this.page
      .locator(
        'button:has-text("Continue"), a.govuk-button:has-text("Continue")'
      )
      .first()
      .click()
    await expect(this.page).toHaveURL(/marine-licence\/task-list/, {
      timeout: 30_000
    })
  }
)

async function assertMppTaskCount(page, taskName, status, expectAllComplete) {
  const task = taskItem(page, taskName)
  await expect(task).toBeVisible({ timeout: 30_000 })
  await expect(task.locator('.govuk-task-list__status')).toContainText(status, {
    timeout: 30_000
  })
  await expect(task.locator('a')).toContainText(/\d+ of \d+ completed/, {
    timeout: 30_000
  })
  const linkText = await task.locator('a').innerText()
  const [, done, total] = linkText.match(/(\d+) of (\d+) completed/).map(Number)
  expect(total).toBeGreaterThan(0)
  if (expectAllComplete) {
    expect(done).toBe(total)
  } else {
    expect(done).toBeGreaterThan(0)
    expect(done).toBeLessThan(total)
  }
}

Then(
  'the {string} task is {string} and shows some of the policies completed',
  async function (taskName, status) {
    await assertMppTaskCount(this.page, taskName, status, false)
  }
)

Then(
  'the {string} task is {string} and shows all of the policies completed',
  async function (taskName, status) {
    await assertMppTaskCount(this.page, taskName, status, true)
  }
)

async function openGuidancePopup(page) {
  const popupPromise = page.waitForEvent('popup')
  await page.locator('a[href*="marine-plan-policy-guidance"]').first().click()
  const popup = await popupPromise
  await popup.waitForLoadState('load')
  return popup
}

When(
  'the user opens the marine plan policies guidance link from the {string} page',
  async function (page) {
    if (page === 'task list') {
      await expect(this.page).toHaveURL(/marine-licence\/task-list/, {
        timeout: 30_000
      })
    } else if (page === 'policy list') {
      await openMarinePlanPolicyList(this.page)
    } else if (page === 'policy consideration') {
      await openFirstPolicyConsideration(this.page)
    } else {
      throw new Error(`Unknown guidance entry page: ${page}`)
    }
    this.guidancePage = await openGuidancePopup(this.page)
  }
)

Then(
  'the marine plan policies guidance page opens in a new tab, without header links, a back link or a project name, and lists GOV.UK guidance links',
  async function () {
    const guidance = this.guidancePage
    await expect(guidance).toHaveURL(/marine-plan-policy-guidance/, {
      timeout: 30_000
    })
    await expect(guidance.locator('h1')).toHaveText(
      'Marine plan policies guidance',
      { timeout: 30_000 }
    )
    expect(
      await guidance.locator('main a[href*="gov.uk"]').count()
    ).toBeGreaterThanOrEqual(3)
    await expect(guidance.locator('.govuk-back-link')).toHaveCount(0)
    await expect(
      guidance.locator('.govuk-caption-l, .govuk-caption-m')
    ).toHaveCount(0)
    await expect(
      guidance.locator(
        '.govuk-service-navigation__item, .govuk-service-navigation__link'
      )
    ).toHaveCount(0)
  }
)

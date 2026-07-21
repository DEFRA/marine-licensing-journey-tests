import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  completeManualCircleApp,
  submitMarineLicence,
  completeMarinePlanPolicies,
  MARINE_PLAN_POLICY_RESPONSE
} from '../support/lcml-helpers.js'
import { clickReviewAndSend } from '../support/task-flow.js'

const MPP_CARD = '#marine-plan-policies-card'

function policyRows(page) {
  return page.locator(`${MPP_CARD} .govuk-summary-list__row`)
}

async function cardTitlesInOrder(page) {
  return page
    .locator('.govuk-summary-card__title')
    .evaluateAll((titles) => titles.map((t) => t.textContent.trim()))
}

async function policyCodesInCard(page) {
  return page
    .locator(`${MPP_CARD} dt.govuk-summary-list__key`)
    .evaluateAll((keys) => keys.map((k) => k.textContent.trim()))
}

// --- Givens ---

Given(
  'an organisation user has submitted a marine licence application with marine plan policies',
  { timeout: 180_000 },
  async function () {
    await completeManualCircleApp(this)
    await submitMarineLicence(this)
  }
)

Given(
  'an organisation user has completed a marine licence ready to review',
  { timeout: 180_000 },
  async function () {
    await completeManualCircleApp(this)
    await completeMarinePlanPolicies(this.page)
  }
)

Given(
  'an organisation user is on the check your answers page with completed marine plan policies',
  { timeout: 180_000 },
  async function () {
    await completeManualCircleApp(this)
    await clickReviewAndSend(this.page)
    await expect(
      this.page.locator('#check-your-answers-heading')
    ).toContainText('Check your answers before sending your information', {
      timeout: 30_000
    })
  }
)

When('the user opens the check your answers page', async function () {
  await this.page.locator('#review-and-send').click()
  await this.page.waitForURL(/marine-licence\/check-your-answers/, {
    timeout: 30_000
  })
  await this.page.waitForLoadState('load')
})

// --- Shared Marine plan policies card assertions (View details + Check your answers) ---

Then(
  'the marine plan policies card is displayed beneath the site and activity cards',
  async function () {
    await expect(this.page.locator(MPP_CARD)).toBeVisible({ timeout: 30_000 })
    await expect(
      this.page.locator(`${MPP_CARD} .govuk-summary-card__title`)
    ).toHaveText('Marine plan policies', { timeout: 30_000 })

    const titles = await cardTitlesInOrder(this.page)
    const mppIndex = titles.indexOf('Marine plan policies')
    const lastSiteOrActivity = titles.reduce(
      (last, title, index) => (/site|activity/i.test(title) ? index : last),
      -1
    )
    expect(mppIndex).toBeGreaterThan(lastSiteOrActivity)
  }
)

Then(
  'the marine plan policies card lists the policies sorted by code with their wording and my response',
  async function () {
    const codes = await policyCodesInCard(this.page)
    expect(codes.length).toBeGreaterThan(0)
    expect(codes).toEqual([...codes].sort((a, b) => a.localeCompare(b)))

    const rows = policyRows(this.page)
    const count = await rows.count()
    for (let i = 0; i < count; i++) {
      const value = rows.nth(i).locator('.govuk-summary-list__value')
      await expect(value).toContainText('Policy information', {
        timeout: 30_000
      })
      await expect(value).toContainText('Your consideration', {
        timeout: 30_000
      })
      await expect(value).toContainText(MARINE_PLAN_POLICY_RESPONSE, {
        timeout: 30_000
      })
    }
  }
)

Then('the marine plan policies card has no Change links', async function () {
  await expect(
    this.page.locator(`${MPP_CARD} .govuk-summary-list__actions a`)
  ).toHaveCount(0)
})

Then(
  'the marine plan policies card has a Change link for each policy',
  async function () {
    const rowCount = await policyRows(this.page).count()
    const changeLinks = this.page.locator(
      `${MPP_CARD} .govuk-summary-list__actions a`
    )
    await expect(changeLinks).toHaveCount(rowCount)
    await expect(changeLinks.first()).toContainText('Change')
  }
)

// --- AC2: Review and send button gating ---

Then(
  'the Review and send your information button is not displayed',
  async function () {
    await expect(this.page).toHaveURL(/marine-licence\/task-list/, {
      timeout: 30_000
    })
    await expect(this.page.locator('#review-and-send')).toHaveCount(0)
  }
)

When(
  'the user completes the marine plan policy considerations and returns to the task list',
  { timeout: 120_000 },
  async function () {
    await completeMarinePlanPolicies(this.page)
  }
)

Then(
  'the Review and send your information button is displayed',
  async function () {
    await expect(this.page).toHaveURL(/marine-licence\/task-list/, {
      timeout: 30_000
    })
    await expect(this.page.locator('#review-and-send')).toBeVisible({
      timeout: 30_000
    })
  }
)

// --- AC4: Change a marine plan policy from Check your answers ---

When(
  'the user selects Change for the first marine plan policy',
  async function () {
    const firstChange = this.page
      .locator(`${MPP_CARD} .govuk-summary-list__actions a`)
      .first()
    const href = await firstChange.getAttribute('href')
    this.data.policyCode = href.split('/').pop()
    await firstChange.click()
    await this.page.waitForURL(
      new RegExp(`marine-plan-policy/${this.data.policyCode}$`),
      { timeout: 30_000 }
    )
  }
)

Then(
  'the policy consideration page is pre-populated with my response and has no Cancel option',
  async function () {
    await expect(this.page.locator('#policyConsideration')).toHaveValue(
      MARINE_PLAN_POLICY_RESPONSE,
      { timeout: 30_000 }
    )
    await expect(
      this.page.locator('a.govuk-back-link:has-text("Back")')
    ).toBeVisible({ timeout: 30_000 })
    await expect(
      this.page.locator('button:has-text("Save and continue")')
    ).toBeVisible({ timeout: 30_000 })
    await expect(
      this.page.getByRole('link', { name: 'Cancel', exact: true })
    ).toHaveCount(0)
    await expect(
      this.page.getByRole('button', { name: 'Cancel', exact: true })
    ).toHaveCount(0)
  }
)

When(
  'the user updates the consideration and selects Save and continue',
  async function () {
    this.data.updatedResponse = `Updated consideration ${faker.lorem.sentence(6)}`
    await this.page
      .locator('#policyConsideration')
      .fill(this.data.updatedResponse)
    await this.page.locator('button:has-text("Save and continue")').click()
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user selects Back on the policy consideration page',
  async function () {
    await this.page.locator('a.govuk-back-link:has-text("Back")').click()
    await this.page.waitForLoadState('load')
  }
)

Then('the user is returned to the check your answers page', async function () {
  await expect(this.page).toHaveURL(/marine-licence\/check-your-answers/, {
    timeout: 30_000
  })
  await expect(this.page.locator('#check-your-answers-heading')).toContainText(
    'Check your answers before sending your information',
    { timeout: 30_000 }
  )
})

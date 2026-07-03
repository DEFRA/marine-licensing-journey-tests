import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  loginAndStartApplication,
  completeUploadApp
} from '../support/lcml-helpers.js'

const FEE_ESTIMATE_LINK = 'a[href="/marine-licence/fee-estimate"]'
const REJECTION_HEADING = 'Are you sure you do not accept the fee estimate?'

async function openFeeEstimatePage(world) {
  await loginAndStartApplication(world, 'organisation')
  await world.page.locator(FEE_ESTIMATE_LINK).click()
  await world.page.waitForLoadState('load')
}

async function saveFeeEstimate(page) {
  await page.locator('button:has-text("Save and continue")').click()
  await page.waitForLoadState('load')
}

async function reopenApplicationFromDashboard(world) {
  await world.page
    .locator(
      `xpath=//tr[td[contains(., "${world.data.projectName}")]]//a[normalize-space(text())="Continue"]`
    )
    .click()
  await world.page.waitForLoadState('load')
}

Given('an organisation user is on the Fee estimate page', async function () {
  await openFeeEstimatePage(this)
})

When(
  'the user saves the fee estimate without selecting anything',
  async function () {
    await saveFeeEstimate(this.page)
  }
)

Then('the fee estimate error {string} is displayed', async function (message) {
  await expect(this.page.locator('.govuk-error-summary')).toContainText(
    message,
    { timeout: 30_000 }
  )
})

When(
  'the user agrees to the terms and accepts the fee estimate',
  async function () {
    await this.page.locator('#termsAndConditions').check()
    await this.page.locator('#accept').check()
    await saveFeeEstimate(this.page)
  }
)

When(
  'the user agrees to the terms and does not accept the fee estimate',
  async function () {
    await this.page.locator('#termsAndConditions').check()
    await this.page.locator('#accept-2').check()
    await saveFeeEstimate(this.page)
  }
)

Then('the confirm fee estimate rejection page is displayed', async function () {
  await expect(this.page).toHaveURL(/fee-estimate-are-you-sure/, {
    timeout: 30_000
  })
  await expect(
    this.page.getByRole('heading', { name: REJECTION_HEADING })
  ).toBeVisible({ timeout: 30_000 })
})

Given(
  'an organisation user has rejected the fee estimate on the confirmation page',
  async function () {
    await openFeeEstimatePage(this)
    await this.page.locator('#termsAndConditions').check()
    await this.page.locator('#accept-2').check()
    await saveFeeEstimate(this.page)
    await expect(this.page).toHaveURL(/fee-estimate-are-you-sure/, {
      timeout: 30_000
    })
  }
)

When(
  'the user selects Finish on the confirm fee estimate rejection page',
  async function () {
    await this.page.locator('a:has-text("Finish")').click()
    await this.page.waitForLoadState('load')
  }
)

Then('the user is returned to the projects dashboard', async function () {
  await expect(this.page).toHaveURL(/\/projects/, { timeout: 30_000 })
})

Then(
  'the Fee estimate task is Not accepted back on the task list',
  async function () {
    await reopenApplicationFromDashboard(this)
    const status = this.page.locator(
      `xpath=//a[normalize-space(text())="Fee estimate"]/ancestor::li//div[contains(@class, "govuk-task-list__status")]`
    )
    await expect(status).toContainText('Not accepted', { timeout: 30_000 })
  }
)

Given(
  'an organisation user has completed all tasks but not accepted the fee estimate',
  async function () {
    await completeUploadApp(this)
    await this.page.locator(FEE_ESTIMATE_LINK).click()
    await this.page.waitForLoadState('load')
    await this.page.locator('#termsAndConditions').check()
    await this.page.locator('#accept-2').check()
    await saveFeeEstimate(this.page)
    await this.page.locator('a:has-text("Finish")').click()
    await this.page.waitForLoadState('load')
    await reopenApplicationFromDashboard(this)
  }
)

Then('the Review and send button is not displayed', async function () {
  await expect(this.page.locator('#review-and-send')).toHaveCount(0, {
    timeout: 30_000
  })
})

Then(
  'the Fee estimate task can be reopened to change the answer',
  async function () {
    await expect(this.page.locator(FEE_ESTIMATE_LINK)).toBeVisible({
      timeout: 30_000
    })
  }
)

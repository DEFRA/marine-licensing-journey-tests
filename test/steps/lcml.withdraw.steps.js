import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeManualCircleApp,
  submitMarineLicence
} from '../support/lcml-helpers.js'
import DashboardPage from '../pages/dashboard.page.js'

const WITHDRAW_PATH = '/marine-licence/withdraw'

async function openDashboard(page) {
  await page.getByRole('link', { name: 'Projects' }).click()
  await page.waitForURL(/\/projects/, { timeout: 30_000 })
  await page.waitForLoadState('load')
}

async function openWithdrawPage(world) {
  const page = world.page
  await openDashboard(page)
  await new DashboardPage(page).withdrawLink(world.data.projectName).click()
  await page.waitForURL(new RegExp(WITHDRAW_PATH), { timeout: 30_000 })
  await page.waitForLoadState('load')
}

async function confirmWithdrawal(page) {
  await page
    .locator(
      'xpath=//button[normalize-space(text())="Yes, withdraw application"]'
    )
    .click()
  await page.waitForURL(/\/projects/, { timeout: 30_000 })
  await page.waitForLoadState('load')
}

Given(
  'an organisation user has withdrawn a submitted marine licence application',
  { timeout: 180_000 },
  async function () {
    await completeManualCircleApp(this)
    await submitMarineLicence(this)
    await openWithdrawPage(this)
    await confirmWithdrawal(this.page)
  }
)

When(
  'the user confirms the withdrawal of the submitted application',
  async function () {
    await openWithdrawPage(this)
    await confirmWithdrawal(this.page)
  }
)

Then(
  'the withdrawn application offers View details but not Withdraw',
  async function () {
    const dashboard = new DashboardPage(this.page)
    const projectName = this.data.projectName
    await expect(dashboard.viewDetailsLink(projectName)).toBeVisible({
      timeout: 30_000
    })
    await expect(dashboard.withdrawLink(projectName)).toHaveCount(0)
  }
)

Then(
  'the application details card shows the Withdrawn status and the date withdrawn',
  async function () {
    const card = this.page.locator('#application-overview-card')
    await expect(card).toBeVisible({ timeout: 30_000 })

    const rowValue = (key) =>
      card.locator(
        `xpath=.//dt[normalize-space(text())="${key}"]/following-sibling::dd[1]`
      )

    await expect(rowValue('Status')).toContainText('Withdrawn', {
      timeout: 30_000
    })
    // Recorded on withdrawal, so it must read as a real date rather than a blank.
    await expect(rowValue('Date withdrawn')).toHaveText(/\d{1,2} \w+ \d{4}/, {
      timeout: 30_000
    })
  }
)

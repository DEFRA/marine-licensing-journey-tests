import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeManualCircleApp,
  submitMarineLicence
} from '../support/lcml-helpers.js'
import DashboardPage from '../pages/dashboard.page.js'

const WITHDRAW_PATH = '/marine-licence/withdraw'
const WITHDRAW_HEADING = 'Are you sure you want to withdraw this application?'
const MARINE_LICENCE_TYPE = 'Marine licence application'
const TERMS_AND_CONDITIONS_LINK =
  'https://assets.publishing.service.gov.uk/media/6938145b6a12691d48491c56/Terms_and_Conditions_for_carrying_out_chargeable_activities_for_marine_licensing.pdf'

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

When('the user views the projects dashboard', async function () {
  await openDashboard(this.page)
})

When(
  'the user selects Withdraw for the submitted application',
  async function () {
    await openWithdrawPage(this)
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
  'the submitted application offers both View details and Withdraw',
  async function () {
    const dashboard = new DashboardPage(this.page)
    const projectName = this.data.projectName
    await expect(dashboard.viewDetailsLink(projectName)).toBeVisible({
      timeout: 30_000
    })
    await expect(dashboard.withdrawLink(projectName)).toBeVisible({
      timeout: 30_000
    })
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
  'the withdraw confirmation page names the marine licence application and project',
  async function () {
    const page = this.page
    await expect(
      page.getByRole('heading', { name: WITHDRAW_HEADING })
    ).toBeVisible({ timeout: 30_000 })
    await expect(page.locator('.govuk-inset-text')).toHaveText(
      `${MARINE_LICENCE_TYPE}: ${this.data.projectName}`,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the withdraw confirmation page links to the marine licensing terms and conditions',
  async function () {
    const link = this.page.locator(
      `main a[href="${TERMS_AND_CONDITIONS_LINK}"]`
    )
    await expect(link).toBeVisible({ timeout: 30_000 })
    await expect(link).toHaveAttribute('target', '_blank')
  }
)

Then(
  'the application details card shows the Withdrawn status and the date withdrawn',
  async function () {
    const card = this.page.locator('#application-details-card')
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

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeManualCircleApp,
  submitMarineLicence
} from '../support/lcml-helpers.js'
import {
  sendTransferCompletedMessage,
  sendRejectedMessage
} from '../support/mas-queue.js'

const projectRow = (page, projectName) =>
  page.locator(`xpath=//tr[td[1][normalize-space(text())="${projectName}"]]`)

Given(
  'an organisation user has submitted a marine licence application',
  async function () {
    await completeManualCircleApp(this, {
      activity: { topLevel: 'Deposit', subOptionIndex: 1 }
    })
    await submitMarineLicence(this)
  }
)

async function notifyTransferCompleted() {
  this.data.transferMessage = await sendTransferCompletedMessage(
    this.data.applicationReference
  )
}

When(
  'a transfer completed message is sent for the application',
  notifyTransferCompleted
)

async function notifyRejected() {
  this.data.rejectMessage = await sendRejectedMessage(
    this.data.applicationReference
  )
}

When('a rejected message is sent for the application', notifyRejected)

Then(
  'the application status is {string} on the dashboard',
  { timeout: 120_000 },
  async function (status) {
    const page = this.page
    await page.getByRole('link', { name: 'Projects' }).click()
    await page.waitForLoadState('load')

    // The backend MAS worker consumes the queue message asynchronously, so poll
    // the dashboard until the application flips to the transferred status.
    const row = projectRow(page, this.data.projectName)
    for (let attempt = 0; attempt < 20; attempt++) {
      const text = (await row.innerText().catch(() => '')) || ''
      if (text.includes(status)) {
        break
      }
      await page.waitForTimeout(5_000)
      await page.reload()
      await page.waitForLoadState('load')
    }
    await expect(row).toContainText(status, { timeout: 10_000 })
  }
)

Then(
  'opening View details shows the {string} page with the project name and reference',
  async function (heading) {
    const page = this.page
    await projectRow(page, this.data.projectName)
      .locator('a', { hasText: 'View details' })
      .click()
    await page.waitForLoadState('load')

    await expect(page.locator('h1')).toContainText(heading, { timeout: 30_000 })
    await expect(page.locator('.govuk-caption-l')).toContainText(
      this.data.projectName,
      { timeout: 30_000 }
    )
    await expect(page.locator('main')).toContainText(
      this.data.applicationReference,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the transferred page links to MCMS and to the submitted application details',
  async function () {
    const page = this.page
    await expect(
      page.getByRole('link', {
        name: 'track the progress of your application'
      })
    ).toHaveAttribute('href', /MMO_LOGIN\/login/, { timeout: 30_000 })

    await expect(
      page.getByRole('link', {
        name: 'View your submitted application in this service'
      })
    ).toHaveAttribute('href', /marine-licence\/view-details\//, {
      timeout: 30_000
    })
  }
)

Then(
  'the submitted application details show the {string} status and a date of transfer',
  async function (status) {
    const page = this.page
    await page
      .getByRole('link', {
        name: 'View your submitted application in this service'
      })
      .click()
    await page.waitForLoadState('load')

    const card = page.locator('#application-details-card')
    await expect(card).toBeVisible({ timeout: 30_000 })
    await expect(
      card.locator('.govuk-summary-list__row:has(dt:text-is("Status"))')
    ).toContainText(status, { timeout: 30_000 })
    await expect(
      card.locator(
        '.govuk-summary-list__row:has(dt:text-is("Date of transfer")) .govuk-summary-list__value'
      )
    ).toContainText(/\d/, { timeout: 30_000 })
  }
)

Then(
  'the rejected page shows the reasons, free text and links, and the {string} application details',
  async function (status) {
    const page = this.page

    const reasons = page.locator('main ul.govuk-list--bullet').first()
    await expect(reasons).toContainText('Marine plan policies', {
      timeout: 30_000
    })
    await expect(reasons).toContainText('Another reason', { timeout: 30_000 })
    await expect(page.locator('main')).toContainText('Test free text', {
      timeout: 30_000
    })

    await expect(
      page.getByRole('button', { name: 'Apply again' })
    ).toHaveAttribute('href', /marine-licence\/update-and-resubmit\//, {
      timeout: 30_000
    })
    await expect(
      page.getByRole('link', { name: 'View your original application' })
    ).toHaveAttribute('href', /marine-licence\/view-details\//, {
      timeout: 30_000
    })

    await page
      .getByRole('link', { name: 'View your original application' })
      .click()
    await page.waitForLoadState('load')

    const card = page.locator('#application-details-card')
    await expect(card).toBeVisible({ timeout: 30_000 })
    await expect(
      card.locator('.govuk-summary-list__row:has(dt:text-is("Status"))')
    ).toContainText(status, { timeout: 30_000 })
    await expect(
      card.locator(
        '.govuk-summary-list__row:has(dt:text-is("Date marked as unable to progress")) .govuk-summary-list__value'
      )
    ).toContainText(/\d/, { timeout: 30_000 })
    await expect(
      card.locator(
        '.govuk-summary-list__row:has(dt:text-is("Reasons marked as unable to progress"))'
      )
    ).toContainText('Marine plan policies', { timeout: 30_000 })
  }
)

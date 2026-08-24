import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  completeManualCircleApp,
  completeMarineAreaShapefileApp,
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

    const card = page.locator('#application-overview-card')
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

    const card = page.locator('#application-overview-card')
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

const dashboardRow = (page, projectName, status) =>
  page
    .locator('table tr')
    .filter({ hasText: projectName })
    .filter({ hasText: status })

Given(
  'an organisation user has a rejected marine licence application',
  { timeout: 240_000 },
  async function () {
    await completeMarineAreaShapefileApp(this)
    await submitMarineLicence(this)
    this.data.rejectMessage = await sendRejectedMessage(
      this.data.applicationReference
    )

    const page = this.page
    await page.getByRole('link', { name: 'Projects' }).click()
    await page.waitForLoadState('load')
    const row = projectRow(page, this.data.projectName)
    for (let attempt = 0; attempt < 20; attempt++) {
      const text = (await row.innerText().catch(() => '')) || ''
      if (text.includes('Unable to progress')) {
        break
      }
      await page.waitForTimeout(5_000)
      await page.reload()
      await page.waitForLoadState('load')
    }
    await expect(row).toContainText('Unable to progress', { timeout: 10_000 })
  }
)

async function openApplyAgainPage(page, projectName) {
  await dashboardRow(page, projectName, 'Unable to progress')
    .getByRole('link', { name: 'View details' })
    .click()
  await page.waitForLoadState('load')
  await page.getByRole('button', { name: 'Apply again' }).click()
  await page.waitForLoadState('load')
}

When('the user opens the Apply again page for the project', async function () {
  await openApplyAgainPage(this.page, this.data.projectName)
})

When(
  'the user applies again and creates a new draft for the project',
  async function () {
    const page = this.page
    await openApplyAgainPage(page, this.data.projectName)
    await page
      .getByRole('button', { name: 'Create new draft and fix issues' })
      .click()
    await page.waitForLoadState('load')
  }
)

Then(
  'a new draft application is created pre-populated from the rejected application',
  async function () {
    const page = this.page
    await expect(page.locator('h1')).toContainText(
      'Marine licence start page',
      {
        timeout: 30_000
      }
    )
    await expect(
      page.locator('.govuk-caption-l, .govuk-caption-xl').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
    await expect(
      page
        .locator('.govuk-task-list__item', { hasText: 'Site details' })
        .locator('.govuk-task-list__status')
    ).toContainText('Completed', { timeout: 30_000 })
  }
)

Then(
  'the new draft has the Fee estimate task marked incomplete',
  async function () {
    await expect(
      this.page
        .locator('.govuk-task-list__item', { hasText: 'Fee estimate' })
        .locator('.govuk-task-list__status')
    ).toContainText('Not yet started', { timeout: 30_000 })
  }
)

Then(
  'the rejected application still shows the {string} status',
  async function (status) {
    const page = this.page
    await page.getByRole('link', { name: 'Projects' }).click()
    await page.waitForLoadState('load')
    await expect(dashboardRow(page, this.data.projectName, status)).toHaveCount(
      1,
      { timeout: 30_000 }
    )
    await expect(
      dashboardRow(page, this.data.projectName, 'Draft')
    ).toHaveCount(1, { timeout: 30_000 })
  }
)

Then(
  'the {string} page shows the original application reference',
  async function (heading) {
    const page = this.page
    await expect(page.locator('h1')).toContainText(heading, { timeout: 30_000 })
    await expect(page.locator('main')).toContainText(
      this.data.applicationReference,
      { timeout: 30_000 }
    )
  }
)

Then('cancelling returns to the {string} page', async function (heading) {
  const page = this.page
  await page.getByRole('link', { name: 'Cancel' }).click()
  await page.waitForLoadState('load')
  await expect(page.locator('h1')).toContainText(heading, { timeout: 30_000 })
})

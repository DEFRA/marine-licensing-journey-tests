import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  GUIDANCE_PATH,
  authenticateFromGuidancePage
} from '../support/navigation.js'
import {
  completeTasksFromCurrentPage,
  submitNotificationFromCurrentPage,
  submitCompletedExemption
} from '../support/task-flow.js'
import { createCYACircleWGS84Data } from '../test-data/check-your-answers.js'
import { getConfig } from '../support/config.js'
import {
  EXEMPTION_HANDOFF_PATHS,
  FIVIUM_IAT_START_URL,
  walkIatPath
} from '../support/iat-walk.js'

const EXEMPTION_GUIDANCE_RE = new RegExp(
  GUIDANCE_PATH.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
)

Given(
  'the user walks the IAT to an exemption handoff outcome for {string}',
  async function (activityType) {
    const labels = EXEMPTION_HANDOFF_PATHS[activityType]
    if (!labels) {
      throw new Error(
        `No exemption-handoff IAT path for activity type "${activityType}"`
      )
    }
    await walkIatPath(this, labels)
  }
)

When('the user follows the exemption Continue button', async function () {
  await expect(this.page).toHaveURL(/\/outcome\//, { timeout: 30_000 })
  const continueButton = this.page
    .locator(
      'main a.govuk-button:has-text("Continue"), main button.govuk-button:has-text("Continue")'
    )
    .first()
  await expect(continueButton).toBeVisible({ timeout: 30_000 })
  await continueButton.click()
  await this.page.waitForURL(EXEMPTION_GUIDANCE_RE, { timeout: 30_000 })
  await this.page.waitForLoadState('load')
})

Then(
  'the exemption journey URL contains the IAT context parameters',
  async function (dataTable) {
    const params = new URL(this.page.url()).searchParams
    for (const { parameter, value } of dataTable.hashes()) {
      expect(params.get(parameter), `query param ${parameter}`).toBe(value)
    }
  }
)

Given(
  'the user signs in and completes the exemption journey',
  async function () {
    await authenticateFromGuidancePage(this)
    this.data = createCYACircleWGS84Data()
    await completeTasksFromCurrentPage(this)
  }
)

When(
  'the user opens the View answers link on the check your answers page',
  async function () {
    const config = getConfig()
    await this.page.goto(
      new URL('/exemption/check-your-answers', config.baseURL).toString()
    )
    await this.page.waitForLoadState('load')

    const viewAnswersLink = this.page
      .locator('main a', { hasText: 'View answers (opens in a new tab)' })
      .first()
    await expect(viewAnswersLink).toBeVisible({ timeout: 30_000 })
    expect(await viewAnswersLink.getAttribute('target')).toBe('_blank')

    const href = await viewAnswersLink.getAttribute('href')
    expect(href, 'View answers link href').toMatch(/outcome-document/)
    if (this.attach) {
      this.attach(`answers URL -> ${href}`, 'text/plain')
    }

    await this.page.goto(href)
    await this.page.waitForLoadState('load')
  }
)

Then('the answers page shows the {string} activity', async function (activity) {
  await expect(
    this.page
      .locator('h1, h2', { hasText: 'Marine licence requirement check' })
      .first()
  ).toBeVisible({ timeout: 30_000 })

  await expect(
    this.page
      .locator('.govuk-summary-list__value', { hasText: activity })
      .first()
  ).toBeVisible({ timeout: 30_000 })
})

Given('the user signs in and submits the exemption', async function () {
  await authenticateFromGuidancePage(this)
  this.data = createCYACircleWGS84Data()
  await submitNotificationFromCurrentPage(this)
})

When(
  'the user opens the View answers link from the View details page',
  async function () {
    const viewAnswersLink = this.page
      .locator('main a', { hasText: 'View answers (opens in a new tab)' })
      .first()
    await expect(viewAnswersLink).toBeVisible({ timeout: 30_000 })
    expect(await viewAnswersLink.getAttribute('target')).toBe('_blank')
    expect(await viewAnswersLink.getAttribute('href')).toMatch(
      /outcome-document/
    )

    const popupPromise = this.page.waitForEvent('popup')
    await viewAnswersLink.click()
    const answersPage = await popupPromise
    await answersPage.waitForLoadState('load')
    this.answersPage = answersPage
  }
)

Then(
  'the IAT answers page provides print and save as PDF options',
  async function () {
    const page = this.answersPage
    await expect(page.locator('h1').first()).toContainText(
      'Marine licence requirement check',
      { timeout: 30_000 }
    )

    const printLink = page.locator('.print-link')
    await expect(printLink).toBeVisible({ timeout: 30_000 })
    await expect(printLink).toHaveText(/Print this page/)

    await expect(page.locator('.print-instructions')).toContainText(
      'Save as PDF',
      { timeout: 30_000 }
    )
  }
)

Given(
  'the user walks the Fivium IAT to an exemption handoff outcome',
  async function () {
    await walkIatPath(
      this,
      EXEMPTION_HANDOFF_PATHS.DREDGE,
      FIVIUM_IAT_START_URL
    )
  }
)

async function expectDownloadablePdfAnswersLink(page) {
  const pdfLink = page
    .locator('main a', { hasText: 'Download a copy of your answers (PDF)' })
    .first()
  await expect(pdfLink).toBeVisible({ timeout: 30_000 })
  expect(await pdfLink.getAttribute('href')).toContain(
    'marinemanagement.org.uk'
  )
}

Given(
  'the check your answers page offers a downloadable PDF copy',
  async function () {
    const config = getConfig()
    await this.page.goto(
      new URL('/exemption/check-your-answers', config.baseURL).toString()
    )
    await this.page.waitForLoadState('load')
    await expectDownloadablePdfAnswersLink(this.page)
  }
)

Given('the user submits the exemption', async function () {
  const config = getConfig()
  await this.page.goto(
    new URL('/exemption/task-list', config.baseURL).toString()
  )
  await this.page.waitForLoadState('load')
  await submitCompletedExemption(this)
})

Then('the answers link offers a downloadable PDF copy', async function () {
  await expectDownloadablePdfAnswersLink(this.page)
})

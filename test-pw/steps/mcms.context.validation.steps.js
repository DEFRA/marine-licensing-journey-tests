import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { createCYACircleWGS84Data } from '../test-data/check-your-answers.js'
import { generateIatContext } from '../test-data/exemption.js'
import {
  completeAllTasks,
  clickReviewAndSend,
  completeTasksFromCurrentPage
} from '../support/task-flow.js'
import {
  navigateAndAuthenticate,
  navigateWithRawQueryString
} from '../support/navigation.js'
import { getConfig } from '../support/config.js'
import CheckYourAnswersPage from '../pages/check.your.answers.page.js'
import DashboardPage from '../pages/dashboard.page.js'

Given(
  'a second notification is started with valid MCMS context after completing a first notification',
  async function () {
    this.data = createCYACircleWGS84Data()
    await completeAllTasks(this)
    await clickReviewAndSend(this.page)

    const cya = new CheckYourAnswersPage(this.page)
    await cya.expectHeading()

    // Start a second notification with fresh data + new IAT context
    const secondData = createCYACircleWGS84Data()
    this.data.projectName = secondData.projectName
    this.data.siteDetails = secondData.siteDetails
    this.data.publicRegister = secondData.publicRegister
    this.data.iatContext = generateIatContext()

    await navigateAndAuthenticate(this, '/')
  }
)

Given(
  'a notification is started with MCMS context {string}',
  async function (iatQueryString) {
    this.data = createCYACircleWGS84Data()
    this.data.rawIatQueryString = iatQueryString

    await navigateWithRawQueryString(this, '/', iatQueryString)
  }
)

When(
  'all tasks are completed for a circular site using WGS84 coordinates and review and send is clicked',
  async function () {
    await completeTasksFromCurrentPage(this)
    await clickReviewAndSend(this.page)
  }
)

Then(
  'the project summary card is displayed in full on the check your answers page',
  async function () {
    const cya = new CheckYourAnswersPage(this.page)
    await cya.expectHeading()

    const { page } = this
    const card = page.locator(
      'xpath=//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Project summary")]/ancestor::div[contains(@class, "govuk-summary-card")]'
    )

    // Project name term displayed
    await expect(
      card.locator('xpath=.//dt[contains(text(), "Project name")]')
    ).toBeVisible({ timeout: 30_000 })

    // Activity type displayed
    await expect(
      card.locator('xpath=.//dt[contains(text(), "Type of activity")]')
    ).toBeVisible()

    // Exemption reason displayed
    await expect(
      card.locator(
        'xpath=.//dt[contains(text(), "Why this activity is exempt")]'
      )
    ).toBeVisible()

    // PDF download displayed
    await expect(
      card.locator('xpath=.//dt[contains(text(), "Your answers from")]')
    ).toBeVisible()
  }
)

Then(
  'the project summary card only contains the project name',
  async function () {
    const cya = new CheckYourAnswersPage(this.page)
    await cya.expectHeading()

    const { page } = this
    const card = page.locator(
      'xpath=//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Project summary")]/ancestor::div[contains(@class, "govuk-summary-card")]'
    )

    // Project name term displayed
    await expect(
      card.locator('xpath=.//dt[contains(text(), "Project name")]')
    ).toBeVisible({ timeout: 30_000 })

    // Activity type NOT displayed
    await expect(
      card.locator('xpath=.//dt[contains(text(), "Type of activity")]')
    ).not.toBeVisible()

    // Activity purpose NOT displayed
    await expect(
      card.locator(
        'xpath=.//dt[contains(text(), "The purpose of the activity")]'
      )
    ).not.toBeVisible()

    // Exemption reason NOT displayed
    await expect(
      card.locator(
        'xpath=.//dt[contains(text(), "Why this activity is exempt")]'
      )
    ).not.toBeVisible()

    // PDF download NOT displayed
    await expect(
      card.locator('xpath=.//dt[contains(text(), "Your answers from")]')
    ).not.toBeVisible()
  }
)

When('the project name page is visited', async function () {
  const config = getConfig()
  await this.page.goto(new URL('/', config.baseURL).toString())
})

Then('the user is redirected to the homepage', async function () {
  await expect(this.page).toHaveURL(/\/home/, { timeout: 30_000 })
})

Then('the user is redirected to the dashboard', async function () {
  const dashboard = new DashboardPage(this.page)
  await dashboard.expectEmptyState()
})

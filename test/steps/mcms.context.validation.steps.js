import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  createCYACircleWGS84Data,
  withPublicRegister
} from '../test-data/check-your-answers.js'
import {
  generateIatContext,
  generateProjectName
} from '../test-data/exemption.js'
import { createMixedMultiSiteData } from '../test-data/site-details.js'
import {
  completeAllTasks,
  clickReviewAndSend,
  completeTasksFromCurrentPage
} from '../support/task-flow.js'
import { completeSiteDetailsFlow } from '../support/site-details-flow.js'
import {
  navigateAndAuthenticate,
  navigateWithRawQueryString,
  openIatHandoffUrlInSameSession
} from '../support/navigation.js'
import { getConfig } from '../support/config.js'
import CheckYourAnswersPage from '../pages/check.your.answers.page.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'
import PublicRegisterPage from '../pages/public.register.page.js'
import DashboardPage from '../pages/dashboard.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

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
  'a user has a draft exemption on the review site details page with sites and public register completed',
  async function () {
    this.data = withPublicRegister(
      createMixedMultiSiteData({
        sameActivityDates: true,
        sameActivityDescription: true
      })
    )

    await navigateAndAuthenticate(this, '/')

    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
    this.data.firstProjectName = this.data.projectName
    this.data.firstIatContext = this.data.iatContext
    this.data.projectNameTaskCompleted = true

    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Site details')
    await completeSiteDetailsFlow(this.page, this.data.siteDetails)
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')

    await taskList.selectTask('Sharing your project information publicly')
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.completeAndSave(
      this.data.publicRegister.consent,
      this.data.publicRegister.reason
    )

    await taskList.selectTask('Site details')
    const common = new CommonElementsPage(this.page)
    await common.expectHeading('Review site details')
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

When('the user opens the pre-canned IAT URL again in the same session', async function () {
  this.data.iatContext = this.data.firstIatContext
  await openIatHandoffUrlInSameSession(this, { useRootPath: true })
})

When(
  'entering and saving a project with a valid name for the second exemption',
  async function () {
    this.data.secondProjectName = generateProjectName()
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.secondProjectName)
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

Then('the dashboard shows both exemption project names', async function () {
  const dashboard = new DashboardPage(this.page)
  await dashboard.clickProjectsLink()
  await dashboard.expectIsDisplayed()

  const notifications = await dashboard.getNotifications()
  const namesOnDashboard = notifications.map((n) => n.name)
  const expectedNames = [
    this.data.firstProjectName,
    this.data.secondProjectName
  ]

  this.attach(
    JSON.stringify(
      {
        expectedProjectNames: expectedNames,
        projectNamesOnDashboard: namesOnDashboard
      },
      null,
      2
    ),
    'application/json'
  )

  for (const name of expectedNames) {
    expect(
      namesOnDashboard,
      `Expected "${name}" on the projects dashboard. Found: ${namesOnDashboard.join(', ') || 'no projects'}`
    ).toContain(name)
  }
})

Then('the first exemption retains its original project name', async function () {
  const dashboard = new DashboardPage(this.page)
  const row = await dashboard.getNotificationRow(this.data.firstProjectName)
  expect(row.name).toBe(this.data.firstProjectName)
  expect(row.status).toBe('Draft')
})

When('the project name page is visited', async function () {
  const config = getConfig()
  await this.page.goto(new URL('/', config.baseURL).toString())
})

Then('the user is redirected to the homepage', async function () {
  await expect(this.page).toHaveURL(/\/home/, { timeout: 30_000 })
})

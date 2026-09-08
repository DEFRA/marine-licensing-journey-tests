import { expect } from '@playwright/test'
import { Given, When, Then } from '@cucumber/cucumber'
import {
  createCYACircleWGS84Data,
  withPublicRegister
} from '../test-data/check-your-answers.js'
import {
  generateProjectName,
  generateIatContext
} from '../test-data/exemption.js'
import {
  createCircleWGS84Data,
  generateLiveActivityDates
} from '../test-data/site-details.js'
import { submitNotification } from '../support/task-flow.js'
import { getConfig } from '../support/config.js'
import {
  navigateAndAuthenticate,
  signOut,
  navigateAndReAuthenticate
} from '../support/navigation.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'
import DashboardPage from '../pages/dashboard.page.js'
import ViewDetailsPage, { EXEMPTION_TYPE } from '../pages/view.details.page.js'
import DeleteProjectPage from '../pages/delete.project.page.js'

function latestExemption(world) {
  const submitted = world.data.completedExemptions
  return submitted[submitted.length - 1]
}

Given('a user has submitted an exemption notification', async function () {
  this.data = createCYACircleWGS84Data({
    activityDates: generateLiveActivityDates()
  })
  await submitNotification(this)
})

Given(
  'a user has withdrawn a submitted exemption notification',
  { timeout: 180_000 },
  async function () {
    this.data = createCYACircleWGS84Data()
    await submitNotification(this)

    const page = this.page
    const dashboard = new DashboardPage(page)
    await dashboard.clickProjectsLink()
    await dashboard.expectIsDisplayed()

    await dashboard.withdrawLink(latestExemption(this).projectName).click()
    await page.waitForLoadState('load')
    await page
      .locator(
        'xpath=//button[normalize-space(text())="Yes, withdraw project"]'
      )
      .click()
    await page.waitForLoadState('load')

    // Withdrawing lands on the dashboard, where the "Projects" nav link the
    // shared When step clicks is not rendered; go home so it can navigate.
    await page.goto(new URL('/home', getConfig().baseURL).toString())
    await page.waitForLoadState('load')
  }
)

Given('the user has not submitted any notifications', async function () {
  this.data = {
    iatContext: generateIatContext(),
    projectName: generateProjectName()
  }
  await navigateAndAuthenticate(this, '/')
})

Given(
  'the user has multiple notifications with different statuses and names',
  async function () {
    this.data = createCYACircleWGS84Data({
      activityDates: generateLiveActivityDates()
    })
    this.data.completedExemptions = []

    // Submit 3 notifications
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        const newData = withPublicRegister(
          createCircleWGS84Data({ activityDates: generateLiveActivityDates() })
        )
        this.data.projectName = newData.projectName
        this.data.siteDetails = newData.siteDetails
        this.data.publicRegister = newData.publicRegister
        this.data.iatContext = generateIatContext()
      }
      await submitNotification(this)
      await signOut(this.page)
    }

    // Create a draft (4th notification — navigate + project name only)
    const draftData = withPublicRegister(createCircleWGS84Data())
    this.data.projectName = draftData.projectName
    this.data.siteDetails = draftData.siteDetails
    this.data.publicRegister = draftData.publicRegister
    this.data.iatContext = generateIatContext()

    await navigateAndAuthenticate(this, '/')
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)

    // Track draft in completed exemptions (no reference = draft)
    this.data.completedExemptions.push({
      projectName: this.data.projectName,
      applicationReference: null
    })

    await signOut(this.page)
  }
)

Given('the user has a draft exemption notification', async function () {
  this.data = createCYACircleWGS84Data()
  await navigateAndAuthenticate(this, '/')

  const projectPage = new ProjectNamePage(this.page)
  await projectPage.enterProjectName(this.data.projectName)

  await signOut(this.page)
})

When(
  'the user clicks view details for the submitted notification on the dashboard',
  async function () {
    const dashboard = new DashboardPage(this.page)
    await dashboard.clickProjectsLink()
    await dashboard.expectIsDisplayed()

    const lastExemption =
      this.data.completedExemptions[this.data.completedExemptions.length - 1]
    await dashboard.viewDetailsLink(lastExemption.projectName).click()
    await this.page.waitForLoadState('load')
  }
)

When('the user navigates to the dashboard', async function () {
  await navigateAndReAuthenticate(this, DashboardPage.path)
})

When(
  'the user continues the notification from the dashboard and reenters the project name task',
  async function () {
    await navigateAndReAuthenticate(this, DashboardPage.path)

    const dashboard = new DashboardPage(this.page)
    await dashboard.expectIsDisplayed()
    await dashboard.continueLink(this.data.projectName).click()
    await this.page.waitForLoadState('load')

    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Project name')
  }
)

When('the user starts a new notification', async function () {
  const newData = createCYACircleWGS84Data()
  this.data.projectName = newData.projectName
  this.data.siteDetails = newData.siteDetails
  this.data.publicRegister = newData.publicRegister
  this.data.iatContext = generateIatContext()

  await navigateAndAuthenticate(this, '/')
})

When(
  'the user deletes the draft notification from the dashboard',
  async function () {
    await navigateAndReAuthenticate(this, DashboardPage.path)

    const dashboard = new DashboardPage(this.page)
    await dashboard.expectIsDisplayed()
    await dashboard.deleteLink(this.data.projectName).click()
    await this.page.waitForURL(/\/exemption\/delete/, { timeout: 30_000 })

    const deletePage = new DeleteProjectPage(this.page)
    await deletePage.confirmDeletion()
  }
)

Then(
  'the user is able to view the notification in a summary format',
  async function () {
    const viewDetails = new ViewDetailsPage(this.page)
    await viewDetails.expectIsDisplayed()
  }
)

Then('the message {string} is shown', async function (_message) {
  const dashboard = new DashboardPage(this.page)
  await dashboard.expectEmptyState()
})

// "the project name is pre-populated" defined in project.name.steps.js
// "the page caption shows the previously saved project name" defined in project.name.steps.js

Then('the project name is not pre-populated', async function () {
  const projectPage = new ProjectNamePage(this.page)
  await projectPage.expectProjectNameValue('')
})

Then(
  'the notifications are displayed with the correct information',
  async function () {
    const dashboard = new DashboardPage(this.page)
    await dashboard.expectNotificationsDisplayed(this.data.completedExemptions)
  }
)

Then(
  'the notifications are sorted by status with drafts first then by project name',
  async function () {
    const dashboard = new DashboardPage(this.page)
    await dashboard.expectSortOrder()
  }
)

Then('the notification is removed from the dashboard', async function () {
  const dashboard = new DashboardPage(this.page)
  await dashboard.expectEmptyState()
})

Then(
  'the view details caption shows the reference and not the exemption type',
  async function () {
    const viewDetails = new ViewDetailsPage(this.page)
    await expect(viewDetails.caption).toHaveText(
      latestExemption(this).applicationReference,
      { timeout: 30_000 }
    )
    // ML-1493 moved the exemption type into the Application details card.
    await expect(viewDetails.caption).not.toContainText(EXEMPTION_TYPE)
  }
)

Then(
  'the application details card shows the exemption type, {string} status, reference and date submitted',
  async function (status) {
    const viewDetails = new ViewDetailsPage(this.page)
    await expect(viewDetails.applicationDetailsCard).toBeVisible({
      timeout: 30_000
    })
    await expect(viewDetails.cardRowValue('Application type')).toHaveText(
      EXEMPTION_TYPE,
      { timeout: 30_000 }
    )
    await expect(viewDetails.cardRowValue('Status')).toContainText(status, {
      timeout: 30_000
    })
    await expect(viewDetails.cardRowValue('Reference number')).toHaveText(
      latestExemption(this).applicationReference,
      { timeout: 30_000 }
    )
    await expect(viewDetails.cardRowValue('Date submitted')).toHaveText(
      /\d{1,2} \w+ \d{4}/,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the application details card has no date withdrawn row',
  async function () {
    const viewDetails = new ViewDetailsPage(this.page)
    await expect(viewDetails.cardRowValue('Date withdrawn')).toHaveCount(0)
  }
)

Then(
  'the application details card shows the date withdrawn',
  async function () {
    const viewDetails = new ViewDetailsPage(this.page)
    await expect(viewDetails.cardRowValue('Date withdrawn')).toHaveText(
      /\d{1,2} \w+ \d{4}/,
      { timeout: 30_000 }
    )
  }
)

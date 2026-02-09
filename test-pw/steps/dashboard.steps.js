import { Given, When, Then } from '@cucumber/cucumber'
import {
  createCYACircleWGS84Data,
  withPublicRegister
} from '../test-data/check-your-answers.js'
import {
  generateProjectName,
  generateIatContext
} from '../test-data/exemption.js'
import { createCircleWGS84Data } from '../test-data/site-details.js'
import { submitNotification } from '../support/task-flow.js'
import {
  navigateAndAuthenticate,
  signOut,
  navigateAndReAuthenticate
} from '../support/navigation.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'
import DashboardPage from '../pages/dashboard.page.js'
import ViewDetailsPage from '../pages/view.details.page.js'
import DeleteProjectPage from '../pages/delete.project.page.js'

Given('a user has submitted an exemption notification', async function () {
  this.data = createCYACircleWGS84Data()
  await submitNotification(this)
})

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
    this.data = createCYACircleWGS84Data()
    this.data.completedExemptions = []

    // Submit 3 notifications
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        const newData = withPublicRegister(createCircleWGS84Data())
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

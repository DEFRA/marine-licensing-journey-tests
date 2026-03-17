import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { createCYACircleWGS84Data } from '../test-data/check-your-answers.js'
import { navigateAndAuthenticate } from '../support/navigation.js'
import {
  continueFromBeforeYouStart,
  selectProvideMethod,
  selectFileType,
  completeSiteDetailsFlow
} from '../support/site-details-flow.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'

Given(
  'the user has explored file upload options during site details entry',
  async function () {
    this.data = createCYACircleWGS84Data()
    await navigateAndAuthenticate(this, '/')

    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
    this.data.projectNameTaskCompleted = true

    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Site details')

    await continueFromBeforeYouStart(this.page)
    await selectProvideMethod(this.page, 'file-upload')
    await selectFileType(this.page, 'KML')

    // Cancel / go back to task list
    await this.page.goBack()
    await this.page.goBack()
    await this.page.goBack()
    await this.page.goBack()
  }
)

When(
  'the user completes site details using manual coordinate entry instead',
  async function () {
    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Site details')
    await completeSiteDetailsFlow(this.page, this.data.siteDetails)
    await this.page.locator('button:has-text("Continue")').click()
  }
)

Then('the site details task should be marked as completed', async function () {
  const taskList = new TaskListPage(this.page)
  await expect(taskList.getTaskStatus('Site details')).toContainText(
    'Completed',
    { timeout: 30_000 }
  )
})

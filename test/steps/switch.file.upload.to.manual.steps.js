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

// The file-upload exploration goes ~4 pages deep (before you start -> provide
// method -> file type -> upload).the loop stops as soon as the
//task list is shown, so this is just a safety cap.
const MAX_BACK_STEPS_TO_TASK_LIST = 6

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

    for (
      let i = 0;
      i < MAX_BACK_STEPS_TO_TASK_LIST &&
      !(await taskList
        .getTaskLink('Site details')
        .isVisible()
        .catch(() => false));
      i++
    ) {
      await this.page.goBack({ waitUntil: 'load' })
    }
  }
)

When(
  'the user completes site details using manual coordinate entry instead',
  async function () {
    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Site details')
    await completeSiteDetailsFlow(this.page, this.data.siteDetails)
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
  }
)

Then('the site details task should be marked as completed', async function () {
  const taskList = new TaskListPage(this.page)
  await expect(taskList.getTaskStatus('Site details')).toContainText(
    'Completed',
    { timeout: 30_000 }
  )
})

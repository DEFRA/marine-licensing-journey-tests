import { When, Then } from '@cucumber/cucumber'
import TaskListPage from '../pages/task.list.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

When('the {string} task is selected', async function (taskName) {
  const taskListPage = new TaskListPage(this.page)
  await taskListPage.selectTask(taskName)
})

Then('the task list page is displayed', async function () {
  const expectedHeading = this.data.projectNameTaskCompleted
    ? this.data.projectName
    : 'Task list'
  const common = new CommonElementsPage(this.page)
  await common.expectHeading(expectedHeading)
})

Then(
  'the {string} task status is {string}',
  async function (taskName, taskStatus) {
    const taskListPage = new TaskListPage(this.page)
    await taskListPage.expectTaskStatus(taskName, taskStatus)
  }
)

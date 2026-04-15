import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {
  loginAndReachTaskList,
  completeProjectBackground
} from '../support/lcml-helpers.js'
import TaskListPage from '../pages/task.list.page.js'

Given(
  'an organisation user is on the marine licence task list',
  async function () {
    await loginAndReachTaskList(this)
  }
)

Given(
  'an organisation user is on the project background page',
  async function () {
    await loginAndReachTaskList(this)
    await this.page.locator('a:has-text("Project background")').click()
    await this.page.waitForLoadState('load')
  }
)

Given(
  'an organisation user has completed the project background task',
  async function () {
    await loginAndReachTaskList(this)
    const backgroundText = faker.lorem.sentence(10)
    this.data.projectBackground = backgroundText
    await completeProjectBackground(this.page, backgroundText)
  }
)

When('the user views the task list', async function () {
  // Already on task list from Given step
})

When('the user enters a valid project background and saves', async function () {
  const backgroundText = faker.lorem.sentence(10)
  this.data.projectBackground = backgroundText
  await this.page.locator('#projectBackground').fill(backgroundText)
  await this.page.locator('button:has-text("Save and continue")').click()
  await this.page.waitForLoadState('load')
})

When('the user re-enters the project background task', async function () {
  await this.page.locator('a:has-text("Project background")').click()
  await this.page.waitForLoadState('load')
})

Then(
  'the user is returned to the task list with {string} status {string}',
  async function (taskName, status) {
    const taskList = new TaskListPage(this.page)
    await taskList.expectTaskStatus(taskName, status)
  }
)

Then('the previously saved project background is displayed', async function () {
  await expect(this.page.locator('#projectBackground')).toHaveValue(
    this.data.projectBackground,
    { timeout: 30_000 }
  )
})

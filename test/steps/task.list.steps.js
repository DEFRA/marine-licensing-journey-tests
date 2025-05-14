import { Then, When } from '@cucumber/cucumber'

import { TaskListPage } from '~/test-infrastructure/pages'
import {
  EnsureThatPageHeading,
  EnsureTaskStatus,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

When('the {string} task is selected', async function (taskName) {
  await this.actor.attemptsTo(SelectTheTask.withName(taskName))
})

Then('the task list page is displayed', async function () {
  await this.actor.attemptsTo(
    EnsureThatPageHeading.is(this.actor.recalls('projectName'))
  )
})

Then('the Project name task status is {string}', async function (taskStatus) {
  await this.actor.attemptsTo(
    EnsureTaskStatus.is(TaskListPage.projectNameTaskStatus, taskStatus)
  )
})

Then(
  'the Public register task status is {string}',
  async function (taskStatus) {
    await this.actor.attemptsTo(
      EnsureTaskStatus.is(TaskListPage.publicRegisterTaskStatus, taskStatus)
    )
  }
)

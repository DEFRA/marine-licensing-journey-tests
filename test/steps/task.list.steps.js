import { Then, When } from '@cucumber/cucumber'
import {
  EnsureTaskStatus,
  EnsureThatPageHeading,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

When('the {string} task is selected', async function (taskName) {
  await this.actor.attemptsTo(SelectTheTask.withName(taskName))
})

Then('the task list page is displayed', async function () {
  const exemption = this.actor.recalls('exemption')
  const expectedHeading = exemption?.projectNameTaskCompleted
    ? exemption.projectName
    : 'Task list'
  await this.actor.attemptsTo(EnsureThatPageHeading.is(expectedHeading))
})

Then(
  'the {string} task status is {string}',
  async function (taskName, taskStatus) {
    await this.actor.attemptsTo(EnsureTaskStatus.is(taskName, taskStatus))
  }
)

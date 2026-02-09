import { Given, When, Then } from '@cucumber/cucumber'
import { createCYACircleWGS84Data } from '../test-data/check-your-answers.js'
import {
  completeAllTasks,
  clickReviewAndSend,
  clickConfirmAndSend
} from '../support/task-flow.js'
import CheckYourAnswersPage from '../pages/check.your.answers.page.js'
import ConfirmationPage from '../pages/confirmation.page.js'

Given(
  'the user has completed all the tasks on the task list and is on the Check your answers page',
  async function () {
    this.data = createCYACircleWGS84Data()
    await completeAllTasks(this)
    await clickReviewAndSend(this.page)

    const cya = new CheckYourAnswersPage(this.page)
    await cya.expectHeading()
  }
)

When('the user clicks Confirm and send', async function () {
  await clickConfirmAndSend(this.page)
})

Then(
  'the confirmation page is displayed with an application reference and survey link',
  async function () {
    const confirmation = new ConfirmationPage(this.page)
    await confirmation.expectIsDisplayed()
    await confirmation.expectValidReference()
    await confirmation.expectFeedbackLink()
  }
)

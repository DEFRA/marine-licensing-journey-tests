import { Given, Then, When } from '@cucumber/cucumber'
import ActivityDatesPage from '~/test-infrastructure/pages/activity.dates.page'
import {
  ActivityDatesModel,
  Memory,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import ClickSaveAndContinue from '~/test-infrastructure/screenplay/interactions/button-interactions/click.save.and.continue'
import EnsureErrorDisplayed from '~/test-infrastructure/screenplay/interactions/ensure.error'

Given('the activity dates are valid', function () {
  this.actor.updates(
    Memory.ofActivityDatesWith(ActivityDatesModel.generateValidActivityDates())
  )
})

When(
  'clicking save and continue without entering any dates',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

Then('the end date error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(
    EnsureErrorDisplayed.is(
      ActivityDatesPage.activityEndDateError,
      errorMessage
    )
  )
})

Then(
  'the start date error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        ActivityDatesPage.activityStartDateError,
        errorMessage
      )
    )
  }
)

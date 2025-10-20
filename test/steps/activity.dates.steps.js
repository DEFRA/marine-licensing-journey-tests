import { Given, Then, When } from '@cucumber/cucumber'
import ActivityDatesPage from '~/test-infrastructure/pages/activity.dates.page'
import {
  ActivityDatesModel,
  ClickButton,
  Memory,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
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
    await this.actor.attemptsTo(ClickButton.withText('Save and continue'))
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

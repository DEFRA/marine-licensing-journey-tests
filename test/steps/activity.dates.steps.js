import { Given, Then, When } from '@cucumber/cucumber'
import ActivityDatesPage from '~/test-infrastructure/pages/activity.dates.page'
import {
  ActivityDatesModel,
  CompleteActivityDates,
  Memory,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import ClickSaveAndContinue from '~/test-infrastructure/screenplay/interactions/click.save.and.continue'
import EnsureErrorDisplayed from '~/test-infrastructure/screenplay/interactions/ensure.error'

Given('the activity dates are valid', function () {
  this.actor.updates(
    Memory.ofActivityDatesWith(ActivityDatesModel.generateValidActivityDates())
  )
})

Given('the start date of the activity is today', function () {
  this.actor.updates(
    Memory.ofActivityDatesWith(ActivityDatesModel.generateTodayAsStartDate())
  )
})

Given('the actiity dates task has been completed', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
  await this.actor.attemptsTo(CompleteActivityDates.now())
})

Given('the activity dates task has been completed', async function () {
  this.actor.updates(
    Memory.ofActivityDatesWith(ActivityDatesModel.generateTodayAsStartDate())
  )
  await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
  await this.actor.attemptsTo(CompleteActivityDates.now())
})

Given('the activity will take place in a single day', function () {
  this.actor.updates(
    Memory.ofActivityDatesWith(ActivityDatesModel.generateSameStartAndEndDate())
  )
})

Given('the activity has no start date', function () {
  this.actor.updates(
    Memory.ofActivityDatesWith(ActivityDatesModel.generateEndDateOnly())
  )
})

Given('the activity has no end date', function () {
  this.actor.updates(
    Memory.ofActivityDatesWith(ActivityDatesModel.generateStartDateOnly())
  )
})

Given(
  'the activity end date has {string}, {string}, {string}',
  function (day, month, year) {
    this.actor.updates(
      Memory.ofActivityEndDateWith(
        ActivityDatesModel.generateEndDate(day, month, year)
      )
    )
  }
)

Given(
  'the activity start date has {string}, {string}, {string}',
  function (day, month, year) {
    this.actor.updates(
      Memory.ofActivityStartDateWith(
        ActivityDatesModel.generateStartDate(day, month, year)
      )
    )
  }
)

When('completing the activity dates task', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
  await this.actor.attemptsTo(CompleteActivityDates.now())
})

When(
  'completing the activity dates task with different dates',
  async function () {
    this.actor.updates(
      Memory.ofActivityDatesWith(
        ActivityDatesModel.generateValidActivityDates()
      )
    )
    await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
    await this.actor.attemptsTo(CompleteActivityDates.now())
  }
)

When('changing the activity dates but using the back link', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
  await this.actor.attemptsTo(CompleteActivityDates.now().andThenClickBack())
})

When('changing the activity dates but cancelling out', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
  await this.actor.attemptsTo(CompleteActivityDates.now().andThenClickCancel())
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

Then(
  'the date order error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        ActivityDatesPage.activityEndDateError,
        errorMessage
      )
    )
  }
)

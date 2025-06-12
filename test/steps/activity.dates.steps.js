import { Given, When } from '@cucumber/cucumber'
import {
  ActivityDatesModel,
  CompleteActivityDates,
  Memory,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

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

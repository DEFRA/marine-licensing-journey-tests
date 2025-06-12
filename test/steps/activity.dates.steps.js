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

When('completing the activity dates task', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
  await this.actor.attemptsTo(CompleteActivityDates.now())
})

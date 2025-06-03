import { Given, When } from '@cucumber/cucumber'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompleteActivityDescription,
  Memory,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

Given(
  'the activity description task has been completed with valid information',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withValidProjectName())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
    await this.actor.attemptsTo(CompleteProjectName.now())
  }
)

When('entering and saving a valid activity description', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Activity description'))
  await this.actor.attemptsTo(CompleteActivityDescription.now())
})

When(
  'updating the activity description with {string}',
  async function (newActivityDescription) {
    this.actor.updates(Memory.ofActivityDescriptionWith(newActivityDescription))
    await this.actor.attemptsTo(SelectTheTask.withName('Activity description'))
    await this.actor.attemptsTo(CompleteActivityDescription.now())
  }
)

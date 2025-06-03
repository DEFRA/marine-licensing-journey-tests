import { Given, When, Then } from '@cucumber/cucumber'
import { ActivityDescriptionPage } from '~/test-infrastructure/pages'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompleteActivityDescription,
  EnsureErrorDisplayed,
  Memory,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import ClickSaveAndContinue from '~/test-infrastructure/screenplay/interactions/click.save.and.continue'

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

When(
  'the Activity description task is selected and saved without entering text',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Activity description'))
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

Then(
  'the Activity description error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        ActivityDescriptionPage.activityDescriptionError,
        errorMessage
      )
    )
  }
)

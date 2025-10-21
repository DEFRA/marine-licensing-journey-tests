import { Given, Then, When } from '@cucumber/cucumber'
import { faker } from '@faker-js/faker'
import { ActivityDescriptionPage } from '~/test-infrastructure/pages'
import {
  ActivityDescriptionModel,
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickButton,
  ClickCancel,
  CompleteActivityDescription,
  CompleteProjectName,
  EnsureErrorDisplayed,
  Memory,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import FillForm from '~/test-infrastructure/screenplay/tasks/fill.form'

Given(
  'the activity description task has been completed with valid information',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withValidProjectName())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Activity description'))
    await this.actor.attemptsTo(CompleteActivityDescription.now())
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
    await this.actor.attemptsTo(ClickButton.withText('Save and continue'))
  }
)

When(
  'the Activity description task is selected and text over 4000 characters is entered',
  async function () {
    await this.actor.attemptsTo(SelectTheTask.withName('Activity description'))
    this.actor.updates(
      Memory.ofActivityDescriptionWith(
        ActivityDescriptionModel.withOver4000Characters()
      )
    )
    await this.actor.attemptsTo(CompleteActivityDescription.now())
  }
)

When('changing the activity description but cancelling out', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Activity description'))
  await this.actor.attemptsTo(
    FillForm.activityDescription(faker.lorem.words(5))
  )
  await this.actor.attemptsTo(ClickCancel.now())
})

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

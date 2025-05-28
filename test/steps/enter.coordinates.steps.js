import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  UploadCoordinates,
  EnterTheCoordinatesManually
} from '~/test-infrastructure/screenplay/tasks'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import EnsurePageHeading from '~/test-infrastructure/screenplay/interactions/ensure.heading'

Given('the Site details task is selected', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

When('selecting to upload a coordinate file', async function () {
  await this.actor.attemptsTo(UploadCoordinates.now())
})

When('selecting to enter coordinates manually', async function () {
  await this.actor.attemptsTo(EnterTheCoordinatesManually.now())
})

Then('the file upload interface is displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
})

Then('the manual coordinate entry interface is displayed', async function () {
  await this.actor.attemptsTo(
    EnsurePageHeading.is('How do you want to enter the coordinates?')
  )
})

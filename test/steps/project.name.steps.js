import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'

import { ProjectNamePage } from '~/test-infrastructure/pages'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  EnsureErrorDisplayed,
  EnsureProjectNameDisplayedAsCaption,
  EnsureThatProjectName,
  Navigate
} from '~/test-infrastructure/screenplay'
import { MarineProjectModel } from '~/test-infrastructure/screenplay/models'

Given('the project name page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
})

Given(
  'a notification has been created with a valid project name',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andActivityDates.withValidDates()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
  }
)

When('entering and saving a project with a valid name', async function () {
  this.actor.updates((exemption) => {
    exemption.projectName = MarineProjectModel.generateProjectName()
  })
  await this.actor.attemptsTo(CompleteProjectName.now())
})

When(
  'entering and saving the project with name {string}',
  async function (projectName) {
    this.actor.updates((exemption) => {
      exemption.projectName = projectName
    })
    await this.actor.attemptsTo(CompleteProjectName.now())
  }
)

Then(
  'the project name error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(ProjectNamePage.projectNameError, errorMessage)
    )
  }
)

Then('the project name is pre-populated', async function () {
  await this.actor.attemptsTo(EnsureThatProjectName.isCorrect())
})

Then(
  'the page caption shows the previously saved project name',
  async function () {
    await this.actor.attemptsTo(EnsureProjectNameDisplayedAsCaption.isCorrect())
  }
)

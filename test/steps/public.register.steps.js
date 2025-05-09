import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import { faker } from '@faker-js/faker'

import {
  PublicRegisterPage,
  ProjectNamePage,
  TaskListPage
} from '~/test-infrastructure/pages'
import {
  Actor,
  CompletePublicRegisterTask,
  ApplyForExemption,
  CompleteProjectName,
  BrowseTheWeb,
  SelectTheTask,
  EnsureThatPageHeading,
  EnsureTaskStatus,
  EnsurePublicRegisterTask
} from '~/test-infrastructure/screenplay'

Given('the Public register page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
  this.projectName = faker.lorem.words(5)
  await this.actor.attemptsTo(CompleteProjectName.with(this.projectName))
  await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
})

Given('the Public register task has been completed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
  this.actor.remembers('projectName', faker.lorem.words(5))
  await this.actor.attemptsTo(
    CompleteProjectName.with(this.actor.recalls('projectName'))
  )
})

When(
  'choosing not to withhold information from the public register',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.where(
        this.actor.recalls('publicRegisterChoice')
      )
    )
  }
)

When(
  'choosing to withhold information from the public register',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.withhold)
    this.actor.remembers(
      'publicRegisterWithholdReason',
      'Sensitive information'
    )
    await this.actor.attemptsTo(
      CompletePublicRegisterTask.where(
        this.actor.recalls('publicRegisterChoice'),
        this.actor.recalls('publicRegisterWithholdReason')
      )
    )
  }
)

When(
  'the “Save and continue” button is selected after choosing “Yes” without providing a reason',
  async function () {
    this.actor.attemptsTo(
      CompletePublicRegisterTask.has(PublicRegisterPage.withhold)
    )
  }
)

When(
  'the “Save and continue” button is selected with a reason exceeding {int} characters',
  async function (numberOfCharacters) {
    this.actor.remembers(
      'publicRegisterWithholdReason',
      faker.lorem.numberOfCharacters(numberOfCharacters + 1)
    )

    this.actor.attemptsTo(
      CompletePublicRegisterTask.where(
        PublicRegisterPage.withhold,
        this.actor.recalls('publicRegisterWithholdReason')
      )
    )
  }
)

When(
  'choosing to allow information to be added to the public register by selecting “No”',
  async function () {
    this.actor.remembers('publicRegisterChoice', PublicRegisterPage.consent)
    this.actor.attemptsTo(
      CompletePublicRegisterTask.where(
        this.actor.recalls('publicRegisterChoice')
      )
    )
  }
)

When('selecting the {string} option', (option) => {
  // Write code here that turns the phrase above into concrete actions
})

When('completing the public register task', async function () {
  // Write code here that turns the phrase above into concrete actions
})

When(
  'the “Save and continue” button is selected without choosing a radio option',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

When('selecting the “Back” link', async function () {
  // Write code here that turns the phrase above into concrete actions
})

When('changing the public register information', async function () {
  // Write code here that turns the phrase above into concrete actions
})

Then('the public register information is saved', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
  await this.actor.attemptsTo(
    EnsurePublicRegisterTask.hasBeenCompletedWith(
      this.actor.recalls('publicRegisterChoice'),
      this.actor.recalls('publicRegisterWithholdReason')
    )
  )
})

Then(
  'the project name is displayed on the Public register page',
  async function () {
    this.actor.attemptsTo(EnsureThatPageHeading.is(this.projectName))
  }
)

Then('no information is pre-populated', async function () {
  this.actor.attemptsTo(EnsurePublicRegisterTask.hasNoInformationCompleted())
})

Then(
  'the page is pre-populated with the previously entered information',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then(
  'the option to provide a reason for withholding information is available',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then(
  'the option to provide a reason for withholding information is not available',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then(
  'the Public register task status is {string}',
  async function (taskStatus) {
    await this.actor.attemptsTo(
      EnsureTaskStatus.is(TaskListPage.publicRegisterTaskStatus, taskStatus)
    )
  }
)

Then(
  'any changes made on the page during this visit are not saved',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then('any changes made are not saved', async function () {
  // Write code here that turns the phrase above into concrete actions
})

Then('the error message {string} is displayed', (s) => {
  // Write code here that turns the phrase above into concrete actions
})

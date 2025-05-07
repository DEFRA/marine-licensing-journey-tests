import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import { faker } from '@faker-js/faker'

import {
  PublicRegisterPage,
  ProjectNamePage
} from '~/test-infrastructure/pages'
import {
  Actor,
  ApplyForExemption,
  CompleteProjectName,
  BrowseTheWeb
} from '~/test-infrastructure/screenplay'

Given('the Public register page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(PublicRegisterPage.url)) // this might not be right now
})

Given('the Public register task has been completed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
  this.projectName = faker.lorem.words(5)
  await this.actor.attemptsTo(CompleteProjectName.with(this.projectName))
})

When(
  'choosing not to withhold information from the public register',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

When(
  'choosing to withhold information from the public register',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

When(
  'the “Save and continue” button is selected after choosing “Yes” without providing a reason',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

When(
  'the “Save and continue” button is selected with a reason exceeding {int} characters',
  (int) => {
    // Write code here that turns the phrase above into concrete actions
  }
)

When(
  'choosing to withhold information from the public register by selecting “Yes”',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

When(
  'choosing to allow information to be added to the public register by selecting “No”',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

When('selecting the {string} option', (s) => {
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
  // Write code here that turns the phrase above into concrete actions
})

Then(
  'the project name is displayed on the Public register page',
  async function () {
    // Write code here that turns the phrase above into concrete actions
  }
)

Then('no information is pre-populated', async function () {
  // Write code here that turns the phrase above into concrete actions
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

Then('the Public register task status is {string}', (s) => {
  // Write code here that turns the phrase above into concrete actions
})

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

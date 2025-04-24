import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import BrowseTheWeb from '../../test-infrastructure/screenplay/abilities/browse.the.web.js'
import Actor from '../../test-infrastructure/screenplay/actor.js'
import EnsureThatPageHeading from '../../test-infrastructure/screenplay/interactions/ensure.heading.js'
import EnsureProjectNameError from '../../test-infrastructure/screenplay/interactions/ensure.project.name.error.js'
import ApplyForExemption from '../../test-infrastructure/screenplay/tasks/apply.for.exemption.js'
import CompleteProjectName from '../../test-infrastructure/screenplay/tasks/complete.project.name.js'

Given('the project name page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where('exemption/project-name'))
})

When('entering and saving the project name', async function () {
  await this.actor.attemptsTo(CompleteProjectName.with('example project name'))
})

When(
  'entering and saving the project with name {string}',
  async function (projectName) {
    await this.actor.attemptsTo(CompleteProjectName.with(projectName))
  }
)

Then('a new notification record is created', async function () {
  // Write code here that turns the phrase above into concrete actions
})

Then('the project name page remains displayed', async function () {
  await this.actor.attemptsTo(EnsureThatPageHeading.is('Project name'))
})

Then('the error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(EnsureProjectNameError.is(errorMessage))
})

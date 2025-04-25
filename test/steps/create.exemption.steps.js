import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page.js'
import BrowseTheWeb from '../../test-infrastructure/screenplay/abilities/browse.the.web.js'
import Actor from '../../test-infrastructure/screenplay/actor.js'
import EnsureThatPageHeading from '../../test-infrastructure/screenplay/interactions/ensure.heading.js'
import EnsureProjectNameError from '../../test-infrastructure/screenplay/interactions/ensure.project.name.error.js'
import ApplyForExemption from '../../test-infrastructure/screenplay/tasks/apply.for.exemption.js'
import CompleteProjectName from '../../test-infrastructure/screenplay/tasks/complete.project.name.js'
import { clearExemptionDataFromMongoDb } from '~/test-infrastructure/db/mongo.db.js'
import EnsureNotification from '~/test-infrastructure/screenplay/interactions/ensure.notification.js'

Given('the project name page is displayed', async function () {
  clearExemptionDataFromMongoDb(global.sharedVariables.mongoDbUri)
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
})

When(
  'entering and saving the project with name {string}',
  async function (projectName) {
    await this.actor.attemptsTo(CompleteProjectName.with(projectName))
  }
)

Then(
  'a new notification record is created with name {string}',
  async function (projectName) {
    await this.actor.attemptsTo(
      EnsureNotification.isCreatedWithName(projectName)
    )
  }
)

Then('the project name page remains displayed', async function () {
  await this.actor.attemptsTo(EnsureThatPageHeading.is('Project name'))
})

Then('the error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(EnsureProjectNameError.is(errorMessage))
})

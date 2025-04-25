import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page.js'
import BrowseTheWeb from '../../test-infrastructure/screenplay/abilities/browse.the.web.js'
import Actor from '../../test-infrastructure/screenplay/actor.js'
import EnsureThatPageHeading from '../../test-infrastructure/screenplay/interactions/ensure.heading.js'
import EnsureProjectNameError from '../../test-infrastructure/screenplay/interactions/ensure.project.name.error.js'
import ApplyForExemption from '../../test-infrastructure/screenplay/tasks/apply.for.exemption.js'
import CompleteProjectName from '../../test-infrastructure/screenplay/tasks/complete.project.name.js'
import { faker } from '~/node_modules/@faker-js/faker/dist/index.js'

Given('the project name page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
})

Given('a notification has been created with a valid project name', () => {
  // Write code here that turns the phrase above into concrete actions
})

When('entering and saving the project with a valid name', async function () {
  this.projectName = faker.lorem.words(5)
  await this.actor.attemptsTo(CompleteProjectName.with(this.projectName))
})

When(
  'entering and saving the project with name {string}',
  async function (projectName) {
    this.projectName = projectName
    await this.actor.attemptsTo(CompleteProjectName.with(this.projectName))
  }
)

When('the project name task is selected', () => {
  // Write code here that turns the phrase above into concrete actions
})

When('the project name is updated', () => {
  // Write code here that turns the phrase above into concrete actions
})

Then('a new notification record is created', async function () {
  // to be implemented once a GET api is created (or perhaps via the UI)
})

Then('the project name page remains displayed', async function () {
  await this.actor.attemptsTo(
    EnsureThatPageHeading.is(ProjectNamePage.pageHeading)
  )
})

Then('the error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(EnsureProjectNameError.is(errorMessage))
})

Then('the task list page is displayed', async function () {
  await this.actor.attemptsTo(EnsureThatPageHeading.is(this.projectName))
})

Then('the project name task is shown as {string}', (s) => {
  // Write code here that turns the phrase above into concrete actions
})

Then('the other tasks are shown as {string}', (s) => {
  // Write code here that turns the phrase above into concrete actions
})

Then('the project name is pre-populated', () => {
  // Write code here that turns the phrase above into concrete actions
})

Then('the new project name is saved', () => {
  // Write code here that turns the phrase above into concrete actions
})

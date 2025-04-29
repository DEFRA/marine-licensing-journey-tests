import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import { faker } from '~/node_modules/@faker-js/faker/dist/index.js'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page.js'
import EnsureThatTask from '~/test-infrastructure/screenplay/interactions/ensure.task.is.js'
import SelectTheTask from '~/test-infrastructure/screenplay/interactions/select.task.js'
import BrowseTheWeb from '~/test-infrastructure/screenplay/abilities/browse.the.web.js'
import Actor from '~/test-infrastructure/screenplay/actor.js'
import EnsureThatPageHeading from '~/test-infrastructure/screenplay/interactions/ensure.heading.js'
import EnsureProjectName from '~/test-infrastructure/screenplay/interactions/ensure.project.name.error.js'
import ApplyForExemption from '~/test-infrastructure/screenplay/tasks/apply.for.exemption.js'
import CompleteProjectName from '~/test-infrastructure/screenplay/tasks/complete.project.name.js'
import EnsureThatProjectName from '~/test-infrastructure/screenplay/interactions/ensure.project.name.js'

Given('the project name page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
})

Given(
  'a notification has been created with a valid project name',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(new BrowseTheWeb(browser))
    await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
    this.projectName = faker.lorem.words(5)
    await this.actor.attemptsTo(CompleteProjectName.with(this.projectName))
  }
)

When('entering and saving a project with a valid name', async function () {
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

When('the {string} task is selected', async function (taskName) {
  await this.actor.attemptsTo(SelectTheTask.withName(taskName))
})

When('the project name is updated', async function () {
  this.projectName = faker.lorem.words(4)
  await this.actor.attemptsTo(CompleteProjectName.with(this.projectName))
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
  await this.actor.attemptsTo(EnsureProjectName.errorIs(errorMessage))
})

Then('the task list page is displayed', async function () {
  await this.actor.attemptsTo(EnsureThatPageHeading.is(this.projectName))
})

Then('the project name task is shown as {string}', async function (taskStatus) {
  await this.actor.attemptsTo(EnsureThatTask.is('Project name', taskStatus))
})

Then('the project name is pre-populated', async function () {
  await this.actor.attemptsTo(EnsureThatProjectName.is(this.projectName))
})

Then('the new project name is saved', async function () {
  // Write code here that turns the phrase above into concrete actions
})

Then('the task statuses are', (table) => {
  // Write code here that turns the phrase above into concrete actions
})

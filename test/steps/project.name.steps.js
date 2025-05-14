import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import { faker } from '@faker-js/faker'

import { ProjectNamePage } from '~/test-infrastructure/pages'
import {
  Actor,
  BrowseTheWeb,
  EnsureErrorDisplayed,
  EnsureThatProjectName,
  SelectTheTask,
  ApplyForExemption,
  CompleteProjectName
} from '~/test-infrastructure/screenplay'

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
    this.actor.remembers('projectName', faker.lorem.words(5))
    await this.actor.attemptsTo(
      CompleteProjectName.with(this.actor.recalls('projectName'))
    )
  }
)

When('entering and saving a project with a valid name', async function () {
  this.actor.remembers('projectName', faker.lorem.words(5))
  await this.actor.attemptsTo(
    CompleteProjectName.with(this.actor.recalls('projectName'))
  )
})

When(
  'entering and saving the project with name {string}',
  async function (projectName) {
    this.actor.remembers('projectName', projectName)
    await this.actor.attemptsTo(
      CompleteProjectName.with(this.actor.recalls('projectName'))
    )
  }
)

When('the project name is updated', async function () {
  this.actor.remembers('projectName', faker.lorem.words(4))
  await this.actor.attemptsTo(SelectTheTask.withName('Project name'))
  await this.actor.attemptsTo(
    CompleteProjectName.with(this.actor.recalls('projectName'))
  )
})

Then('the error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(
    EnsureErrorDisplayed.is(ProjectNamePage.projectNameError, errorMessage)
  )
})

Then('the project name is pre-populated', async function () {
  await this.actor.attemptsTo(
    EnsureThatProjectName.is(this.actor.recalls('projectName'))
  )
})

Then('the new project name is saved', async function () {
  await this.actor.attemptsTo(SelectTheTask.withName('Project name'))
  await this.actor.attemptsTo(
    EnsureThatProjectName.is(this.actor.recalls('projectName'))
  )
})

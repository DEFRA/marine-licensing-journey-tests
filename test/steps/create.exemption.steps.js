import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import BrowseTheWeb from '../screenplay/abilities/browse.the.web.js'
import Actor from '../screenplay/actor.js'
import Ensure from '../screenplay/interactions/ensure.heading.is.js'
import ApplyForExemption from '../screenplay/tasks/apply.for.exemption.js'
import CompleteProjectName from '../screenplay/tasks/complete.project.name.js'

Given('the project name page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.attemptsTo(ApplyForExemption.where(''))
})

When('entering and saving the project name', async function () {
  this.actor.attemptsTo(CompleteProjectName.with('example project name'))
})

Then('a new notification record is created', async function () {
  // Write code here that turns the phrase above into concrete actions
})

Then('the project name page remains displayed', async function () {
  await this.actor.attemptsTo(Ensure.thatPageHeadingIs(this.actor, 'Home'))
})

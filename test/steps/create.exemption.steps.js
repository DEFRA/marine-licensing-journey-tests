import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import Actor from '../screenplay/actor.js'
import BrowseTheWeb from '../screenplay/abilities/browse.the.web.js'
import ApplyForExemption from '../screenplay/tasks/apply.for.exemption.js'
import Ensure from '../screenplay/interactions/ensure.heading.is.js'

Given('a user is on the project name page', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.attemptsTo(ApplyForExemption.where(''))
})

When('the user provides a project name and clicks save and continue', () => {
  // insert new project name
  // click save and continue
})

Then('the new notification record is created', () => {
  // Write code here that turns the phrase above into concrete actions
})

Then('the user remains on the project name page', async function () {
  await this.actor.attemptsTo(Ensure.thatPageHeadingIs(this.actor, 'Home'))
})

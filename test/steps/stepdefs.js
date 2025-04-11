import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import Actor from '../screenplay/actor.js'
import BrowseTheWeb from '../screenplay/abilities/browse.the.web.js'
import ApplyForExemption from '../screenplay/tasks/apply.for.exemption.js'
import Ensure from '../screenplay/interactions/ensure.heading.is.js'

Given('a user wants to apply for an exemption', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
})

When('the user launches the marine licensing app', async function () {
  await this.actor.attemptsTo(ApplyForExemption.where(''))
})

Then('the user is on the home page', async function () {
  await this.actor.attemptsTo(Ensure.thatPageHeadingIs(this.actor, 'Home'))
})

import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'

import { PublicRegisterPage } from '~/test-infrastructure/pages'
import {
  Actor,
  BrowseTheWeb,
  ApplyForExemption
} from '~/test-infrastructure/screenplay'

Given('the Public register page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  await this.actor.attemptsTo(ApplyForExemption.where(PublicRegisterPage.url)) // this might not be right now
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

Then('the public register information is saved', async function () {
  // Write code here that turns the phrase above into concrete actions
})

import { Given, Then, When } from '@cucumber/cucumber'
import {
  Actor,
  BrowseD365,
  LoginToD365,
  VerifyThatTheUserIsLoggedInToD365
} from '~/test-infrastructure/screenplay'

Given('a D365 user', async function () {
  this.mmoUser = new Actor('Marcus')
  this.mmoUser.can(BrowseD365.withPlaywright())
})

When('the the user launches D365', async function () {
  await this.mmoUser.attemptsTo(LoginToD365.now())
})

Then('the user is logged in', async function () {
  await this.mmoUser.attemptsTo(VerifyThatTheUserIsLoggedInToD365.now())
})

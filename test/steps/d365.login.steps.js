import { Given, When, Then } from '@cucumber/cucumber'
import {
  Actor,
  BrowseD365,
  LoginToD365,
  LoginToD365Browser,
  VerifyThatTheUserIsLoggedInToD365
} from '~/test-infrastructure/screenplay'

Given('a D365 user', async function () {
  // Minimize the WebDriverIO browser window (it's unused for D365 tests)
  await browser.minimizeWindow()
  this.mmoUser = new Actor('Marcus')
  this.mmoUser.can(BrowseD365.withPlaywright())
})

When('the the user launches D365', async function () {
  await this.mmoUser.attemptsTo(LoginToD365.now())
})

When('the user logs into D365 via browser', async function () {
  await this.mmoUser.attemptsTo(LoginToD365Browser.now())
})

Then('the user is logged in', async function () {
  await this.mmoUser.attemptsTo(VerifyThatTheUserIsLoggedInToD365.now())
})

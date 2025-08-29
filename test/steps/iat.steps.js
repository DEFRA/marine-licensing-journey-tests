import { Given, Then, When } from '@wdio/cucumber-framework'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  EnsureThatIatIsDisplayed,
  LaunchIat
} from '~/test-infrastructure/screenplay'

Given('an applicant is unsure of what to do next', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
  )
})

When('they launch the interactive assistance tool', async function () {
  await this.actor.attemptsTo(LaunchIat.now())
})

Then('the welcome page is displayed', async function () {
  await this.actor.attemptsTo(EnsureThatIatIsDisplayed.now())
})

import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickCookiesLink,
  EnsureCookiesPolicyPage,
  EnsureCookiesRadioButtonSelected,
  Navigate
} from '~/test-infrastructure/screenplay'

Given('a user has not made a decision about cookies', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
})

When('the cookies link is clicked in the footer', async function () {
  await this.actor.attemptsTo(ClickCookiesLink.now())
})

Then('the cookies policy page is displayed', async function () {
  await this.actor.attemptsTo(EnsureCookiesPolicyPage.isDisplayed())
})

Then(
  'the {string} radio button is selected for analytics cookies',
  async function (radioOption) {
    await this.actor.attemptsTo(
      EnsureCookiesRadioButtonSelected.is(radioOption)
    )
  }
)

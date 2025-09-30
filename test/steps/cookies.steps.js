import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  AcceptCookiesFromBanner,
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickCookiesLink,
  EnsureAnalyticsCookiesSet,
  EnsureCookieConfirmationBanner,
  EnsureCookiesPolicyPage,
  EnsureCookiesRadioButtonSelected,
  Navigate,
  RejectCookiesFromBanner,
  SaveCookiePreferences
} from '~/test-infrastructure/screenplay'

Given('a user has not made a decision about cookies', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withNoPreviousCookieDecision())
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

Given('a user is on the cookies policy page', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(ClickCookiesLink.now())
  await this.actor.attemptsTo(EnsureCookiesPolicyPage.isDisplayed())
})

When(
  'selecting Yes for analytics cookies and saving preferences',
  async function () {
    await this.actor.attemptsTo(SaveCookiePreferences.accepting())
  }
)

When(
  'selecting No for analytics cookies and saving preferences',
  async function () {
    await this.actor.attemptsTo(SaveCookiePreferences.rejecting())
  }
)

Then(
  'the cookie preferences confirmation banner is displayed',
  async function () {
    await this.actor.attemptsTo(EnsureCookieConfirmationBanner.isDisplayed())
  }
)

Then('the analytics cookies are enabled', async function () {
  await this.actor.attemptsTo(EnsureAnalyticsCookiesSet.areEnabled())
})

Then('the analytics cookies are disabled', async function () {
  await this.actor.attemptsTo(EnsureAnalyticsCookiesSet.areDisabled())
})

Given('analytics cookies have been previously accepted', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(ClickCookiesLink.now())
  await this.actor.attemptsTo(SaveCookiePreferences.accepting())
  await this.actor.attemptsTo(EnsureCookieConfirmationBanner.isDisplayed())
})

Given('analytics cookies have been previously rejected', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(ClickCookiesLink.now())
  await this.actor.attemptsTo(SaveCookiePreferences.rejecting())
  await this.actor.attemptsTo(EnsureCookieConfirmationBanner.isDisplayed())
})

When('returning to the cookies policy page', async function () {
  await this.actor.attemptsTo(ClickCookiesLink.now())
  await this.actor.attemptsTo(EnsureCookiesPolicyPage.isDisplayed())
})

When(
  'the analytics cookies are accepted from the cookie banner',
  async function () {
    await this.actor.attemptsTo(AcceptCookiesFromBanner.now())
  }
)

When(
  'the analytics cookies are rejected from the cookie banner',
  async function () {
    await this.actor.attemptsTo(RejectCookiesFromBanner.now())
  }
)

Given(
  'the project name page is displayed with the cookie banner visible',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(new BrowseTheWeb(browser))
    this.actor.intendsTo(ApplyForExemption.withNoPreviousCookieDecision())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  }
)

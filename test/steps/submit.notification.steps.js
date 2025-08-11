import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickConfirmAndSend,
  ClickReviewAndSend,
  CompleteAllTasks,
  EnsureConfirmationPage,
  Navigate
} from '~/test-infrastructure/screenplay'
import ClickDefraAccount from '~/test-infrastructure/screenplay/interactions/click.defra.account'
import ClickMarineLicensingService from '~/test-infrastructure/screenplay/interactions/click.marine.licensing.service'
import EnsureDashboardPage from '~/test-infrastructure/screenplay/interactions/ensure.dashboard.page'
import EnsureDefraAccountPage from '~/test-infrastructure/screenplay/interactions/ensure.defra.account.page'

Given(
  'the user has completed all the tasks on the task list and is on the Check your answers page',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(CompleteAllTasks.now())
    await this.actor.attemptsTo(ClickReviewAndSend.now())
  }
)

When('the user clicks Confirm and send', async function () {
  await this.actor.attemptsTo(ClickConfirmAndSend.now())
})

Then(
  'the confirmation page is displayed with an application reference',
  async function () {
    await this.actor.attemptsTo(
      EnsureConfirmationPage.isDisplayedWithApplicationReference()
    )
  }
)

Given('the user is on any page within the service', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
})

When('the user clicks the Defra account link in the header', async function () {
  await this.actor.attemptsTo(ClickDefraAccount.now())
})

Then(
  'the user is taken to the Defra account management page',
  async function () {
    await this.actor.attemptsTo(EnsureDefraAccountPage.isDisplayed())
  }
)

Given('the user is on the Defra account management page', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(ClickDefraAccount.now())
  await this.actor.attemptsTo(EnsureDefraAccountPage.isDisplayed())
})

When(
  'the user clicks {string} in the {string} section',
  async function (linkText, sectionText) {
    if (
      linkText === 'Get Permission For Marine Work' &&
      sectionText === 'Your services'
    ) {
      await this.actor.attemptsTo(ClickMarineLicensingService.now())
    }
  }
)

Then(
  'the user is returned to the marine licensing service dashboard',
  async function () {
    await this.actor.attemptsTo(EnsureDashboardPage.isDisplayed())
  }
)

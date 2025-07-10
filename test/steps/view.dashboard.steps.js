import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickConfirmAndSend,
  ClickProjectsHome,
  ClickReviewAndSend,
  CompleteAllTasks,
  EnsureDashboardDisplaysNotification,
  EnsureEmptyStateMessage,
  EnsurePageHeading,
  Navigate,
  NavigateToDashboard,
  RememberTheExemptionReferenceNumber
} from '~/test-infrastructure/screenplay'

Given('the user has not submitted any notifications', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
})

Given('a user has submitted an exemption notification', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
  )
  await this.actor.attemptsTo(CompleteAllTasks.now())
  await this.actor.attemptsTo(ClickReviewAndSend.now())
  await this.actor.attemptsTo(ClickConfirmAndSend.now())
  await this.actor.attemptsTo(RememberTheExemptionReferenceNumber.now())
})

When('the user clicks on Projects home in the header', async function () {
  await this.actor.attemptsTo(ClickProjectsHome.now())
})

When('the user navigates to the dashboard', async function () {
  await this.actor.attemptsTo(NavigateToDashboard.now())
})

Then(
  'the dashboard displays the submitted notification correctly',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Your projects'))
    await this.actor.attemptsTo(EnsureDashboardDisplaysNotification.correctly())
  }
)

Then('the message {string} is shown', async function (expectedMessage) {
  await this.actor.attemptsTo(EnsureEmptyStateMessage.shows(expectedMessage))
})

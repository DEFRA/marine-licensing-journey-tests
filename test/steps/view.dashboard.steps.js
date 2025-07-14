import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickProjectsHome,
  EnsureDashboardDisplaysNotification,
  EnsureDashboardSortOrder,
  EnsureEmptyStateMessage,
  Navigate,
  NavigateToDashboard,
  SignIn,
  SignOut,
  SubmitAnExemptionNotification
} from '~/test-infrastructure/screenplay'
import CompleteProjectName from '~/test-infrastructure/screenplay/tasks/complete.project.name'

Given('the user has not submitted any notifications', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(SignIn.now())
})

Given('a user has submitted an exemption notification', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  await this.actor.attemptsTo(SubmitAnExemptionNotification.now())
})

Given(
  'the user has multiple notifications with different statuses and names',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    await this.actor.attemptsTo(SubmitAnExemptionNotification.now())
    await this.actor.attemptsTo(SignOut.now())
    await this.actor.attemptsTo(SubmitAnExemptionNotification.now())
    await this.actor.attemptsTo(SignOut.now())
    await this.actor.attemptsTo(SubmitAnExemptionNotification.now())
    await this.actor.attemptsTo(SignOut.now())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(SignIn.now())
    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(CompleteProjectName.now())
  }
)

When('the user clicks on Projects home in the header', async function () {
  await this.actor.attemptsTo(ClickProjectsHome.now())
})

When('the user navigates to the dashboard', async function () {
  await this.actor.attemptsTo(NavigateToDashboard.now())
})

Then(
  'the dashboard displays the submitted notification correctly',
  async function () {
    await this.actor.attemptsTo(EnsureDashboardDisplaysNotification.now())
  }
)

Then('the message {string} is shown', async function (expectedMessage) {
  await this.actor.attemptsTo(EnsureEmptyStateMessage.shows(expectedMessage))
})

Then(
  'the notifications are sorted by status with drafts first then by project name',
  async function () {
    await this.actor.attemptsTo(EnsureDashboardSortOrder.now())
  }
)

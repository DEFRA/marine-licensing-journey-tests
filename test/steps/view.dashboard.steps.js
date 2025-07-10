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
  EnsureDashboardSortOrder,
  EnsureEmptyStateMessage,
  Navigate,
  NavigateToDashboard,
  RememberTheExemptionReferenceNumber,
  SignIn,
  SignOut
} from '~/test-infrastructure/screenplay'
import CompleteProjectName from '~/test-infrastructure/screenplay/tasks/complete.project.name'

Given('the user has not submitted any notifications', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
})

Given('a user has submitted an exemption notification', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  await submitAnExemptionNotification.call(this)
})

async function submitAnExemptionNotification() {
  this.actor.intendsTo(
    ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
  )
  await this.actor.attemptsTo(CompleteAllTasks.now())
  await this.actor.attemptsTo(ClickReviewAndSend.now())
  await this.actor.attemptsTo(ClickConfirmAndSend.now())
  await this.actor.attemptsTo(RememberTheExemptionReferenceNumber.now())
}

async function submitAnExemptionNotificationAfterSignIn() {
  this.actor.intendsTo(
    ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
  )
  await this.actor.attemptsTo(CompleteAllTasks.now())
  await this.actor.attemptsTo(ClickReviewAndSend.now())
  await this.actor.attemptsTo(ClickConfirmAndSend.now())
  await this.actor.attemptsTo(RememberTheExemptionReferenceNumber.now())
}

Given(
  'the user has multiple notifications with different statuses and names',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))

    await submitAnExemptionNotification.call(this)

    await this.actor.attemptsTo(SignOut.now())
    await submitAnExemptionNotificationAfterSignIn.call(this)

    await this.actor.attemptsTo(SignOut.now())
    await submitAnExemptionNotificationAfterSignIn.call(this)

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

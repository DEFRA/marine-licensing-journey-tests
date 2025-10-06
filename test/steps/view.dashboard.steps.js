import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickContinueLink,
  ClickProjectsHome,
  ClickViewDetailsLink,
  DeleteDraftNotification,
  EnsureDashboardSortOrder,
  EnsureEmptyStateMessage,
  EnsureNotificationRemoved,
  EnsureNotificationsAreDisplayedOnTheDashboard,
  EnsureThatProjectNameIsEmpty,
  EnsureViewDetailsPage,
  Navigate,
  NavigateToLink,
  SelectTheTask,
  SignIn,
  SignOut,
  SubmitAnExemptionNotification
} from '~/test-infrastructure/screenplay'
import CompleteProjectName from '~/test-infrastructure/screenplay/tasks/complete.project.name'
import DashboardPage from '~/test-infrastructure/pages/dashboard.page'

Given('the user has not submitted any notifications', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
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
    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(SignIn.now())
    await this.actor.attemptsTo(CompleteProjectName.now())
  }
)

Given('the user has a draft exemption notification', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
  )
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SignOut.now())
})

When(
  'the user clicks view details for the submitted notification on the dashboard',
  async function () {
    await this.actor.attemptsTo(ClickProjectsHome.now())
    await this.actor.attemptsTo(
      EnsureNotificationsAreDisplayedOnTheDashboard.correctly()
    )
    await this.actor.attemptsTo(
      ClickViewDetailsLink.forLastCompletedExemption()
    )
  }
)

When('the user navigates to the dashboard', async function () {
  await this.actor.attemptsTo(NavigateToLink.to(DashboardPage.url))
})

When(
  'the user continues the notification from the dashboard and reenters the project name task',
  async function () {
    await this.actor.attemptsTo(SignIn.now())
    await this.actor.attemptsTo(NavigateToLink.to(DashboardPage.url))
    await this.actor.attemptsTo(
      ClickContinueLink.forExemptionWithProjectName(
        this.actor.recalls('exemption').projectName
      )
    )
    await this.actor.attemptsTo(SelectTheTask.withName('Project name'))
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

When(
  'the user deletes the draft notification from the dashboard',
  async function () {
    await this.actor.attemptsTo(SignIn.now())
    await this.actor.attemptsTo(NavigateToLink.to(DashboardPage.url))
    await this.actor.attemptsTo(
      DeleteDraftNotification.withProjectName(
        this.actor.recalls('exemption').projectName
      )
    )
  }
)

When('the user starts a new notification', async function () {
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(SignIn.now())
})

Then('the project name is not pre-populated', async function () {
  await this.actor.attemptsTo(EnsureThatProjectNameIsEmpty.now())
})

Then('the notification is removed from the dashboard', async function () {
  await this.actor.attemptsTo(
    EnsureNotificationRemoved.withProjectName(
      this.actor.recalls('exemption').projectName
    )
  )
  await this.actor.attemptsTo(
    EnsureEmptyStateMessage.shows('You currently have no projects.')
  )
})

Then(
  'the user is able to view the notification in a summary format',
  async function () {
    await this.actor.attemptsTo(EnsureViewDetailsPage.showsAllAnswers())
  }
)

Then(
  'the notifications are displayed with the correct information',
  async function () {
    await this.actor.attemptsTo(
      EnsureNotificationsAreDisplayedOnTheDashboard.correctly()
    )
  }
)

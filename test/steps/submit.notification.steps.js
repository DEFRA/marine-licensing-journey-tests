import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import DefraAccountPage from '~/test-infrastructure/pages/defra.account.page'
import HeaderPage from '~/test-infrastructure/pages/header.page'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  Click,
  ClickConfirmAndSend,
  ClickReviewAndSend,
  CompleteAllTasks,
  CompleteProjectName,
  EnsureConfirmationPage,
  Navigate
} from '~/test-infrastructure/screenplay'
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
  'the confirmation page is displayed with an application reference and survey link',
  async function () {
    await this.actor.attemptsTo(
      EnsureConfirmationPage.isDisplayedWithApplicationReference()
    )
  }
)

Given(
  'the user is on any page within the service apart from the project name page',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(ApplyForExemption.withValidProjectName())
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
  }
)

When('the user clicks the Defra account link in the header', async function () {
  await this.actor.attemptsTo(Click.on(HeaderPage.locators.defraAccountLink))
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
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(Click.on(HeaderPage.locators.defraAccountLink))
  await this.actor.attemptsTo(EnsureDefraAccountPage.isDisplayed())
})

When(
  'the user clicks {string} in the {string} section',
  async function (linkText, sectionText) {
    if (
      linkText === 'Get Permission For Marine Work' &&
      sectionText === 'Your services'
    ) {
      await this.actor.attemptsTo(
        Click.on(DefraAccountPage.locators.marineLicensingServiceLink)
      )
    }
  }
)

Then(
  'the user is returned to the marine licensing service dashboard',
  async function () {
    await this.actor.attemptsTo(EnsureDashboardPage.isDisplayed())
  }
)

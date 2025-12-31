import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickReviewAndSend,
  CompleteAllTasks,
  EnsureCheckYourAnswersPage,
  EnsureEmptyStateMessage,
  EnsurePageHeading,
  EnsureProjectSummaryCard,
  Navigate
} from '~/test-infrastructure/screenplay'
import EnsureMcmsContextCardDisplaysOnlyProjectName from '~/test-infrastructure/screenplay/interactions/ensure.mcms.context.card.displays.only.project.name.js'

Given(
  'a second notification is started with valid MCMS context after completing a first notification',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))

    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(CompleteAllTasks.now())
    await this.actor.attemptsTo(ClickReviewAndSend.now())
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )

    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  }
)

Given(
  'a notification is started with MCMS context {string}',
  async function (iatQueryString) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))

    const exemption =
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
        .data

    exemption.iatContext = null
    exemption.rawIatQueryString = iatQueryString

    this.actor.remembers('exemption', exemption)
    await this.actor.attemptsTo(Navigate.now())
  }
)

When(
  'all tasks are completed for a circular site using WGS84 coordinates and review and send is clicked',
  async function () {
    await this.actor.attemptsTo(CompleteAllTasks.now())
    await this.actor.attemptsTo(ClickReviewAndSend.now())
  }
)

Then(
  'the project summary card is displayed in full on the check your answers page',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
    await this.actor.attemptsTo(
      EnsureProjectSummaryCard.isDisplayedWithIatInformation()
    )
  }
)

Then(
  'the project summary card only contains the project name',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
    await this.actor.attemptsTo(
      EnsureMcmsContextCardDisplaysOnlyProjectName.now()
    )
  }
)

Then('the user is redirected to the dashboard', async function () {
  await this.actor.attemptsTo(
    EnsureEmptyStateMessage.shows('You currently have no projects.')
  )
})

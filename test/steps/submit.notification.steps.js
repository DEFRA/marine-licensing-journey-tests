import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickConfirmAndSend,
  ClickReviewAndSend,
  CompleteAllTasks,
  EnsureConfirmationPage
} from '~/test-infrastructure/screenplay'

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

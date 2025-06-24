import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickReviewAndSend,
  CompleteActivityDates,
  CompleteActivityDescription,
  CompleteProjectName,
  CompletePublicRegisterTask,
  CompleteSiteDetails,
  EnsureCheckYourAnswersPage,
  EnsurePageHeading,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

Given(
  'the user has completed all the tasks on the task list for a circular site using WGS84 coordinates',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withAllTasksCompleted().andSiteDetails.withCircleWGS84()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Activity description'))
    await this.actor.attemptsTo(CompleteActivityDescription.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Activity dates'))
    await this.actor.attemptsTo(CompleteActivityDates.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(CompleteSiteDetails.andSave())
    await this.actor.attemptsTo(SelectTheTask.withName('Public register'))
    await this.actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
)

When('the user clicks Review and send', async function () {
  await this.actor.attemptsTo(ClickReviewAndSend.now())
})

Then(
  'the user is able to see all their answers in a summary format',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
  }
)

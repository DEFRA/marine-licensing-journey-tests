import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickReviewAndSend,
  CompleteAllTasks
} from '~/test-infrastructure/screenplay'
import {
  ChangeActivityDetails,
  ChangeDataSharingConsent,
  ChangeProjectName,
  ChangeProvidingSiteLocation,
  ChangeSiteDetails,
  EnsureCheckYourAnswersPage,
  EnsurePageHeading
} from '~/test-infrastructure/screenplay/interactions'

Given('a user has reached the check your answers page', async function () {
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
})

Given(
  'a user has reached the check your answers page with multiple sites',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forRandomMultiSiteWithSameActivityDatesAndDescriptions()
    )
    await this.actor.attemptsTo(CompleteAllTasks.now())
    await this.actor.attemptsTo(ClickReviewAndSend.now())
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
  }
)

Given(
  'a user has reached the check your answers page with file uploaded sites',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forMultiSiteKMLUploadWithSameActivityDatesAndDescriptions()
    )
    await this.actor.attemptsTo(CompleteAllTasks.now())
    await this.actor.attemptsTo(ClickReviewAndSend.now())
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
  }
)

When(
  'the user changes the project name from check your answers',
  async function () {
    await this.actor.attemptsTo(ChangeProjectName.fromCheckYourAnswers())
  }
)

When(
  'the user selects change for providing the site location from check your answers',
  async function () {
    await this.actor.attemptsTo(
      ChangeProvidingSiteLocation.fromCheckYourAnswers()
    )
  }
)

When(
  'the user changes the activity details from check your answers',
  async function () {
    await this.actor.attemptsTo(ChangeActivityDetails.fromCheckYourAnswers())
  }
)

When(
  'the user changes site {int} details from check your answers',
  async function (siteNumber) {
    await this.actor.attemptsTo(
      ChangeSiteDetails.fromCheckYourAnswers(siteNumber)
    )
  }
)

When(
  'the user changes the data sharing consent from check your answers',
  async function () {
    await this.actor.attemptsTo(ChangeDataSharingConsent.fromCheckYourAnswers())
  }
)

When('the user changes a site name from check your answers', async function () {
  await this.actor.attemptsTo(ChangeSiteDetails.fromCheckYourAnswers(1))
})

Then(
  'the project name is updated on the check your answers page',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
  }
)

Then('the user is taken to the review site details page', async function () {
  await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
})

Then(
  'the user is returned to the check your answers page with updated activity details',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
  }
)

Then(
  'the user is returned to the check your answers page with updated site {int} details',
  async function (siteNumber) {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
  }
)

Then(
  'the data sharing consent is updated on the check your answers page',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
  }
)

Then(
  'the site name is updated on the check your answers page',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Check your answers before sending your information')
    )
    await this.actor.attemptsTo(EnsureCheckYourAnswersPage.showsAllAnswers())
  }
)

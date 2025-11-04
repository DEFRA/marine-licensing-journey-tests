import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompleteSiteDetails,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'
import {
  ChangeProjectLevelActivityDates,
  ChangeSiteLevelActivityDates,
  EnsureActivityDetailsCard,
  EnsureIndividualSiteActivityDetails,
  EnsurePageHeading
} from '~/test-infrastructure/screenplay/interactions'

Given(
  'a user has reached the review site details page with project level activity dates',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteKMLUploadWithSameActivityDatesAndDescriptions()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(CompleteSiteDetails.now())
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  }
)

When('the user changes the project level activity dates', async function () {
  await this.actor.attemptsTo(ChangeProjectLevelActivityDates.now())
})

Then(
  'the activity dates are updated on the review site details page',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureActivityDetailsCard.isCorrect())
  }
)

Given(
  'a user has reached the review site details page with site level activity dates',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteKMLUploadWithDifferentActivityDatesAndSameDescriptions()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(CompleteSiteDetails.now())
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  }
)

When(
  'the user changes the activity dates for site {int}',
  async function (siteNumber) {
    await this.actor.attemptsTo(
      ChangeSiteLevelActivityDates.forSite(siteNumber)
    )
  }
)

Then(
  'the activity dates are updated on the review site details page for site {int}',
  async function (siteNumber) {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(
      EnsureIndividualSiteActivityDetails.forSite(siteNumber)
    )
  }
)

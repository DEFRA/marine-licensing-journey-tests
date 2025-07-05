import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickSaveAndContinue,
  CompleteProjectName,
  CompleteSiteDetails,
  EnsurePageHeading,
  EnsureSiteDetails,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

Given(
  'the user wants to apply for an exemption for a circular site using WGS84 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forACircleWithWGS84Coordinates()
    )
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using OSGB36 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forACircleWithOSGB36Coordinates()
    )
  }
)

Given(
  'the user wants to apply for an exemption for a polygonal site using WGS84 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forABoundaryWithWGS84Coordinates()
    )
  }
)

Given(
  'the user wants to apply for an exemption for a polygonal site using OSGB36 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forABoundaryWithOSGB36Coordinates()
    )
  }
)

Given('reaches the site details task', async function () {
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

When('the site details task is completed', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

Then('the site details review page shows the site details', async function () {
  await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  await this.actor.attemptsTo(ClickSaveAndContinue.now())
})

Then(
  'the Enter the width of the circular site page is displayed',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Enter the width of the circular site in metres')
    )
  }
)

Then(
  'the Which coordinate system do you want to use page is displayed',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Which coordinate system do you want to use?')
    )
  }
)

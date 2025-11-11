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
  ChangeBoundaryCoordinates,
  ChangeBoundarySiteCoordinateSystem,
  ChangeFromBoundaryToCircularSite,
  EnsurePageHeading,
  EnsureSiteDetails
} from '~/test-infrastructure/screenplay/interactions'

Given(
  'a user has reached the review site details page with a boundary site using WGS84 coordinates',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forABoundaryWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(CompleteSiteDetails.now())
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  }
)

When('the user changes from boundary to circular site', async function () {
  await this.actor.attemptsTo(ChangeFromBoundaryToCircularSite.now())
})

Then(
  'the site is converted to a circular site on the review site details page',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

When(
  'the user changes the coordinate system for the boundary site to OSGB36',
  async function () {
    await this.actor.attemptsTo(ChangeBoundarySiteCoordinateSystem.now())
  }
)

Then(
  'the coordinate system is updated on the review site details page for the boundary site',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

When('the user changes the boundary coordinates', async function () {
  await this.actor.attemptsTo(ChangeBoundaryCoordinates.now())
})

Then(
  'the boundary coordinates are updated on the review site details page',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

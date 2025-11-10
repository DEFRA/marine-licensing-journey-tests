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
  ChangeFromCircularToPolygonSite,
  ChangeCircularSiteCoordinateSystem,
  ChangeCentrePointCoordinates,
  ChangeCircleWidth,
  EnsurePageHeading,
  EnsureSiteDetails
} from '~/test-infrastructure/screenplay/interactions'

Given(
  'a user has reached the review site details page with a circular site',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forACircleWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(CompleteSiteDetails.now())
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  }
)

When('the user changes from circular to polygon site', async function () {
  await this.actor.attemptsTo(ChangeFromCircularToPolygonSite.now())
})

Then(
  'the site is converted to a polygon site on the review site details page',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

When(
  'the user changes the coordinate system for the circular site',
  async function () {
    await this.actor.attemptsTo(ChangeCircularSiteCoordinateSystem.now())
  }
)

Then(
  'the coordinate system is updated on the review site details page',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

When('the user changes the centre point coordinates', async function () {
  await this.actor.attemptsTo(ChangeCentrePointCoordinates.now())
})

Then(
  'the centre point coordinates are updated on the review site details page',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

When('the user changes the circle width', async function () {
  await this.actor.attemptsTo(ChangeCircleWidth.now())
})

Then(
  'the circle width is updated on the review site details page',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  }
)

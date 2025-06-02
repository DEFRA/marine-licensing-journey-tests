import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  CompleteProjectName,
  CompleteSiteDetails,
  EnsurePageHeading,
  Navigate,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

Given(
  'the user wants to apply for an exemption for a circular site using WGS84 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.withCircleWGS84()
    )
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using OSGB36 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.withCircleOSGB36()
    )
  }
)

Given(
  'the user wants to apply for an exemption for a polygonal site using WGS84 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.withBoundaryWGS84()
    )
  }
)

Given(
  'the user wants to apply for an exemption for a polygonal site using OSGB36 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.withBoundaryOSGB36()
    )
  }
)

Given('reaches the site details task', async function () {
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

When('the site details task is completed', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

Then(
  'the Which coordinate system do you want to use page is displayed',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Which coordinate system do you want to use?')
    )
  }
)

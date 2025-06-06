import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import EnterCoordinatesCentrePointPage from '~/test-infrastructure/pages/enter.coordinates.centre.point'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page'

import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickSaveAndContinue,
  CompleteProjectName,
  EnsureErrorDisplayed,
  EnsurePageHeading,
  EnsureThatCoordinateEntryMethodSelected,
  EnsureThatSiteTypeSelected,
  Navigate,
  NavigateToSiteDetailsPage,
  SelectTheTask
} from '~/test-infrastructure/screenplay'

Given('a user is providing site details', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(ApplyForExemption.withValidProjectName())
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp.now())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

Given(
  'the user wants to apply for an exemption for a circular site using {string} latitude',
  function (latitude) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.withCircleWGS84()
        .latitude(latitude)
    )
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} longitude',
  function (longitude) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.withCircleWGS84()
        .longitude(longitude)
    )
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} eastings',
  function (eastings) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.withCircleOSGB36()
        .eastings(eastings)
    )
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} northings',
  function (northings) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.withCircleOSGB36()
        .northings(northings)
    )
  }
)

Given(
  'the "How do you want to provide the site location?" page has been reached',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('How do you want to provide the site location?')
    )
  }
)

Given(
  'the "How do you want to enter the coordinates?" page has been reached',
  async function () {
    await this.actor.attemptsTo(
      NavigateToSiteDetailsPage.coordinatesEntryMethod()
    )
    await this.actor.attemptsTo(
      EnsurePageHeading.is('How do you want to enter the coordinates?')
    )
  }
)

Given(
  'the "Which coordinate system do you want to use?" page has been reached',
  async function () {
    await this.actor.attemptsTo(NavigateToSiteDetailsPage.coordinateSystem())
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Which coordinate system do you want to use?')
    )
  }
)

Given('the WGS84 coordinate system has been selected', async function () {
  await this.actor.attemptsTo(NavigateToSiteDetailsPage.andSelectWGS84())
})

Given(
  'the enter WGS84 coordinates at the centre point of the site page is displayed',
  async function () {
    await this.actor.attemptsTo(
      NavigateToSiteDetailsPage.enterWGS84Coordinates()
    )
    await this.actor.attemptsTo(
      EnsurePageHeading.is(
        'Enter the coordinates at the centre point of the site'
      )
    )
  }
)

Given(
  'the enter OSGB36 coordinates at the centre point of the site page is displayed',
  async function () {
    await this.actor.attemptsTo(
      NavigateToSiteDetailsPage.enterOSGB36Coordinates()
    )
    await this.actor.attemptsTo(
      EnsurePageHeading.is(
        'Enter the coordinates at the centre point of the site'
      )
    )
  }
)

When(
  'the Continue button is clicked without selecting a site location option',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'the Continue button is clicked without selecting a coordinate entry method',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'the Continue button is clicked without selecting a coordinate system',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'the Continue button is clicked with providing any coordinates',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

Then(
  'the coordinates type error: {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        HowDoYouWantToProvideCoordinatesPage.coordinatesTypeError,
        errorMessage
      )
    )
  }
)

Then(
  'the coordinates entry method error: {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        HowDoYouWantToEnterTheCoordinatesPage.coordinatesEntryError,
        errorMessage
      )
    )
  }
)

Then(
  'the coordinates system error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        WhatCoordinateSystemPage.coordinatesSystemError,
        errorMessage
      )
    )
  }
)

Then('the manual coordinate entry method is selected', async function () {
  await this.actor.attemptsTo(
    EnsureThatCoordinateEntryMethodSelected.is('enter-manually')
  )
})

Then('the circular site option is selected', async function () {
  await this.actor.attemptsTo(EnsureThatSiteTypeSelected.is('circle'))
})

Then('the latitude error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(
    EnsureErrorDisplayed.is(
      EnterCoordinatesCentrePointPage.latitudeError,
      errorMessage
    )
  )
})

Then(
  'the longitude error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        EnterCoordinatesCentrePointPage.longitudeError,
        errorMessage
      )
    )
  }
)

When('an invalid latitude of {string} is entered', async function (latitude) {
  await this.actor.attemptsTo(
    EnterCoordinatesCentrePointPage.enterLatitude(latitude)
  )
})

Then('the eastings error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(
    EnsureErrorDisplayed.is(
      EnterCoordinatesCentrePointPage.eastingsError,
      errorMessage
    )
  )
})

Then(
  'the northings error {string} is displayed',
  async function (errorMessage) {
    await this.actor.attemptsTo(
      EnsureErrorDisplayed.is(
        EnterCoordinatesCentrePointPage.northingsError,
        errorMessage
      )
    )
  }
)

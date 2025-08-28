import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import EnterCoordinatesCentrePointPage from '~/test-infrastructure/pages/enter.coordinates.centre.point'
import EnterMultipleCoordinatesPage from '~/test-infrastructure/pages/enter.multiple.coordinates.page'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page'
import WidthOfCircularSitePage from '~/test-infrastructure/pages/width.of.circular.site.page'

import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickAddAnotherPoint,
  ClickRemovePointButton,
  ClickSaveAndContinue,
  CompleteProjectName,
  ContinueFromBeforeYouStartSiteDetailsPage,
  EnsureCoordinateError,
  EnsureErrorDisplayed,
  EnsureErrorNotDisplayed,
  EnsureMultipleErrorsAreDisplayed,
  EnsurePageHeading,
  EnsureThatMultipleSiteOptionSelected,
  EnsureThatSiteTypeSelected,
  Navigate,
  NavigateToSiteDetailsPage,
  SelectTheTask,
  SetCoordinateField
} from '~/test-infrastructure/screenplay'

Given('a user is providing site details', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  this.actor.intendsTo(
    ApplyForExemption.withValidProjectName().andSiteDetails.forACircleWithWGS84Coordinates()
  )
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
  await this.actor.attemptsTo(ContinueFromBeforeYouStartSiteDetailsPage.now())
})

Given(
  'the user wants to apply for an exemption for a circular site using {string} latitude',
  function (latitude) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forACircleWithWGS84Coordinates()
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
        .andSiteDetails.forACircleWithWGS84Coordinates()
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
        .andSiteDetails.forACircleWithOSGB36Coordinates()
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
        .andSiteDetails.forACircleWithOSGB36Coordinates()
        .northings(northings)
    )
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} width',
  function (width) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forACircleWithWGS84Coordinates()
        .width(width)
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
      NavigateToSiteDetailsPage.enterWGS84CoordinatesPageOnly()
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
      NavigateToSiteDetailsPage.enterOSGB36CoordinatesPageOnly()
    )
    await this.actor.attemptsTo(
      EnsurePageHeading.is(
        'Enter the coordinates at the centre point of the site'
      )
    )
  }
)

Given(
  'the "Enter the width of the circular site in metres" is displayed',
  async function () {
    await this.actor.attemptsTo(
      NavigateToSiteDetailsPage.enterWGS84Coordinates()
    )
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Enter the width of the circular site in metres')
    )
  }
)

Given(
  'errors have been generated for the first {int} coordinate points',
  async function (numberOfPoints) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forATriangleWithOSGB36Coordinates()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(ContinueFromBeforeYouStartSiteDetailsPage.now())
    await this.actor.attemptsTo(
      NavigateToSiteDetailsPage.enterPolygonOSGB36CoordinatesPageOnly()
    )

    const defaultPoints = 3
    const additionalPointsNeeded = numberOfPoints - defaultPoints
    for (let i = 0; i < additionalPointsNeeded; i++) {
      await this.actor.attemptsTo(ClickAddAnotherPoint.now())
    }

    await this.actor.attemptsTo(ClickSaveAndContinue.now())
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

When('the Continue button is clicked', async function () {
  await this.actor.attemptsTo(ClickSaveAndContinue.now())
})

When('the Add another point button is clicked', async function () {
  await this.actor.attemptsTo(ClickAddAnotherPoint.now())
})

When(
  'the Remove button for Point {int} is clicked',
  async function (pointNumber) {
    await this.actor.attemptsTo(ClickRemovePointButton.forPoint(pointNumber))
  }
)

When(
  'the Continue button is clicked without providing any width',
  async function () {
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

When(
  'the {string} input for {string} is set to {string}',
  async function (fieldType, point, invalidValue) {
    await this.actor.attemptsTo(
      SetCoordinateField.withValue(fieldType, point, invalidValue)
    )
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

Then('the multiple sites option is selected', async function () {
  await this.actor.attemptsTo(EnsureThatMultipleSiteOptionSelected.is('no'))
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

Then('the width error {string} is displayed', async function (errorMessage) {
  await this.actor.attemptsTo(
    EnsureErrorDisplayed.is(WidthOfCircularSitePage.widthError, errorMessage)
  )
})

Then(
  'the {string} error for {string} is {string}',
  async function (fieldType, point, expectedError) {
    await this.actor.attemptsTo(
      EnsureCoordinateError.forField(fieldType, point, expectedError)
    )
  }
)

Then(
  'the following validation errors are displayed:',
  async function (dataTable) {
    const errors = dataTable.hashes()

    const hasLatLongFields = errors.some(
      (error) =>
        (error.Field || error.field)?.includes('latitude') ||
        (error.Field || error.field)?.includes('longitude')
    )

    if (hasLatLongFields) {
      await this.actor.attemptsTo(
        EnsureMultipleErrorsAreDisplayed.forPolygonWGS84Coordinates(errors)
      )
    } else {
      await this.actor.attemptsTo(
        EnsureMultipleErrorsAreDisplayed.forPolygonOSGB36Coordinates(errors)
      )
    }
  }
)

Then(
  'the point {int} eastings error should not exist',
  async function (pointNumber) {
    const errorLocator = EnterMultipleCoordinatesPage.eastingsError(
      pointNumber - 1
    )
    await this.actor.attemptsTo(
      EnsureErrorNotDisplayed.is(errorLocator, `point ${pointNumber}`)
    )
  }
)

Then(
  'the point {int} northings error should not exist',
  async function (pointNumber) {
    const errorLocator = EnterMultipleCoordinatesPage.northingsError(
      pointNumber - 1
    )
    await this.actor.attemptsTo(
      EnsureErrorNotDisplayed.is(errorLocator, `point ${pointNumber}`)
    )
  }
)

Then(
  'the point {int} latitude error should not exist',
  async function (pointNumber) {
    const errorLocator = EnterMultipleCoordinatesPage.latitudeError(
      pointNumber - 1
    )
    await this.actor.attemptsTo(
      EnsureErrorNotDisplayed.is(errorLocator, `point ${pointNumber}`)
    )
  }
)

Then(
  'the point {int} longitude error should not exist',
  async function (pointNumber) {
    const errorLocator = EnterMultipleCoordinatesPage.longitudeError(
      pointNumber - 1
    )
    await this.actor.attemptsTo(
      EnsureErrorNotDisplayed.is(errorLocator, `point ${pointNumber}`)
    )
  }
)

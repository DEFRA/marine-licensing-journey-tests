import { Given, Then, When } from '@cucumber/cucumber'
import { browser } from '@wdio/globals'
import {
  Actor,
  ApplyForExemption,
  BrowseTheWeb,
  ClickButton,
  ClickSaveAndContinue,
  CompleteProjectName,
  CompleteSiteDetails,
  ContinueFromBeforeYouStartSiteDetailsPage,
  EnsurePageHeading,
  EnsureSiteDetails,
  Navigate,
  NavigateToSiteDetailsPage,
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
  'an exemption for a circular site using OSGB36 coordinates with eastings {string}, northings {string} and width {string} metres',
  function (eastings, northings, circleWidth) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forACircleWithOSGB36Coordinates()
        .withEastings(eastings)
        .withNorthings(northings)
        .withWidth(circleWidth)
    )
  }
)

Given('a user is providing site details for multiple sites', function () {
  this.actor = new Actor('Alice')
  this.actor.can(BrowseTheWeb.using(browser))
  this.actor.intendsTo(
    ApplyForExemption.withValidProjectName().andSiteDetails.forMultipleSites()
  )
})

Given(
  'an exemption for a circular site using WGS84 coordinates with latitude {string}, longitude {string} and width {string} metres',
  function (latitude, longitude, circleWidth) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forACircleWithWGS84Coordinates()
        .withLatitude(latitude)
        .withLongitude(longitude)
        .withWidth(circleWidth)
    )
  }
)

Given(
  'the user wants to apply for an exemption for a polygonal site using WGS84 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forATriangleWithWGS84Coordinates()
    )
  }
)

Given(
  'the user wants to apply for an exemption for a polygonal site using OSGB36 coordinates',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forATriangleWithOSGB36Coordinates()
    )
  }
)

Given(
  'an exemption for a triangular site using WGS84 coordinates with point 1 {string}, {string}, point 2 {string}, {string} and point 3 {string}, {string}',
  function (lat1, lng1, lat2, lng2, lat3, lng3) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forATriangleWithWGS84Coordinates()
        .withCoordinatePoints([
          { latitude: lat1, longitude: lng1 },
          { latitude: lat2, longitude: lng2 },
          { latitude: lat3, longitude: lng3 }
        ])
    )
  }
)

Given(
  'an exemption for a triangular site using OSGB36 coordinates with point 1 {string}, {string}, point 2 {string}, {string} and point 3 {string}, {string}',
  function (east1, north1, east2, north2, east3, north3) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forATriangleWithOSGB36Coordinates()
        .withCoordinatePoints([
          { eastings: east1, northings: north1 },
          { eastings: east2, northings: north2 },
          { eastings: east3, northings: north3 }
        ])
    )
  }
)

Given(
  'an exemption for a quadrilateral site using WGS84 coordinates with point 1 {string}, {string}, point 2 {string}, {string}, point 3 {string}, {string} and point 4 {string}, {string}',
  function (lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forAQuadrilateralWithWGS84Coordinates()
        .withCoordinatePoints([
          { latitude: lat1, longitude: lng1 },
          { latitude: lat2, longitude: lng2 },
          { latitude: lat3, longitude: lng3 },
          { latitude: lat4, longitude: lng4 }
        ])
    )
  }
)

Given(
  'an exemption for a quadrilateral site using OSGB36 coordinates with point 1 {string}, {string}, point 2 {string}, {string}, point 3 {string}, {string} and point 4 {string}, {string}',
  function (east1, north1, east2, north2, east3, north3, east4, north4) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forAQuadrilateralWithOSGB36Coordinates()
        .withCoordinatePoints([
          { eastings: east1, northings: north1 },
          { eastings: east2, northings: north2 },
          { eastings: east3, northings: north3 },
          { eastings: east4, northings: north4 }
        ])
    )
  }
)

Given(
  'an exemption for a pentagon site using WGS84 coordinates with point 1 {string}, {string}, point 2 {string}, {string}, point 3 {string}, {string}, point 4 {string}, {string} and point 5 {string}, {string}',
  function (lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4, lat5, lng5) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forAPentagonWithWGS84Coordinates()
        .withCoordinatePoints([
          { latitude: lat1, longitude: lng1 },
          { latitude: lat2, longitude: lng2 },
          { latitude: lat3, longitude: lng3 },
          { latitude: lat4, longitude: lng4 },
          { latitude: lat5, longitude: lng5 }
        ])
    )
  }
)

Given(
  'an exemption for a pentagon site using OSGB36 coordinates with point 1 {string}, {string}, point 2 {string}, {string}, point 3 {string}, {string}, point 4 {string}, {string} and point 5 {string}, {string}',
  function (
    east1,
    north1,
    east2,
    north2,
    east3,
    north3,
    east4,
    north4,
    east5,
    north5
  ) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forAPentagonWithOSGB36Coordinates()
        .withCoordinatePoints([
          { eastings: east1, northings: north1 },
          { eastings: east2, northings: north2 },
          { eastings: east3, northings: north3 },
          { eastings: east4, northings: north4 },
          { eastings: east5, northings: north5 }
        ])
    )
  }
)

Given('the site details task is reached', async function () {
  await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
  await this.actor.attemptsTo(CompleteProjectName.now())
  await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
})

When('the site details task is completed', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.now())
})

When('the triangular site coordinates are entered', async function () {
  await this.actor.attemptsTo(CompleteSiteDetails.coordinatesOnly())
})

When(
  'the triangular site coordinates are entered and continued to review',
  async function () {
    await this.actor.attemptsTo(CompleteSiteDetails.toReview())
  }
)

When(
  'the quadrilateral site coordinates are entered and continued to review',
  async function () {
    await this.actor.attemptsTo(
      new CompleteSiteDetails(false, false, true, true)
    )
  }
)

When(
  'the pentagon site coordinates are entered and continued to review',
  async function () {
    await this.actor.attemptsTo(
      new CompleteSiteDetails(false, false, true, true)
    )
  }
)

Then('the polygon coordinate entry page is displayed', async function () {
  await this.actor.attemptsTo(
    EnsurePageHeading.is(
      'Enter multiple sets of coordinates to mark the boundary of the site'
    )
  )
})

When(
  'the quadrilateral site coordinates are entered using add another point',
  async function () {
    await this.actor.attemptsTo(
      CompleteSiteDetails.coordinatesWithAddAnotherPoint()
    )
  }
)

When(
  'the pentagon site coordinates are entered using add another point',
  async function () {
    await this.actor.attemptsTo(
      CompleteSiteDetails.coordinatesWithAddAnotherPoint()
    )
  }
)

Given(
  'an exemption for a {int} point random polygon site using WGS84 coordinates',
  function (coordinateCount) {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName()
        .andSiteDetails.forARandomPolygonWithWGS84Coordinates()
        .withRandomCoordinateCount(coordinateCount)
    )
  }
)

When(
  'the {int} point random polygon coordinates are entered using add another point',
  async function (coordinateCount) {
    await this.actor.attemptsTo(
      CompleteSiteDetails.coordinatesWithAddAnotherPoint()
    )
  }
)

Then('the site details review page shows the site details', async function () {
  await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
  await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
  await this.actor.attemptsTo(ClickSaveAndContinue.now())
})

Then(
  'the site details review page shows the triangular site details',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

Then(
  'the polygon site details review page shows the correct site details',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
  }
)

Then(
  'the Enter the width of the circular site page is displayed',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is('Enter the width of the circular site in metres')
    )
  }
)

Then(
  'the Enter multiple sets of coordinates to mark the boundary of the site page is displayed',
  async function () {
    await this.actor.attemptsTo(
      EnsurePageHeading.is(
        'Enter multiple sets of coordinates to mark the boundary of the site'
      )
    )
  }
)

When(
  'the Continue button is clicked without providing any coordinates',
  async function () {
    await this.actor.attemptsTo(ClickButton.withText('Continue'))
  }
)

Given(
  'the Enter multiple sets of coordinates to mark the boundary of the site for OSGB36 coordinates page is displayed',
  async function () {
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
  }
)

Given(
  'the Enter multiple sets of coordinates to mark the boundary of the site for WGS84 coordinates page is displayed',
  async function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forATriangleWithWGS84Coordinates()
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await this.actor.attemptsTo(CompleteProjectName.now())
    await this.actor.attemptsTo(SelectTheTask.withName('Site details'))
    await this.actor.attemptsTo(ContinueFromBeforeYouStartSiteDetailsPage.now())
    await this.actor.attemptsTo(
      NavigateToSiteDetailsPage.enterPolygonWGS84CoordinatesPageOnly()
    )
  }
)

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
  'a user is providing mixed site details for multiple sites with separate activity dates and descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMixedMultipleSites()
    )
  }
)

Given(
  'a user is providing mixed site details for multiple sites with same activity dates and descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMixedMultipleSitesWithSameActivityDatesAndDescriptions()
    )
  }
)

Given(
  'a user is providing mixed site details for multiple sites with same activity dates and different descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMixedMultipleSitesWithSameActivityDatesAndDifferentDescriptions()
    )
  }
)

Given(
  'a user is providing mixed site details for multiple sites with different activity dates and same descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMixedMultipleSitesWithDifferentActivityDatesAndSameDescriptions()
    )
  }
)

Given(
  'a user is uploading a kml file with multiple sites with different activity dates and different descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteKMLUploadWithDifferentActivityDatesAndDifferentDescriptions()
    )
  }
)

Given(
  'a user is uploading a kml file with multiple sites with same activity dates and descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteKMLUploadWithSameActivityDatesAndDescriptions()
    )
  }
)

Given(
  'a user is uploading a kml file with multiple sites with different activity dates and same descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteKMLUploadWithDifferentActivityDatesAndSameDescriptions()
    )
  }
)

Given(
  'a user is uploading a kml file with multiple sites with same activity dates and different descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteKMLUploadWithSameActivityDatesAndDifferentDescriptions()
    )
  }
)

Given(
  'a user is uploading a shapefile with multiple sites with different activity dates and different descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteShapefileUploadWithDifferentActivityDatesAndDifferentDescriptions()
    )
  }
)

Given(
  'a user is uploading a shapefile with multiple sites with same activity dates and descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteShapefileUploadWithSameActivityDatesAndDescriptions()
    )
  }
)

Given(
  'a user is uploading a shapefile with multiple sites with different activity dates and same descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteShapefileUploadWithDifferentActivityDatesAndSameDescriptions()
    )
  }
)

Given(
  'a user is uploading a shapefile with multiple sites with same activity dates and different descriptions',
  function () {
    this.actor = new Actor('Alice')
    this.actor.can(BrowseTheWeb.using(browser))
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName().andSiteDetails.forMultiSiteShapefileUploadWithSameActivityDatesAndDifferentDescriptions()
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
  'the polygon site details review page shows the correct site details',
  async function () {
    await this.actor.attemptsTo(EnsurePageHeading.is('Review site details'))
    await this.actor.attemptsTo(EnsureSiteDetails.areCorrect())
    await this.actor.attemptsTo(ClickSaveAndContinue.now())
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

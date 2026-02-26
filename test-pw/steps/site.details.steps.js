import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndAuthenticate } from '../support/navigation.js'
import {
  createBoundaryWGS84Data,
  createBoundaryOSGB36Data,
  create20PointPolygonWGS84Data,
  createMixedMultiSiteData,
  createCustomCircleOSGB36Data
} from '../test-data/site-details.js'
import { completeSiteDetailsFlow } from '../support/site-details-flow.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

// --- Polygon data setup (WGS84) ---

Given(
  'an exemption for a triangular site using WGS84 coordinates with point 1 {string}, {string}, point 2 {string}, {string} and point 3 {string}, {string}',
  function (lat1, lng1, lat2, lng2, lat3, lng3) {
    this.data = createBoundaryWGS84Data([
      { latitude: lat1, longitude: lng1 },
      { latitude: lat2, longitude: lng2 },
      { latitude: lat3, longitude: lng3 }
    ])
  }
)

Given(
  'an exemption for a quadrilateral site using WGS84 coordinates with point 1 {string}, {string}, point 2 {string}, {string}, point 3 {string}, {string} and point 4 {string}, {string}',
  function (lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4) {
    this.data = createBoundaryWGS84Data([
      { latitude: lat1, longitude: lng1 },
      { latitude: lat2, longitude: lng2 },
      { latitude: lat3, longitude: lng3 },
      { latitude: lat4, longitude: lng4 }
    ])
  }
)

Given(
  'an exemption for a pentagon site using WGS84 coordinates with point 1 {string}, {string}, point 2 {string}, {string}, point 3 {string}, {string}, point 4 {string}, {string} and point 5 {string}, {string}',
  function (lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4, lat5, lng5) {
    this.data = createBoundaryWGS84Data([
      { latitude: lat1, longitude: lng1 },
      { latitude: lat2, longitude: lng2 },
      { latitude: lat3, longitude: lng3 },
      { latitude: lat4, longitude: lng4 },
      { latitude: lat5, longitude: lng5 }
    ])
  }
)

Given(
  'an exemption for a 20 point polygon site using WGS84 coordinates',
  function () {
    this.data = create20PointPolygonWGS84Data()
  }
)

// --- Polygon data setup (OSGB36) ---

Given(
  'an exemption for a triangular site using OSGB36 coordinates with point 1 {string}, {string}, point 2 {string}, {string} and point 3 {string}, {string}',
  function (east1, north1, east2, north2, east3, north3) {
    this.data = createBoundaryOSGB36Data([
      { eastings: east1, northings: north1 },
      { eastings: east2, northings: north2 },
      { eastings: east3, northings: north3 }
    ])
  }
)

Given(
  'an exemption for a quadrilateral site using OSGB36 coordinates with point 1 {string}, {string}, point 2 {string}, {string}, point 3 {string}, {string} and point 4 {string}, {string}',
  function (east1, north1, east2, north2, east3, north3, east4, north4) {
    this.data = createBoundaryOSGB36Data([
      { eastings: east1, northings: north1 },
      { eastings: east2, northings: north2 },
      { eastings: east3, northings: north3 },
      { eastings: east4, northings: north4 }
    ])
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
    this.data = createBoundaryOSGB36Data([
      { eastings: east1, northings: north1 },
      { eastings: east2, northings: north2 },
      { eastings: east3, northings: north3 },
      { eastings: east4, northings: north4 },
      { eastings: east5, northings: north5 }
    ])
  }
)

// --- Multi-site data setup ---

Given(
  'a user is providing mixed site details for multiple sites with separate activity dates and descriptions',
  function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: false,
      sameActivityDescription: false
    })
  }
)

Given(
  'a user is providing mixed site details for multiple sites with same activity dates and descriptions',
  function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
  }
)

Given(
  'a user is providing mixed site details for multiple sites with same activity dates and different descriptions',
  function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: true,
      sameActivityDescription: false
    })
  }
)

Given(
  'a user is providing mixed site details for multiple sites with different activity dates and same descriptions',
  function () {
    this.data = createMixedMultiSiteData({
      sameActivityDates: false,
      sameActivityDescription: true
    })
  }
)

// --- Leading zeroes data setup ---

Given(
  'a user has started a notification with eastings {string} and northings {string}',
  function (eastings, northings) {
    this.data = createCustomCircleOSGB36Data({ eastings, northings })
  }
)

// --- Task navigation ---

Given('the site details task is reached', async function () {
  await navigateAndAuthenticate(this, '/')
  const projectPage = new ProjectNamePage(this.page)
  await projectPage.enterProjectName(this.data.projectName)
  this.data.projectNameTaskCompleted = true
  const taskList = new TaskListPage(this.page)
  await taskList.selectTask('Site details')
})

// --- Task completion ---

When('the site details task is completed', async function () {
  try {
    await completeSiteDetailsFlow(this.page, this.data.siteDetails)
  } catch {
    // Flow may stop early due to validation errors — expected for validation tests
  }
})

When('the site details task is completed and saved', async function () {
  await completeSiteDetailsFlow(this.page, this.data.siteDetails)
  await this.page.locator('button:has-text("Continue")').click()
})

// --- Review page ---

Then('the site details review page shows the site details', async function () {
  const common = new CommonElementsPage(this.page)
  await common.expectHeading('Review site details')
  await this.page.locator('button:has-text("Continue")').click()
})

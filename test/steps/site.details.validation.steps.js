import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { navigateAndAuthenticate } from '../support/navigation.js'
import {
  createCircleWGS84Data,
  createBoundaryOSGB36Data,
  createBoundaryWGS84Data,
  createCustomCircleWGS84Data,
  createCustomCircleOSGB36Data
} from '../test-data/site-details.js'
import {
  selectProvideMethod,
  selectMoreThanOneSite,
  enterActivityDates,
  enterActivityDescription,
  selectCoordinatesEntryMethod,
  selectCoordinateSystem,
  navigateToPolygonOSGB36Page,
  navigateToPolygonWGS84Page
} from '../support/site-details-flow.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'

// --- "a user is providing site details" (self-contained: navigates past Before You Start) ---

Given('a user is providing site details', async function () {
  this.data = createCircleWGS84Data()
  await navigateAndAuthenticate(this, '/')
  const projectPage = new ProjectNamePage(this.page)
  await projectPage.enterProjectName(this.data.projectName)
  this.data.projectNameTaskCompleted = true
  const taskList = new TaskListPage(this.page)
  await taskList.selectTask('Site details')
  // Click Continue on "Before you start" page → lands on "How provide?" page
  await this.page.locator('a.govuk-button').click()
})

// --- Custom coordinate data setup Givens ---

Given(
  'the user wants to apply for an exemption for a circular site using {string} latitude',
  function (latitude) {
    this.data = createCustomCircleWGS84Data({ latitude })
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} longitude',
  function (longitude) {
    this.data = createCustomCircleWGS84Data({ longitude })
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} eastings',
  function (eastings) {
    this.data = createCustomCircleOSGB36Data({ eastings })
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} northings',
  function (northings) {
    this.data = createCustomCircleOSGB36Data({ northings })
  }
)

Given(
  'the user wants to apply for an exemption for a circular site using {string} width',
  function (width) {
    this.data = createCustomCircleWGS84Data({ width })
  }
)

// --- Navigation to specific pages (starting from "How provide?" page) ---

Given(
  'the "How do you want to provide the site location?" page has been reached',
  async function () {
    await expect(this.page.locator('h1')).toContainText(
      'How do you want to provide the site location?'
    )
  }
)

Given(
  'the "How do you want to enter the coordinates?" page has been reached',
  async function () {
    const site = this.data.siteDetails.sites[0]
    await selectProvideMethod(this.page, 'enter-manually')
    await selectMoreThanOneSite(this.page, false)
    await enterActivityDates(this.page, site.activityDates)
    await enterActivityDescription(this.page, site.activityDescription)
    await expect(this.page.locator('h1')).toContainText(
      'How do you want to enter the coordinates?'
    )
  }
)

Given(
  'the "Which coordinate system do you want to use?" page has been reached',
  async function () {
    const site = this.data.siteDetails.sites[0]
    await selectProvideMethod(this.page, 'enter-manually')
    await selectMoreThanOneSite(this.page, false)
    await enterActivityDates(this.page, site.activityDates)
    await enterActivityDescription(this.page, site.activityDescription)
    await selectCoordinatesEntryMethod(this.page, site.siteType)
    await expect(this.page.locator('h1')).toContainText(
      'Which coordinate system do you want to use?'
    )
  }
)

Given(
  'the enter WGS84 coordinates at the centre point of the site page is displayed',
  async function () {
    const site = this.data.siteDetails.sites[0]
    await selectProvideMethod(this.page, 'enter-manually')
    await selectMoreThanOneSite(this.page, false)
    await enterActivityDates(this.page, site.activityDates)
    await enterActivityDescription(this.page, site.activityDescription)
    await selectCoordinatesEntryMethod(this.page, 'circle')
    await selectCoordinateSystem(this.page, 'WGS84')
    await expect(this.page.locator('h1')).toContainText(
      'Enter the coordinates at the centre point of the site'
    )
  }
)

Given(
  'the enter OSGB36 coordinates at the centre point of the site page is displayed',
  async function () {
    const site = this.data.siteDetails.sites[0]
    await selectProvideMethod(this.page, 'enter-manually')
    await selectMoreThanOneSite(this.page, false)
    await enterActivityDates(this.page, site.activityDates)
    await enterActivityDescription(this.page, site.activityDescription)
    await selectCoordinatesEntryMethod(this.page, 'circle')
    await selectCoordinateSystem(this.page, 'OSGB36')
    await expect(this.page.locator('h1')).toContainText(
      'Enter the coordinates at the centre point of the site'
    )
  }
)

// --- Polygon page displayed (self-contained: creates data and navigates from scratch) ---

Given(
  'the Enter multiple sets of coordinates to mark the boundary of the site for OSGB36 coordinates page is displayed',
  async function () {
    this.data = createBoundaryOSGB36Data([
      { eastings: '432675', northings: '181310' },
      { eastings: '433000', northings: '181500' },
      { eastings: '432800', northings: '181700' }
    ])
    await navigateAndAuthenticate(this, '/')
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
    this.data.projectNameTaskCompleted = true
    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Site details')
    await navigateToPolygonOSGB36Page(this.page, this.data.siteDetails)
  }
)

Given(
  'the Enter multiple sets of coordinates to mark the boundary of the site for WGS84 coordinates page is displayed',
  async function () {
    this.data = createBoundaryWGS84Data([
      { latitude: '50.000000', longitude: '-1.000000' },
      { latitude: '50.001000', longitude: '-0.999000' },
      { latitude: '50.000500', longitude: '-0.999500' }
    ])
    await navigateAndAuthenticate(this, '/')
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
    this.data.projectNameTaskCompleted = true
    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Site details')
    await navigateToPolygonWGS84Page(this.page, this.data.siteDetails)
  }
)

// --- Error generation for polygon validation tests ---

Given(
  'errors have been generated for the first {int} coordinate points',
  async function (numberOfPoints) {
    this.data = createBoundaryOSGB36Data([
      { eastings: '432675', northings: '181310' },
      { eastings: '433000', northings: '181500' },
      { eastings: '432800', northings: '181700' }
    ])
    await navigateAndAuthenticate(this, '/')
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
    this.data.projectNameTaskCompleted = true
    const taskList = new TaskListPage(this.page)
    await taskList.selectTask('Site details')
    await navigateToPolygonOSGB36Page(this.page, this.data.siteDetails)

    const defaultPoints = 3
    for (let i = 0; i < numberOfPoints - defaultPoints; i++) {
      await this.page.locator('button:has-text("Add another point")').click()
    }
    await this.page.locator('button:has-text("Save and continue")').click()
  }
)

// --- Button click Whens ---

When(
  'the Continue button is clicked without selecting a site location option',
  async function () {
    await this.page
      .locator('button[type="submit"]:not([name="analytics"])')
      .click()
  }
)

When(
  'the Continue button is clicked without selecting a coordinate entry method',
  async function () {
    await this.page
      .locator('button[type="submit"]:not([name="analytics"])')
      .click()
  }
)

When(
  'the Continue button is clicked without selecting a coordinate system',
  async function () {
    await this.page
      .locator('button[type="submit"]:not([name="analytics"])')
      .click()
  }
)

When(
  'the Continue button is clicked with providing any coordinates',
  async function () {
    await this.page
      .locator('button[type="submit"]:not([name="analytics"])')
      .click()
  }
)

When(
  'the Save and continue button is clicked without providing any coordinates',
  async function () {
    await this.page.locator('button:has-text("Save and continue")').click()
  }
)

When('the Add another point button is clicked', async function () {
  await this.page.locator('button:has-text("Add another point")').click()
})

When(
  'the Remove button for Point {int} is clicked',
  async function (pointNumber) {
    await this.page
      .locator(`[name="remove"][value="${pointNumber - 1}"]`)
      .click()
  }
)

// --- Error assertion Thens ---

Then(
  'the coordinates type error: {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator('#coordinatesType-error')).toContainText(
      errorMessage,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the coordinates entry method error: {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator('.govuk-error-message')).toContainText(
      errorMessage,
      { timeout: 30_000 }
    )
  }
)

Then(
  'the coordinates system error {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator('#coordinateSystem-error')).toContainText(
      errorMessage,
      { timeout: 30_000 }
    )
  }
)

Then('the latitude error {string} is displayed', async function (errorMessage) {
  await expect(this.page.locator('#latitude-error')).toContainText(
    errorMessage,
    { timeout: 30_000 }
  )
})

Then(
  'the longitude error {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator('#longitude-error')).toContainText(
      errorMessage,
      { timeout: 30_000 }
    )
  }
)

Then('the eastings error {string} is displayed', async function (errorMessage) {
  await expect(this.page.locator('#eastings-error')).toContainText(
    errorMessage,
    { timeout: 30_000 }
  )
})

Then(
  'the northings error {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator('#northings-error')).toContainText(
      errorMessage,
      { timeout: 30_000 }
    )
  }
)

Then('the width error {string} is displayed', async function (errorMessage) {
  await expect(this.page.locator('#width-error')).toContainText(errorMessage, {
    timeout: 30_000
  })
})

Then(
  'the following validation errors are displayed:',
  async function (dataTable) {
    const errors = dataTable.hashes()
    for (const error of errors) {
      const field = error.Field || error.field
      const message = error['Error Message'] || error.message
      const selector = getPolygonErrorSelector(field)
      await expect(this.page.locator(selector)).toContainText(message, {
        timeout: 30_000
      })
    }
  }
)

Then(
  'the point {int} eastings error should not exist',
  async function (pointNumber) {
    await expect(
      this.page.locator(`#coordinates-${pointNumber - 1}-eastings-error`)
    ).not.toBeVisible()
  }
)

Then(
  'the point {int} northings error should not exist',
  async function (pointNumber) {
    await expect(
      this.page.locator(`#coordinates-${pointNumber - 1}-northings-error`)
    ).not.toBeVisible()
  }
)

Then(
  'the point {int} latitude error should not exist',
  async function (pointNumber) {
    await expect(
      this.page.locator(`#coordinates-${pointNumber - 1}-latitude-error`)
    ).not.toBeVisible()
  }
)

Then(
  'the point {int} longitude error should not exist',
  async function (pointNumber) {
    await expect(
      this.page.locator(`#coordinates-${pointNumber - 1}-longitude-error`)
    ).not.toBeVisible()
  }
)

// --- Helper ---

function getPolygonErrorSelector(field) {
  const fieldMappings = [
    { prefix: 'Start and end point', index: 0 },
    { prefix: 'Point 2', index: 1 },
    { prefix: 'Point 3', index: 2 },
    { prefix: 'Point 4', index: 3 }
  ]

  for (const { prefix, index } of fieldMappings) {
    if (field.startsWith(prefix)) {
      const suffix = field.substring(prefix.length + 1)
      return `#coordinates-${index}-${suffix}-error`
    }
  }

  throw new Error(`Unknown polygon field: ${field}`)
}

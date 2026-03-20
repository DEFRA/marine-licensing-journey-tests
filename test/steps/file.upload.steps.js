import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { navigateAndAuthenticate } from '../support/navigation.js'
import {
  completeSiteDetailsFlow,
  continueFromBeforeYouStart,
  selectProvideMethod,
  selectFileType
} from '../support/site-details-flow.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'
import {
  createKMLUploadData,
  createKMLVirusUploadData,
  createKMLFileUploadData,
  createKMLWrongFileTypeData,
  createKMLLargeFileData,
  createKMLEmptyFileData,
  createShapefileUploadData,
  createShapefileVirusUploadData,
  createShapefileFileUploadData,
  createShapefileWrongFileTypeData,
  createShapefileLargeFileData,
  createShapefileEmptyFileData,
  createMultiSiteKMLUploadData,
  createMultiSiteShapefileUploadData,
  createShapefileMissingFileData
} from '../test-data/file-upload.js'

// --- Helper: navigate to task ---

async function setupAndNavigateToTask(world) {
  await navigateAndAuthenticate(world, '/')
  const projectPage = new ProjectNamePage(world.page)
  await projectPage.enterProjectName(world.data.projectName)
  world.data.projectNameTaskCompleted = true
  const taskList = new TaskListPage(world.page)
  await taskList.selectTask('Site details')
}

// --- KML single-site Given steps ---

Given('an exemption notification with a valid KML file', async function () {
  this.data = createKMLUploadData()
  await setupAndNavigateToTask(this)
})

Given(
  'an exemption notification with a KML file with a virus',
  async function () {
    this.data = createKMLVirusUploadData()
    await setupAndNavigateToTask(this)
  }
)

Given('an exemption notification for KML file upload', async function () {
  this.data = createKMLFileUploadData()
  await setupAndNavigateToTask(this)
})

Given(
  'an exemption notification with wrong file type for KML',
  async function () {
    this.data = createKMLWrongFileTypeData()
    await setupAndNavigateToTask(this)
  }
)

Given('an exemption notification with KML file too large', async function () {
  this.data = createKMLLargeFileData()
  await setupAndNavigateToTask(this)
})

Given('an exemption notification with empty KML file', async function () {
  this.data = createKMLEmptyFileData()
  await setupAndNavigateToTask(this)
})

// --- Shapefile single-site Given steps ---

Given('an exemption notification with a valid Shapefile', async function () {
  this.data = createShapefileUploadData()
  await setupAndNavigateToTask(this)
})

Given(
  'an exemption notification with a Shapefile with a virus',
  async function () {
    this.data = createShapefileVirusUploadData()
    await setupAndNavigateToTask(this)
  }
)

Given('an exemption notification for Shapefile upload', async function () {
  this.data = createShapefileFileUploadData()
  await setupAndNavigateToTask(this)
})

Given(
  'an exemption notification with wrong file type for Shapefile',
  async function () {
    this.data = createShapefileWrongFileTypeData()
    await setupAndNavigateToTask(this)
  }
)

Given('an exemption notification with Shapefile too large', async function () {
  this.data = createShapefileLargeFileData()
  await setupAndNavigateToTask(this)
})

Given('an exemption notification with empty Shapefile', async function () {
  this.data = createShapefileEmptyFileData()
  await setupAndNavigateToTask(this)
})

// --- Multi-site KML Given steps ---

Given(
  'a user is uploading a kml file with multiple sites with different activity dates and different descriptions',
  function () {
    this.data = createMultiSiteKMLUploadData({
      sameActivityDates: false,
      sameActivityDescription: false
    })
  }
)

Given(
  'a user is uploading a kml file with multiple sites with same activity dates and descriptions',
  function () {
    this.data = createMultiSiteKMLUploadData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
  }
)

Given(
  'a user is uploading a kml file with multiple sites with different activity dates and same descriptions',
  function () {
    this.data = createMultiSiteKMLUploadData({
      sameActivityDates: false,
      sameActivityDescription: true
    })
  }
)

Given(
  'a user is uploading a kml file with multiple sites with same activity dates and different descriptions',
  function () {
    this.data = createMultiSiteKMLUploadData({
      sameActivityDates: true,
      sameActivityDescription: false
    })
  }
)

// --- Multi-site Shapefile Given steps ---

Given(
  'a user is uploading a shapefile with multiple sites with different activity dates and different descriptions',
  function () {
    this.data = createMultiSiteShapefileUploadData({
      sameActivityDates: false,
      sameActivityDescription: false
    })
  }
)

Given(
  'a user is uploading a shapefile with multiple sites with same activity dates and descriptions',
  function () {
    this.data = createMultiSiteShapefileUploadData({
      sameActivityDates: true,
      sameActivityDescription: true
    })
  }
)

Given(
  'a user is uploading a shapefile with multiple sites with different activity dates and same descriptions',
  function () {
    this.data = createMultiSiteShapefileUploadData({
      sameActivityDates: false,
      sameActivityDescription: true
    })
  }
)

Given(
  'a user is uploading a shapefile with multiple sites with same activity dates and different descriptions',
  function () {
    this.data = createMultiSiteShapefileUploadData({
      sameActivityDates: true,
      sameActivityDescription: false
    })
  }
)

// --- Shapefile missing files ---

Given(
  'the user has a shapefile with {string}',
  async function (fileDescription) {
    this.data = createShapefileMissingFileData(fileDescription)
    await setupAndNavigateToTask(this)
  }
)

// --- When steps ---

When('completing the site details task', async function () {
  await completeSiteDetailsFlow(this.page, this.data.siteDetails)
})

When(
  'navigating to the KML upload page and continuing without selecting a file',
  async function () {
    await continueFromBeforeYouStart(this.page)
    await selectProvideMethod(this.page, 'file-upload')
    await selectFileType(this.page, 'KML')
    await this.page
      .locator('button[type="submit"]:not([name="analytics"])')
      .click()
  }
)

When(
  'navigating to the Shapefile upload page and continuing without selecting a file',
  async function () {
    await continueFromBeforeYouStart(this.page)
    await selectProvideMethod(this.page, 'file-upload')
    await selectFileType(this.page, 'Shapefile')
    await this.page
      .locator('button[type="submit"]:not([name="analytics"])')
      .click()
  }
)

// --- Then steps ---

Then('the file is successfully processed', async function () {
  await expect(this.page.locator('.govuk-error-summary')).not.toBeVisible()
})

Then(
  'the file upload error {string} is displayed',
  async function (errorMessage) {
    await expect(this.page.locator('#file-id-error')).toContainText(
      errorMessage,
      { timeout: 30_000 }
    )
  }
)

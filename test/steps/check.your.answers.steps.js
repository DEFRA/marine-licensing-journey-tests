import { Given, When, Then } from '@cucumber/cucumber'
import { completeAllTasks, clickReviewAndSend } from '../support/task-flow.js'
import CheckYourAnswersPage from '../pages/check.your.answers.page.js'
import {
  createCYACircleWGS84Data,
  createCYACircleOSGB36Data,
  createCYABoundaryWGS84Data,
  createCYABoundaryOSGB36Data,
  createCYAKMLUploadData,
  createCYAShapefileUploadData,
  createCYAMultiSiteKMLData,
  createCYAMultiSiteShapefileData,
  createCYAMultiSiteManualData
} from '../test-data/check-your-answers.js'

// --- Given steps ---

Given(
  'the user has completed all the tasks on the task list for a circular site using WGS84 coordinates',
  async function () {
    this.data = createCYACircleWGS84Data()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list for a boundary using WGS84 coordinates',
  async function () {
    this.data = createCYABoundaryWGS84Data()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list for a circular site using OSGB36 coordinates',
  async function () {
    this.data = createCYACircleOSGB36Data()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list for a boundary using OSGB36 coordinates',
  async function () {
    this.data = createCYABoundaryOSGB36Data()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list using a KML file upload',
  async function () {
    this.data = createCYAKMLUploadData()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list using a Shapefile upload',
  async function () {
    this.data = createCYAShapefileUploadData()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list using a multi site KML upload',
  async function () {
    this.data = createCYAMultiSiteKMLData()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list using a multi site Shapefile upload',
  async function () {
    this.data = createCYAMultiSiteShapefileData()
    await completeAllTasks(this)
  }
)

Given(
  'the user has completed all the tasks on the task list using a multi site manual entry',
  async function () {
    this.data = createCYAMultiSiteManualData()
    await completeAllTasks(this)
  }
)

// --- When steps ---

When('the user clicks Review and send', async function () {
  await clickReviewAndSend(this.page)
})

// --- Then steps ---

Then(
  'the user is able to see all their answers in a summary format',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndCompleteSiteDetailsToReview } from '../support/task-flow.js'
import { completeSiteDetailsFlow } from '../support/site-details-flow.js'
import {
  createMixedMultiSiteData,
  createCircleWGS84Data
} from '../test-data/site-details.js'
import { createKMLUploadData } from '../test-data/file-upload.js'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import DeleteSiteDetailsPage from '../pages/delete.site.details.page.js'
import TaskListPage from '../pages/task.list.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

// --- Given ---

Given('a user has reached the review site details page', async function () {
  this.data = createMixedMultiSiteData({
    sameActivityDates: true,
    sameActivityDescription: true
  })
  await navigateAndCompleteSiteDetailsToReview(this)
  const common = new CommonElementsPage(this.page)
  await common.expectHeading('Review site details')
})

Given('a user has uploaded sites via file upload', async function () {
  this.data = createKMLUploadData()
  await navigateAndCompleteSiteDetailsToReview(this)
  const common = new CommonElementsPage(this.page)
  await common.expectHeading('Review site details')
})

// --- When ---

When('the user confirms deletion of all site details', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.deleteAllSiteDetailsLink().click()
  const deletePage = new DeleteSiteDetailsPage(this.page)
  await deletePage.confirmDeletion()
})

When('the user cancels deletion of all site details', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.deleteAllSiteDetailsLink().click()
  const deletePage = new DeleteSiteDetailsPage(this.page)
  await deletePage.cancelDeletion()
})

// --- Then ---

Then(
  'the user is returned to the task list with site details task not yet started',
  async function () {
    const taskList = new TaskListPage(this.page)
    await taskList.expectTaskStatus('Site details', 'Incomplete')
  }
)

Then(
  'the user is returned to the review site details page with unchanged site details',
  async function () {
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.expectHeading()
  }
)

Then('the user can successfully upload a new file', async function () {
  const taskList = new TaskListPage(this.page)
  await taskList.selectTask('Site details')
  const { siteDetails } = createKMLUploadData()
  await completeSiteDetailsFlow(this.page, siteDetails)
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.expectHeading()
})

Then('the user can successfully enter manual coordinates', async function () {
  const taskList = new TaskListPage(this.page)
  await taskList.selectTask('Site details')
  const { siteDetails } = createCircleWGS84Data()
  await completeSiteDetailsFlow(this.page, siteDetails)
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.expectHeading()
})

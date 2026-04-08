import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import {
  loginAndReachTaskList,
  loginAndNavigateToUploadPage,
  uploadFileAndWaitForReviewPage
} from '../support/lcml-helpers.js'
import {
  continueFromBeforeYouStart,
  selectProvideMethod
} from '../support/site-details-flow.js'
import TaskListPage from '../pages/task.list.page.js'

Given('an organisation user is on the site details page', async function () {
  await loginAndReachTaskList(this)
  await this.page.locator('a:has-text("Site details")').click()
  await this.page.waitForLoadState('load')
})

Given(
  'an organisation user is on the upload file page for {string}',
  async function (fileType) {
    await loginAndNavigateToUploadPage(this, fileType)
  }
)

Given(
  'an organisation user has uploaded a valid {string} file and is on the review site details page',
  async function (fileType) {
    await loginAndNavigateToUploadPage(this, fileType)
    await uploadFileAndWaitForReviewPage(this, fileType)
  }
)

When(
  'the user navigates through site details to the choose file type page',
  async function () {
    // Verify site details intro page
    await expect(this.page.locator('h1').first()).toContainText(
      'Site details',
      {
        timeout: 30_000
      }
    )
    await continueFromBeforeYouStart(this.page)
    await this.page.waitForLoadState('load')
    await selectProvideMethod(this.page, 'file-upload')
    await this.page.waitForLoadState('load')
  }
)

When(
  'the user uploads a valid {string} file and saves',
  async function (fileType) {
    await uploadFileAndWaitForReviewPage(this, fileType)
  }
)

When(
  'the user continues to the task list and re-enters the site details task',
  async function () {
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')

    const taskList = new TaskListPage(this.page)
    await taskList.expectTaskStatus('Site details', 'In Progress')

    await taskList.selectTask('Site details')
    await this.page.waitForLoadState('load')
  }
)

Then(
  'the choose file type page heading and project name are displayed',
  async function () {
    await expect(this.page.locator('h1').first()).toContainText(
      'Which type of file do you want to upload?',
      { timeout: 30_000 }
    )
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
  }
)

Then(
  'the review site details page is displayed for the uploaded site',
  async function () {
    await expect(this.page.locator('h1').first()).toContainText(
      'Review site details',
      { timeout: 30_000 }
    )
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })

    await expect(this.page.locator('#site-location-card')).toContainText(
      'File uploaded',
      { timeout: 30_000 }
    )

    const site1Card = this.page.locator('#site-details-1')
    await expect(site1Card).toBeVisible({ timeout: 30_000 })
    await expect(site1Card).toContainText('Incomplete')
  }
)

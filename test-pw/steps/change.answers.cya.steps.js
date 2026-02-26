import { Given, When, Then } from '@cucumber/cucumber'
import { faker } from '@faker-js/faker'
import { completeAllTasks, clickReviewAndSend } from '../support/task-flow.js'
import {
  enterActivityDates,
  enterSiteName
} from '../support/site-details-flow.js'
import { generateActivityDates } from '../test-data/site-details.js'
import { generateProjectName } from '../test-data/exemption.js'
import {
  createCYACircleWGS84Data,
  createCYAMultiSiteManualData,
  createCYAMultiSiteKMLData
} from '../test-data/check-your-answers.js'
import CheckYourAnswersPage from '../pages/check.your.answers.page.js'
import ReviewSiteDetailsPage from '../pages/review.site.details.page.js'
import ProjectNamePage from '../pages/project.name.page.js'
import PublicRegisterPage from '../pages/public.register.page.js'

// --- Given steps ---

Given('a user has reached the check your answers page', async function () {
  this.data = createCYACircleWGS84Data()
  await completeAllTasks(this)
  await clickReviewAndSend(this.page)
  const cyaPage = new CheckYourAnswersPage(this.page)
  await cyaPage.expectHeading()
})

Given(
  'a user has reached the check your answers page with multiple sites',
  async function () {
    this.data = createCYAMultiSiteManualData()
    await completeAllTasks(this)
    await clickReviewAndSend(this.page)
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

Given(
  'a user has reached the check your answers page with file uploaded sites',
  async function () {
    this.data = createCYAMultiSiteKMLData()
    await completeAllTasks(this)
    await clickReviewAndSend(this.page)
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

// --- When steps ---

When(
  'the user changes the project name from check your answers',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.projectNameChangeLink().click()
    const newProjectName = generateProjectName()
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(newProjectName)
  }
)

When(
  'the user selects change for providing the site location from check your answers',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.providingSiteLocationChangeLink().click()
  }
)

When(
  'the user changes the activity details from check your answers',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.activityDetailsChangeLink().click()
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.activityDatesChangeLink().click()
    const newDates = generateActivityDates()
    await enterActivityDates(this.page, newDates)
    await this.page.locator('button:has-text("Continue")').click()
  }
)

When(
  'the user changes site {int} details from check your answers',
  async function (siteNumber) {
    const cyaPage = new CheckYourAnswersPage(this.page)
    const totalSites = this.data.siteDetails.sites.length
    await cyaPage.siteDetailsChangeLink(siteNumber, totalSites).click()
    const reviewPage = new ReviewSiteDetailsPage(this.page)
    await reviewPage.siteNameChangeLink(siteNumber).click()
    const newSiteName = faker.location.city()
    await enterSiteName(this.page, newSiteName)
    await this.page.locator('button:has-text("Continue")').click()
  }
)

When(
  'the user changes the data sharing consent from check your answers',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.publicRegisterChangeLink().click()
    const newConsent = !this.data.publicRegister.consent
    const reason = newConsent ? undefined : 'Changed my mind about sharing'
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.completeAndSave(newConsent, reason)
  }
)

When('the user changes a site name from check your answers', async function () {
  const cyaPage = new CheckYourAnswersPage(this.page)
  const totalSites = this.data.siteDetails.sites.length
  await cyaPage.siteDetailsChangeLink(1, totalSites).click()
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.siteNameChangeLink(1).click()
  const newSiteName = faker.location.city()
  await enterSiteName(this.page, newSiteName)
  await this.page.locator('button:has-text("Continue")').click()
})

// --- Then steps ---

Then(
  'the project name is updated on the check your answers page',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

Then('the user is taken to the review site details page', async function () {
  const reviewPage = new ReviewSiteDetailsPage(this.page)
  await reviewPage.expectHeading()
})

Then(
  'the user is returned to the check your answers page with updated activity details',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

Then(
  'the user is returned to the check your answers page with updated site {int} details',
  async function (_siteNumber) {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

Then(
  'the data sharing consent is updated on the check your answers page',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

Then(
  'the site name is updated on the check your answers page',
  async function () {
    const cyaPage = new CheckYourAnswersPage(this.page)
    await cyaPage.expectHeading()
  }
)

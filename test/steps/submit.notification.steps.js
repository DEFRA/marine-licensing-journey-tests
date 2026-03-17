import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { createCYACircleWGS84Data } from '../test-data/check-your-answers.js'
import {
  generateIatContext,
  generateProjectName
} from '../test-data/exemption.js'
import {
  completeAllTasks,
  clickReviewAndSend,
  clickConfirmAndSend
} from '../support/task-flow.js'
import { navigateAndAuthenticate } from '../support/navigation.js'
import { getConfig } from '../support/config.js'
import CheckYourAnswersPage from '../pages/check.your.answers.page.js'
import ConfirmationPage from '../pages/confirmation.page.js'
import ProjectNamePage from '../pages/project.name.page.js'

Given(
  'the user has completed all the tasks on the task list and is on the Check your answers page',
  async function () {
    this.data = createCYACircleWGS84Data()
    await completeAllTasks(this)
    await clickReviewAndSend(this.page)

    const cya = new CheckYourAnswersPage(this.page)
    await cya.expectHeading()
  }
)

When('the user clicks Confirm and send', async function () {
  await clickConfirmAndSend(this.page)
})

Then(
  'the confirmation page is displayed with an application reference and survey link',
  async function () {
    const confirmation = new ConfirmationPage(this.page)
    await confirmation.expectIsDisplayed()
    await confirmation.expectValidReference()
    await confirmation.expectFeedbackLink()
  }
)

Given(
  'the user is on any page within the service apart from the project name page',
  async function () {
    this.data = {
      iatContext: generateIatContext(),
      projectName: generateProjectName()
    }
    await navigateAndAuthenticate(this, '/')

    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
  }
)

When('the user clicks the Defra account link in the header', async function () {
  await this.page
    .locator('//a[normalize-space(text())="Defra account"]')
    .click()
  await this.page.waitForLoadState('load')
})

Then(
  'the user is taken to the Defra account management page',
  async function () {
    await expect(
      this.page.locator('h1:has-text("Your Defra account")')
    ).toBeVisible({ timeout: 30_000 })
  }
)

Given('the user is on the Defra account management page', async function () {
  this.data = {
    iatContext: generateIatContext(),
    projectName: generateProjectName()
  }
  await navigateAndAuthenticate(this, '/')

  const projectPage = new ProjectNamePage(this.page)
  await projectPage.enterProjectName(this.data.projectName)

  await this.page
    .locator('//a[normalize-space(text())="Defra account"]')
    .click()
  await this.page.waitForLoadState('load')
  await expect(
    this.page.locator('h1:has-text("Your Defra account")')
  ).toBeVisible({ timeout: 30_000 })
})

When(
  'the user clicks {string} in the {string} section',
  async function (linkText, _sectionText) {
    if (linkText === 'Get Permission For Marine Work') {
      await this.page.locator('#link-get-permission-for-marine-work').click()
      await this.page.waitForLoadState('load')
    }
  }
)

Then(
  'the user is returned to the marine licensing service homepage',
  async function () {
    const config = getConfig()
    await expect(this.page).toHaveURL(new RegExp(config.baseURL), {
      timeout: 30_000
    })
  }
)

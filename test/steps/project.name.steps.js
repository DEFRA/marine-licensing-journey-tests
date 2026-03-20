import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndAuthenticate } from '../support/navigation.js'
import {
  createValidProjectNameData,
  createValidProjectNameWithDatesData,
  generateProjectName
} from '../test-data/exemption.js'
import ProjectNamePage from '../pages/project.name.page.js'

Given('the project name page is displayed', async function () {
  this.data = createValidProjectNameData()
  await navigateAndAuthenticate(this, '/')
})

Given(
  'a notification has been created with a valid project name',
  async function () {
    this.data = createValidProjectNameWithDatesData()
    await navigateAndAuthenticate(this, '/')

    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
    this.data.projectNameTaskCompleted = true
  }
)

When('entering and saving a project with a valid name', async function () {
  this.data.projectName = generateProjectName()
  const projectPage = new ProjectNamePage(this.page)
  await projectPage.enterProjectName(this.data.projectName)
  this.data.projectNameTaskCompleted = true
})

When(
  'entering and saving the project with name {string}',
  async function (projectName) {
    this.data.projectName = projectName
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.enterProjectName(this.data.projectName)
  }
)

Then(
  'the project name error {string} is displayed',
  async function (errorMessage) {
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.expectError(errorMessage)
  }
)

Then('the project name is pre-populated', async function () {
  const projectPage = new ProjectNamePage(this.page)
  await projectPage.expectProjectNameValue(this.data.projectName)
})

Then(
  'the page caption shows the previously saved project name',
  async function () {
    const projectPage = new ProjectNamePage(this.page)
    await projectPage.expectCaptionText(this.data.projectName)
  }
)

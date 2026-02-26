import { Given, When, Then } from '@cucumber/cucumber'
import { navigateAndAuthenticate } from '../support/navigation.js'
import {
  createValidProjectNameData,
  createPublicRegisterConsentData,
  createPublicRegisterWithholdData,
  generateLongReason
} from '../test-data/exemption.js'
import ProjectNamePage from '../pages/project.name.page.js'
import TaskListPage from '../pages/task.list.page.js'
import PublicRegisterPage from '../pages/public.register.page.js'
import CommonElementsPage from '../pages/common.elements.page.js'

const PUBLIC_REGISTER_TASK = 'Sharing your project information publicly'

async function navigateToPublicRegister(world) {
  await navigateAndAuthenticate(world, '/')

  const projectPage = new ProjectNamePage(world.page)
  await projectPage.enterProjectName(world.data.projectName)
  world.data.projectNameTaskCompleted = true

  const taskList = new TaskListPage(world.page)
  await taskList.selectTask(PUBLIC_REGISTER_TASK)

  const common = new CommonElementsPage(world.page)
  await common.expectHeading(PUBLIC_REGISTER_TASK)
}

Given('the Public register page is displayed', async function () {
  this.data = createValidProjectNameData()
  await navigateToPublicRegister(this)
})

Given(
  'the Public register task has been completed with consent',
  async function () {
    this.data = createPublicRegisterConsentData()
    await navigateToPublicRegister(this)

    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.completeAndSave(true)
  }
)

Given(
  'the Public register task has been completed to withhold information',
  async function () {
    this.data = createPublicRegisterWithholdData()
    await navigateToPublicRegister(this)

    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.completeAndSave(false, this.data.publicRegister.reason)
  }
)

When(
  'choosing not to withhold information from the public register',
  async function () {
    this.data.publicRegister = { consent: true }
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.completeAndSave(true)
  }
)

When(
  'choosing to withhold information from the public register',
  async function () {
    this.data.publicRegister = {
      consent: false,
      reason: 'Sensitive information'
    }
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.completeAndSave(false, 'Sensitive information')
  }
)

When(
  'the Save and continue button is selected after choosing No without providing a reason',
  async function () {
    this.data.publicRegister = { consent: false }
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.selectConsent(false)
    await publicRegister.clickSaveAndContinue()
  }
)

When('the reason text provided is too long', async function () {
  const longReason = generateLongReason()
  this.data.publicRegister = { consent: false, reason: longReason }
  const publicRegister = new PublicRegisterPage(this.page)
  await publicRegister.completeAndSave(false, longReason)
})

When(
  'choosing to allow information to be added to the public register',
  async function () {
    this.data.publicRegister = { consent: true }
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.completeAndSave(true)
  }
)

When(
  'the Save and continue button is clicked without choosing a radio option',
  async function () {
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.clickSaveAndContinue()
  }
)

When('changing the public register information to withhold', async function () {
  const taskList = new TaskListPage(this.page)
  await taskList.selectTask(PUBLIC_REGISTER_TASK)

  this.data.publicRegister = {
    consent: false,
    reason: 'Updated withholding reason'
  }
  const publicRegister = new PublicRegisterPage(this.page)
  await publicRegister.completeAndSave(false, 'Updated withholding reason')
})

When('changing the public register information to consent', async function () {
  const taskList = new TaskListPage(this.page)
  await taskList.selectTask(PUBLIC_REGISTER_TASK)

  this.data.publicRegister = { consent: true }
  const publicRegister = new PublicRegisterPage(this.page)
  await publicRegister.completeAndSave(true)
})

When('the user clicks the Explore Marine Plans link', async function () {
  const publicRegister = new PublicRegisterPage(this.page)
  this.newTabPromise = this.page.waitForEvent('popup')
  await publicRegister.exploreMarinaPlansLink.click()
})

Then('the public register information is saved', async function () {
  const taskList = new TaskListPage(this.page)
  await taskList.selectTask(PUBLIC_REGISTER_TASK)

  const publicRegister = new PublicRegisterPage(this.page)
  await publicRegister.expectConsentSelected(this.data.publicRegister.consent)

  if (this.data.publicRegister.reason) {
    await publicRegister.expectReasonValue(this.data.publicRegister.reason)
  }
})

Then(
  'the project name is displayed on the Public register page',
  async function () {
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.expectProjectName(this.data.projectName)
  }
)

Then('no information is pre-populated', async function () {
  const publicRegister = new PublicRegisterPage(this.page)
  await publicRegister.expectNoConsentSelected()
})

Then(
  'the page is pre-populated with the previously entered information',
  async function () {
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.expectConsentSelected(this.data.publicRegister.consent)

    if (this.data.publicRegister.reason) {
      await publicRegister.expectReasonValue(this.data.publicRegister.reason)
    }
  }
)

Then(
  'the option to provide a reason for withholding information is not available',
  async function () {
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.expectReasonNotVisible()
  }
)

Then(
  'the consent error message {string} is displayed',
  async function (errorMessage) {
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.expectConsentError(errorMessage)
  }
)

Then(
  'the reason error message {string} is displayed',
  async function (errorMessage) {
    const publicRegister = new PublicRegisterPage(this.page)
    await publicRegister.expectReasonError(errorMessage)
  }
)

Then(
  'the user is taken to the Explore Marine Plans page in a new tab',
  async function () {
    const newTab = await this.newTabPromise
    await newTab.waitForLoadState()
    const url = newTab.url()

    if (!url.includes('explore-marine-plans')) {
      throw new Error(
        `Expected new tab URL to contain "explore-marine-plans" but got: ${url}`
      )
    }

    await newTab.close()
  }
)

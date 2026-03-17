import { Given, When, Then } from '@cucumber/cucumber'
import { createCYACircleWGS84Data } from '../test-data/check-your-answers.js'
import { submitNotification } from '../support/task-flow.js'
import { signOut, navigateAndReAuthenticate } from '../support/navigation.js'
import DashboardPage from '../pages/dashboard.page.js'

Given('the user has submitted an exemption notification', async function () {
  this.data = createCYACircleWGS84Data()
  await submitNotification(this)
})

Given('the user is logged out', async function () {
  await signOut(this.page)
})

When(
  'the user clicks on the link to View Details page and logs in',
  async function () {
    // @wip scenario — placeholder
    await navigateAndReAuthenticate(this, '/exemption/view-details')
  }
)

Then('subsequently redirected to the View Details page', async function () {
  // @wip scenario — placeholder
})

When(
  'the user clicks on the link to the Dashboard and logs in',
  async function () {
    await navigateAndReAuthenticate(this, DashboardPage.path)
  }
)

Then('subsequently redirected to the Dashboard', async function () {
  const dashboard = new DashboardPage(this.page)
  await dashboard.expectIsDisplayed()
})

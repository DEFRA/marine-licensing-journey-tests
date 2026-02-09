import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import DashboardPage from '../pages/dashboard.page.js'
import { getConfig } from '../support/config.js'

Then(
  'the dashboard filter is displayed with {string} and {string} radio options',
  async function (_myProjects, _allProjects) {
    const dashboard = new DashboardPage(this.page)
    await dashboard.expectFilterDisplayed()
  }
)

Then(
  'the {string} radio option is selected by default',
  async function (option) {
    const dashboard = new DashboardPage(this.page)
    if (option === 'My projects') {
      await dashboard.expectMyProjectsSelected()
    }
  }
)

Then(
  "the {string} radio option label includes the user's organisation name",
  async function (_option) {
    const dashboard = new DashboardPage(this.page)
    const config = getConfig()
    const orgName = config.isRealDefraId
      ? process.env.DEFRA_ID_ORG_NAME || 'Windfarm Co'
      : this.testUser.relationships[0].organisationName
    await dashboard.expectAllProjectsLabelContainsOrg(orgName)
  }
)

Then('the {string} button is not visible', async function (buttonText) {
  const dashboard = new DashboardPage(this.page)
  if (buttonText === 'Update results') {
    await dashboard.expectUpdateResultsButtonHidden()
  }
})

Then(
  'the projects table includes an {string} column',
  async function (_columnName) {
    const dashboard = new DashboardPage(this.page)
    await dashboard.expectOwnerColumnPresent()
  }
)

When(
  'the user selects the {string} filter radio option',
  async function (option) {
    const dashboard = new DashboardPage(this.page)
    await dashboard.selectFilter(option)
  }
)

Then(
  'the dashboard results are updated without clicking a button',
  async function () {
    const dashboard = new DashboardPage(this.page)
    await dashboard.waitForResultsUpdate()
  }
)

Then('the projects table is displayed', async function () {
  const dashboard = new DashboardPage(this.page)
  await expect(dashboard.projectsTable).toBeVisible({ timeout: 30_000 })
})

import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import DashboardPage from '../pages/dashboard.page.js'
import DashboardFilterPanePage from '../pages/dashboard.filter.pane.page.js'
import { registerTestUser } from '../support/auth.js'
import { navigateAndReAuthenticate } from '../support/navigation.js'
import { getConfig } from '../support/config.js'
import { applySharedDashboardLicence } from '../support/shared-dashboard-licence.js'

const projectRow = (page, projectName) =>
  page.locator(`xpath=//tr[td[1][normalize-space(text())="${projectName}"]]`)

Given(
  'the shared submitted marine licence application',
  { timeout: 600_000 },
  async function () {
    await applySharedDashboardLicence(this)
  }
)

Given('an individual user is signed in', async function () {
  const config = getConfig()
  this.testUser = await registerTestUser(config.defraIdUrl, {
    userType: 'individual'
  })
})

When(
  'the user filters by type {string} and status {string}',
  async function (type, status) {
    await navigateAndReAuthenticate(this, DashboardPage.path)
    const filter = new DashboardFilterPanePage(this.page)
    await filter.applyFilters({ type: [type], status: [status] })
  }
)

When('the user selects Clear filters', async function () {
  const filter = new DashboardFilterPanePage(this.page)
  await filter.clearFiltersLinks.first().click()
  await this.page.waitForLoadState('load')
})

Then('no filter pane is offered', async function () {
  await new DashboardFilterPanePage(this.page).expectNotDisplayed()
})

Then('the filter pane is hidden', async function () {
  await new DashboardFilterPanePage(this.page).expectPaneHidden()
})

Then(
  'selecting Show filter reveals it and Hide filter hides it again',
  async function () {
    const filter = new DashboardFilterPanePage(this.page)
    await filter.openPane()
    await expect(filter.applyFiltersButton).toBeVisible({ timeout: 30_000 })
    await filter.closePane()
  }
)

Then('{string} is the selected Show option', async function (label) {
  const filter = new DashboardFilterPanePage(this.page)
  await filter.openPane()
  const value = label === 'My submissions' ? 'my-projects' : 'all-projects'
  await expect(filter.showRadio(value)).toBeChecked({ timeout: 30_000 })
})

Then('the results caption reads {string}', async function (expected) {
  const filter = new DashboardFilterPanePage(this.page)
  await expect(filter.resultsCaption).toHaveText(expected, { timeout: 30_000 })
})

Then('the marine licence is listed', async function () {
  await expect(projectRow(this.page, this.data.projectName)).toBeVisible({
    timeout: 30_000
  })
})

Then('the marine licence is not listed', async function () {
  await expect(projectRow(this.page, this.data.projectName)).toHaveCount(0, {
    timeout: 30_000
  })
})

Then(
  'the selected filters are {string} and {string}',
  async function (first, second) {
    const filter = new DashboardFilterPanePage(this.page)
    // The filter panel re-renders after the results are fetched, and reading
    // the tags does not wait, so the count is asserted first.
    await filter.expectSelectedFilterCount(2)
    const labels = await filter.selectedFilterLabels()
    expect(labels.sort()).toEqual([first, second].sort())
  }
)

Then(
  'removing the {string} filter lists the marine licence again without applying filters',
  async function (label) {
    const filter = new DashboardFilterPanePage(this.page)
    await filter.removeSelectedFilter(label).click()
    await this.page.waitForLoadState('load')
    await filter.expectSelectedFilterCount(1)
    await expect(projectRow(this.page, this.data.projectName)).toBeVisible({
      timeout: 30_000
    })
    expect(await filter.selectedFilterLabels()).not.toContain(label)
  }
)

Then(
  'no filters are selected and the marine licence is listed again',
  async function () {
    const filter = new DashboardFilterPanePage(this.page)
    await expect(filter.selectedFilterTags).toHaveCount(0, {
      timeout: 30_000
    })
    await expect(projectRow(this.page, this.data.projectName)).toBeVisible({
      timeout: 30_000
    })
    await filter.openPane()
    await expect(filter.showRadio('my-projects')).toBeChecked({
      timeout: 30_000
    })
  }
)

When('the user hides and shows the filter pane', async function () {
  const filter = new DashboardFilterPanePage(this.page)
  await filter.closePane()
  await filter.openPane()
})

Then('the empty submissions message is displayed', async function () {
  await expect(new DashboardFilterPanePage(this.page).emptyMessage).toBeVisible(
    { timeout: 30_000 }
  )
})

Then(
  'filtering the dashboard by status {string} lists the project',
  async function (status) {
    await navigateAndReAuthenticate(this, DashboardPage.path)
    const filter = new DashboardFilterPanePage(this.page)
    await filter.applyFilters({ status: [status] })
    await expect(projectRow(this.page, this.data.projectName)).toBeVisible({
      timeout: 30_000
    })
  }
)

const organisationName = (world) =>
  world.testUser?.relationships?.[0]?.organisationName

When('the user filters by all organisation submissions', async function () {
  await navigateAndReAuthenticate(this, DashboardPage.path)
  await new DashboardFilterPanePage(this.page).applyShowOption('all-projects')
})

Then('the all submissions option names the organisation', async function () {
  const orgName = organisationName(this)
  expect(orgName).toBeTruthy()
  const filter = new DashboardFilterPanePage(this.page)
  await filter.openPane()
  await expect(filter.showOptionLabel('all-projects')).toHaveText(
    `All ${orgName} submissions`,
    { timeout: 30_000 }
  )
})

Then('the results caption names the organisation', async function () {
  const orgName = organisationName(this)
  expect(orgName).toBeTruthy()
  const filter = new DashboardFilterPanePage(this.page)
  await expect(filter.resultsCaption).toHaveText(
    `1 results found in 'All ${orgName} submissions'`,
    { timeout: 30_000 }
  )
})

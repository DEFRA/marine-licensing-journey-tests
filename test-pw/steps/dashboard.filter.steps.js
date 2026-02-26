import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { format } from 'date-fns'
import DashboardPage from '../pages/dashboard.page.js'
import { getConfig } from '../support/config.js'
import {
  launchD365Browser,
  loginToD365,
  verifyD365Login,
  searchD365Case,
  verifyD365CaseDetails
} from '../support/d365.js'

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

Then(
  'the dashboard filter is correctly configured with {string} selected by default',
  async function (defaultOption) {
    const dashboard = new DashboardPage(this.page)
    await dashboard.expectFilterDisplayed()

    if (defaultOption === 'My projects') {
      await dashboard.expectMyProjectsSelected()
    }

    const config = getConfig()
    const orgName = config.isRealDefraId
      ? process.env.DEFRA_ID_ORG_NAME || 'Windfarm Co'
      : this.testUser.relationships[0].organisationName
    await dashboard.expectAllProjectsLabelContainsOrg(orgName)
    await dashboard.expectUpdateResultsButtonHidden()
    await dashboard.expectOwnerColumnPresent()
  }
)

Then(
  'the submitted notification row contains the correct details',
  async function (dataTable) {
    const expectedDetails = Object.fromEntries(dataTable.raw())
    const latestExemption =
      this.data.completedExemptions[this.data.completedExemptions.length - 1]

    // Resolve dynamic values
    const resolvedDetails = {}
    for (const [key, value] of Object.entries(expectedDetails)) {
      if (value === 'matches submitted project name') {
        resolvedDetails[key] = latestExemption.projectName
      } else if (value === 'matches submitted reference number') {
        resolvedDetails[key] = latestExemption.applicationReference
      } else if (value === "today's date") {
        resolvedDetails[key] = format(new Date(), 'd MMM yyyy')
      } else {
        resolvedDetails[key] = value
      }
    }

    const dashboard = new DashboardPage(this.page)
    const row = await dashboard.getNotificationRow(latestExemption.projectName)

    // Map column names from the feature table to row property names
    const columnToProperty = {
      'Project name': 'name',
      Type: 'type',
      Reference: 'reference',
      Status: 'status',
      'Submitted on': 'submittedOn',
      Owner: 'owner',
      Actions: 'actions'
    }

    for (const [columnName, expectedValue] of Object.entries(resolvedDetails)) {
      const prop = columnToProperty[columnName]
      if (!prop) {
        throw new Error(`Unknown dashboard column: ${columnName}`)
      }

      if (columnName === 'Actions') {
        // Actions may contain multiple comma-separated values
        const expectedActions = expectedValue.split(',').map((a) => a.trim())
        for (const action of expectedActions) {
          expect(row[prop]).toContain(action)
        }
      } else {
        expect(row[prop]).toBe(expectedValue)
      }
    }
  }
)

Then(
  'the public details page for the submitted notification shows the exemption is for {string}',
  async function (expectedName) {
    const latestExemption =
      this.data.completedExemptions[this.data.completedExemptions.length - 1]

    const dashboard = new DashboardPage(this.page)
    const href = await dashboard
      .viewDetailsLink(latestExemption.projectName)
      .getAttribute('href')
    const id = href.split('/').pop()

    const config = getConfig()
    await this.page.goto(
      new URL(`/exemption/view-public-details/${id}`, config.baseURL).toString()
    )
    await this.page.waitForLoadState('load')

    const valueElement = this.page.locator(
      '//dt[contains(text(), "Who the exemption is for")]/following-sibling::dd'
    )
    await expect(valueElement).toContainText(expectedName, {
      timeout: 30_000
    })
  }
)

When('the user withdraws the submitted notification', async function () {
  const latestExemption =
    this.data.completedExemptions[this.data.completedExemptions.length - 1]

  // Wait for D365 to finish processing the submission before withdrawing
  await this.page.waitForTimeout(30_000)

  const dashboard = new DashboardPage(this.page)
  await dashboard.withdrawLink(latestExemption.projectName).click()
  await this.page.waitForLoadState('load')

  // Verify withdraw confirmation page
  const heading = this.page.locator('h1, h2, .govuk-heading-l').first()
  await expect(heading).toContainText(
    'Are you sure you want to withdraw this project?',
    { timeout: 30_000 }
  )

  // Verify Cancel and Back links are visible
  await expect(this.page.locator('a:has-text("Cancel")')).toBeVisible({
    timeout: 30_000
  })
  await expect(this.page.locator('a.govuk-back-link')).toBeVisible({
    timeout: 30_000
  })

  // Confirm withdrawal
  await this.page
    .locator('xpath=//button[normalize-space(text())="Yes, withdraw project"]')
    .click()
  await this.page.waitForLoadState('load')

  // Navigate back to dashboard
  const config = getConfig()
  await this.page.goto(new URL(DashboardPage.path, config.baseURL).toString())
  await this.page.waitForLoadState('load')
})

Then('the case status in D365 matches', async function (dataTable) {
  const expectedDetails = Object.fromEntries(dataTable.raw())
  const latestExemption =
    this.data.completedExemptions[this.data.completedExemptions.length - 1]

  // Resolve dynamic values
  for (const [key, value] of Object.entries(expectedDetails)) {
    if (value === 'matches submitted reference number') {
      expectedDetails[key] = latestExemption.applicationReference
    }
  }

  // Launch a separate browser for D365
  const { browser: d365Browser, page: d365Page } = await launchD365Browser()

  try {
    await loginToD365(d365Page)
    await verifyD365Login(d365Page)
    await searchD365Case(d365Page, latestExemption.applicationReference)
    await verifyD365CaseDetails(d365Page, expectedDetails)
  } finally {
    await d365Browser.close()
  }
})

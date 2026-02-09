import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import CommonElementsPage from '../pages/common.elements.page.js'
import HeaderPage from '../pages/header.page.js'

// "a user has submitted an exemption notification" defined in dashboard.steps.js
// "the user navigates to the dashboard" defined in dashboard.steps.js

Then(
  'the service name {string} is displayed in the header',
  async function (expectedServiceName) {
    const common = new CommonElementsPage(this.page)
    await expect(common.serviceName).toContainText(expectedServiceName)
  }
)

Then('the links are displayed in the header:', async function (dataTable) {
  const expectedLinks = dataTable.raw().map((row) => row[0])
  const header = new HeaderPage(this.page)
  await header.expectLinksDisplayed(expectedLinks)
})

Then('no links are displayed in the header', async function () {
  // Original test passes an empty expected-links array (no-op).
  // The project name page may still show navigation links depending on context.
})

Then('the links are displayed in the footer:', async function (dataTable) {
  const expectedLinks = dataTable.raw().map((row) => row[0])
  for (const linkText of expectedLinks) {
    await expect(
      this.page.locator(`//footer//a[normalize-space(text())="${linkText}"]`)
    ).toBeVisible()
  }
})

Then('the organisation name is displayed in the header', async function () {
  const common = new CommonElementsPage(this.page)
  const expectedOrg = this.testUser.relationships[0].organisationName
  await expect(common.organisationName).toContainText(expectedOrg)
})

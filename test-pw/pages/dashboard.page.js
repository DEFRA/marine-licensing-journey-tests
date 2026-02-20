import { expect } from '@playwright/test'

export default class DashboardPage {
  static path = '/projects'

  constructor(page) {
    this.page = page
    this.heading = page.locator('h1')
    this.emptyStateMessage = page.locator('.govuk-body')
    this.projectsTable = page.locator('table.govuk-table')
    this.projectsLink = page.locator('//a[normalize-space(text())="Projects"]')

    // Filter component
    this.myProjectsRadio = page.locator(
      'input[name="filter"][value="my-projects"]'
    )
    this.allProjectsRadio = page.locator(
      'input[name="filter"][value="all-projects"]'
    )
    this.allProjectsLabel = page.locator('label[for="filter-2"]')
    this.updateResultsButton = page.locator(
      'button[type="submit"]:has-text("Update results")'
    )
    this.ownerColumnHeader = page.locator(
      'table.govuk-table thead th:has-text("Owner")'
    )
  }

  async expectIsDisplayed() {
    await expect(this.heading).toBeVisible({ timeout: 30_000 })
    await expect(this.page).toHaveURL(/\/(home|projects)/)
  }

  async expectEmptyState() {
    await expect(this.emptyStateMessage).toBeVisible({ timeout: 30_000 })
    await expect(this.projectsTable).not.toBeVisible()
  }

  async clickProjectsLink() {
    await this.projectsLink.click()
    await this.page.waitForLoadState('load')
  }

  continueLink(projectName) {
    return this.page.locator(
      `//tr[td[1][normalize-space(text())="${projectName}"]]//a[@aria-label="Continue to task list"]`
    )
  }

  deleteLink(projectName) {
    return this.page.locator(
      `//tr[td[1][normalize-space(text())="${projectName}"]]//a[normalize-space(text())="Delete"]`
    )
  }

  viewDetailsLink(projectName) {
    return this.page.locator(
      `//tr[td[1][normalize-space(text())="${projectName}"]]//a[normalize-space(text())="View details"]`
    )
  }

  withdrawLink(projectName) {
    return this.page.locator(
      `//tr[td[1][normalize-space(text())="${projectName}"]]//a[normalize-space(text())="Withdraw"]`
    )
  }

  async getNotificationRow(projectName) {
    const row = this.page.locator(
      `//tr[td[1][normalize-space(text())="${projectName}"]]`
    )
    await expect(row).toBeVisible({ timeout: 30_000 })
    const cells = row.locator('td')
    return {
      name: (await cells.nth(0).textContent()).trim(),
      type: (await cells.nth(1).textContent()).trim(),
      reference: (await cells.nth(2).textContent()).trim(),
      status: (await cells.nth(3).textContent()).trim(),
      submittedOn: (await cells.nth(4).textContent()).trim(),
      owner: (await cells.nth(5).textContent()).trim(),
      actions: (await cells.nth(6).textContent()).trim()
    }
  }

  async getNotifications() {
    const rows = this.page.locator('table.govuk-table tbody tr')
    const count = await rows.count()
    const notifications = []

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i)
      const cells = row.locator('td')
      notifications.push({
        name: (await cells.nth(0).textContent()).trim(),
        type: (await cells.nth(1).textContent()).trim(),
        reference: (await cells.nth(2).textContent()).trim(),
        status: (await cells.nth(3).textContent()).trim(),
        dateSubmitted: (await cells.nth(4).textContent()).trim()
      })
    }
    return notifications
  }

  async expectNotificationsDisplayed(completedExemptions) {
    const notifications = await this.getNotifications()

    for (const exemption of completedExemptions) {
      const match = notifications.find((n) => n.name === exemption.projectName)
      expect(match).toBeTruthy()

      if (exemption.applicationReference) {
        expect(match.reference).toBe(exemption.applicationReference)
        expect(match.status).toBe('Active')
      } else {
        expect(match.reference).toBe('-')
        expect(match.status).toBe('Draft')
      }
    }
  }

  async expectFilterDisplayed() {
    await expect(this.myProjectsRadio).toBeVisible({ timeout: 30_000 })
    await expect(this.allProjectsRadio).toBeVisible({ timeout: 30_000 })
  }

  async expectMyProjectsSelected() {
    await expect(this.myProjectsRadio).toBeChecked({ timeout: 30_000 })
  }

  async expectAllProjectsLabelContainsOrg(orgName) {
    await expect(this.allProjectsLabel).toContainText(orgName, {
      timeout: 30_000
    })
  }

  async expectUpdateResultsButtonHidden() {
    await expect(this.updateResultsButton).toBeHidden({ timeout: 30_000 })
  }

  async expectOwnerColumnPresent() {
    await expect(this.ownerColumnHeader).toBeVisible({ timeout: 30_000 })
  }

  async selectFilter(filterOption) {
    if (filterOption === 'All projects') {
      await this.allProjectsRadio.click()
    } else {
      await this.myProjectsRadio.click()
    }
  }

  async waitForResultsUpdate() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.projectsTable).toBeVisible({ timeout: 30_000 })
  }

  async expectSortOrder() {
    const notifications = await this.getNotifications()
    const drafts = notifications.filter((n) => n.status === 'Draft')
    const active = notifications.filter((n) => n.status === 'Active')

    // Drafts appear before active
    if (drafts.length > 0 && active.length > 0) {
      const lastDraftIndex = notifications.findLastIndex(
        (n) => n.status === 'Draft'
      )
      const firstActiveIndex = notifications.findIndex(
        (n) => n.status === 'Active'
      )
      expect(lastDraftIndex).toBeLessThan(firstActiveIndex)
    }

    // Alphabetical within each group
    const draftNames = drafts.map((d) => d.name.toLowerCase())
    const activeNames = active.map((a) => a.name.toLowerCase())
    expect(draftNames).toEqual([...draftNames].sort())
    expect(activeNames).toEqual([...activeNames].sort())
  }
}

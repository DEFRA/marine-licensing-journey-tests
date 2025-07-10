import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class EnsureDashboardDisplaysNotification extends Task {
  static correctly() {
    return new EnsureDashboardDisplaysNotification()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.expectElementToBePresent(
      DashboardPage.locators.projectsTable
    )
    await browseTheWeb.expectElementToBePresent(
      DashboardPage.locators.tableRows
    )

    const exemption = actor.recalls('exemption')
    const applicationReference = actor.recalls('applicationReference')

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.name,
      exemption.projectName
    )

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.type,
      'Exempt activity'
    )

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.reference,
      applicationReference
    )

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.status,
      'Closed'
    )

    const today = new Date()
    const expectedDate = today
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
      .replace(/,/g, '')

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.dateSubmitted,
      expectedDate
    )
  }
}

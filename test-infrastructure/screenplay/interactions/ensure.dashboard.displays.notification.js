import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'
import { expect } from 'chai'

export default class EnsureDashboardDisplaysNotification extends Task {
  static now() {
    return new EnsureDashboardDisplaysNotification()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    // Get the completed exemptions list
    const completedExemptions = actor.recalls('completedExemptions')
    if (!completedExemptions || completedExemptions.length === 0) {
      expect.fail('No completed exemptions found in memory')
    }

    // Use the latest completed exemption for verification
    const latestExemption = completedExemptions[completedExemptions.length - 1]

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.name,
      latestExemption.projectName
    )

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.type,
      'Exempt activity'
    )

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.reference,
      latestExemption.applicationReference
    )

    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.dateSubmitted,
      today
    )
  }
}

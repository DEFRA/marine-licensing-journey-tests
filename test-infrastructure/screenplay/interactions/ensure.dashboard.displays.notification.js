import { expect } from 'chai'
import { format } from 'date-fns'
import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

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
      'Exempt activity notification'
    )

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.reference,
      latestExemption.applicationReference
    )

    const today = format(new Date(), 'd MMM yyyy')

    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.firstRowCells.dateSubmitted,
      today
    )
  }
}

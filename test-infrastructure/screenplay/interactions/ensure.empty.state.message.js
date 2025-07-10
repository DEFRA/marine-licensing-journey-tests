import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class EnsureEmptyStateMessage extends Task {
  static shows(expectedMessage) {
    return new EnsureEmptyStateMessage(expectedMessage)
  }

  constructor(expectedMessage) {
    super()
    this.expectedMessage = expectedMessage
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.emptyStateMessage,
      this.expectedMessage
    )

    await browseTheWeb.isNotDisplayed(DashboardPage.locators.projectsTable)
  }
}

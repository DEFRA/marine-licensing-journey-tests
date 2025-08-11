import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class EnsureNotificationRemoved extends Task {
  static withProjectName(projectName) {
    return new EnsureNotificationRemoved(projectName)
  }

  constructor(projectName) {
    super()
    this.projectName = projectName
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const projectRowSelector = DashboardPage.projectRow(this.projectName)
    await browseTheWeb.isNotDisplayed(projectRowSelector)
  }
}

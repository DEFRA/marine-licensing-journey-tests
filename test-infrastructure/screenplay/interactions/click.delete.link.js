import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class ClickDeleteLink extends Task {
  static forExemptionWithProjectName(projectName) {
    return new ClickDeleteLink(projectName)
  }

  constructor(projectName) {
    super()
    this.projectName = projectName
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const deleteLink = DashboardPage.deleteLink(this.projectName)
    await browseTheWeb.click(deleteLink)
  }
}

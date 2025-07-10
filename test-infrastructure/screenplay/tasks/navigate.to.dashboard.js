import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class NavigateToDashboard extends Task {
  static now() {
    return new NavigateToDashboard()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(DashboardPage.locators.projectsHomeLink)
  }
}

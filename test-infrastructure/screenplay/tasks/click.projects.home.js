import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class ClickProjectsHome extends Task {
  static now() {
    return new ClickProjectsHome()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(DashboardPage.locators.projectsHomeLink)
  }
}

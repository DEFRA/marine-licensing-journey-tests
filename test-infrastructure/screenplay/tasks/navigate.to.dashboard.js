import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class NavigateToDashboard extends Task {
  static now() {
    return new NavigateToDashboard()
  }

  async performAs(actor) {
    await actor.ability.navigateTo(DashboardPage.url)
  }
}

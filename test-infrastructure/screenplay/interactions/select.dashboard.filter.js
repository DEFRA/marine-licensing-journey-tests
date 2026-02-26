import DashboardPage from '../../pages/dashboard.page.js'
import Task from '../base/task.js'

export default class SelectDashboardFilter extends Task {
  #option

  constructor(option) {
    super()
    this.#option = option
  }

  static option(filterName) {
    return new SelectDashboardFilter(filterName)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const locator =
      this.#option === 'All projects'
        ? DashboardPage.locators.allProjectsRadio
        : DashboardPage.locators.myProjectsRadio

    await browseTheWeb.click(locator)
  }
}

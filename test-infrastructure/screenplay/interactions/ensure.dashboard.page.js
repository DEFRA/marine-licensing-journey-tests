import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class EnsureDashboardPage extends Task {
  static isDisplayed() {
    return new EnsureDashboardPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.expectElementToContainText(
      DashboardPage.locators.pageHeading,
      'Your projects'
    )
    const currentUrl = await browseTheWeb.browser.getUrl()
    if (!currentUrl.includes(DashboardPage.url)) {
      throw new Error(
        `Expected to be on dashboard page (${DashboardPage.url}) but current URL is: ${currentUrl}`
      )
    }
  }
}

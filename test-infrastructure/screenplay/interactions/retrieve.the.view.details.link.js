import DashboardPage from '../../pages/dashboard.page.js'
import Task from '../base/task.js'

export default class RetrieveTheViewDetailsLink extends Task {
  static now() {
    return new RetrieveTheViewDetailsLink()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.navigateTo(DashboardPage.url)
    const completedExemptions = actor.recalls('completedExemptions')
    const latestExemption = completedExemptions[completedExemptions.length - 1]
    const element = await browseTheWeb.getElement(
      DashboardPage.viewDetailsLink(latestExemption.projectName)
    )
    const href = await element.getAttribute('href')
    actor.remembers('viewDetailsLink', href)
  }
}

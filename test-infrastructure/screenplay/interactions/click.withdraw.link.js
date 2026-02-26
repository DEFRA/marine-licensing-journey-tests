import DashboardPage from '../../pages/dashboard.page.js'
import Task from '../base/task.js'

export default class ClickWithdrawLink extends Task {
  static forLastCompletedExemption() {
    return new ClickWithdrawLink()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const completedExemptions = actor.recalls('completedExemptions')
    const latestExemption = completedExemptions[completedExemptions.length - 1]
    await browseTheWeb.click(
      DashboardPage.withdrawLink(latestExemption.projectName)
    )
  }
}

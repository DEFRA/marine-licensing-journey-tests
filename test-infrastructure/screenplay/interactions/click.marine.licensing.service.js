import DefraAccountPage from '~/test-infrastructure/pages/defra.account.page.js'
import Task from '../base/task.js'

export default class ClickMarineLicensingService extends Task {
  static now() {
    return new ClickMarineLicensingService()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(
      DefraAccountPage.locators.marineLicensingServiceLink
    )
  }
}

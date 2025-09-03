import DefraIdSelectionPage from '~/test-infrastructure/pages/defra.id.selection.page.js'
import Task from '../base/task.js'

export default class SelectGovernmentGatewayAuthentication extends Task {
  static now() {
    return new SelectGovernmentGatewayAuthentication()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.click(DefraIdSelectionPage.governmentGatewayRadio)
    await browseTheWeb.click(DefraIdSelectionPage.continueButton)
  }
}

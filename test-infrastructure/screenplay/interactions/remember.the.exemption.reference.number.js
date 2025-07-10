import ConfirmationPage from '../../pages/confirmation.page.js'
import Task from '../base/task.js'

export default class RememberTheExemptionReferenceNumber extends Task {
  static now() {
    return new RememberTheExemptionReferenceNumber()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const referenceText = await browseTheWeb.getText(
      ConfirmationPage.locators.applicationReference
    )
    actor.remembers('applicationReference', referenceText)
  }
}

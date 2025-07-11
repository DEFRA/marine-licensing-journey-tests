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

    const activeExemption = actor.recalls('exemption')

    const completedExemption = {
      ...activeExemption,
      applicationReference: referenceText
    }

    const existingCompleted = actor.hasMemoryOf('completedExemptions')
      ? actor.recalls('completedExemptions')
      : []
    existingCompleted.push(completedExemption)
    actor.remembers('completedExemptions', existingCompleted)

    actor.remembers('applicationReference', referenceText)

    delete actor.memory.exemption
  }
}

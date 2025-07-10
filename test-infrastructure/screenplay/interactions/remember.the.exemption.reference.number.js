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

    // Get the current active exemption
    const activeExemption = actor.recalls('exemption')

    // Create completed exemption with reference number
    const completedExemption = {
      ...activeExemption,
      applicationReference: referenceText
    }

    // Add to completed exemptions list
    const existingCompleted = actor.hasMemoryOf('completedExemptions')
      ? actor.recalls('completedExemptions')
      : []
    existingCompleted.push(completedExemption)
    actor.remembers('completedExemptions', existingCompleted)

    // Store reference for backward compatibility
    actor.remembers('applicationReference', referenceText)

    // Clear the active exemption memory - ready for next exemption
    delete actor.memory.exemption
  }
}

import { expect } from 'chai'
import ActivityDescriptionPage from '~/test-infrastructure/pages/activity.description.page.js'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page'
import Task from '../base/task.js'
import Memory from '../memory.js'

export default class CompleteActivityDescription extends Task {
  static now() {
    return new CompleteActivityDescription()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(
        'Exemption data must be initialized before completing project name'
      )
    }
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys(
      ActivityDescriptionPage.activityDescriptionInput,
      exemption.activityDescription
    )
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)

    actor.updates(Memory.markTaskCompleted('activityDescription'))
  }
}

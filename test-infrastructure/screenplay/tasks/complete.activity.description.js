import { expect } from 'chai'
import ActivityDescriptionPage from '~/test-infrastructure/pages/activity.description.page.js'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import Memory from '../memory.js'

export default class CompleteActivityDescription extends Task {
  static now() {
    return new CompleteActivityDescription()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.MISSING_EXEMPTION('activity description'))
    }
    const browseTheWeb = actor.ability
    const activityDescription =
      exemption.siteDetails?.sites?.[0]?.activityDescription ||
      exemption.activityDescription
    await browseTheWeb.sendKeys(
      ActivityDescriptionPage.activityDescriptionInput,
      activityDescription
    )
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)

    actor.updates(Memory.markTaskCompleted('activityDescription'))
  }
}

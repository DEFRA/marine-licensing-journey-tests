import { expect } from 'chai'
import ActivityDescriptionPage from '~/test-infrastructure/pages/activity.description.page.js'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import Memory from '../memory.js'

export default class CompleteActivityDescription extends Task {
  constructor(siteNumber = 1) {
    super()
    this.siteNumber = siteNumber
  }

  static now() {
    return new CompleteActivityDescription(1)
  }

  static forSite(siteNumber) {
    return new CompleteActivityDescription(siteNumber)
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.MISSING_EXEMPTION('activity description'))
    }
    const browseTheWeb = actor.ability

    const siteIndex = this.siteNumber - 1
    const activityDescription =
      exemption.siteDetails?.sites?.[siteIndex]?.activityDescription

    if (!activityDescription) {
      expect.fail(
        ERROR_MESSAGES.MISSING_DATA('Activity description', 'site details')
      )
    }

    await browseTheWeb.sendKeys(
      ActivityDescriptionPage.activityDescriptionInput,
      activityDescription
    )
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)

    actor.updates(Memory.markTaskCompleted('activityDescription'))
  }
}

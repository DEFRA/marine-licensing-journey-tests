import { expect } from 'chai'
import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../base/task.js'
import Memory from '../memory.js'

export default class CompletePublicRegisterTask extends Task {
  static andSave() {
    return new CompletePublicRegisterTask(true)
  }

  static withoutSaving() {
    return new CompletePublicRegisterTask(false)
  }

  constructor(saveAndContinue) {
    super()
    this.saveAndContinue = saveAndContinue
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')

    if (!exemption) {
      expect.fail(
        'Exemption data must be initialized before completing public register task'
      )
    }

    if (!exemption.publicRegister) {
      expect.fail(
        'Public register data must be initialized before completing public register task'
      )
    }

    const browseTheWeb = actor.ability
    const consentSelector = PublicRegisterPage.getConsentSelector(
      exemption.publicRegister.consent
    )
    await browseTheWeb.click(consentSelector)

    if (
      exemption.publicRegister.reason &&
      exemption.publicRegister.reason.length > 0
    ) {
      await browseTheWeb.sendKeys(
        PublicRegisterPage.withholdReason,
        exemption.publicRegister.reason
      )
    }

    if (this.saveAndContinue) {
      await browseTheWeb.click(PublicRegisterPage.saveAndContinue)

      actor.updates(Memory.markTaskCompleted('publicRegister'))
    }
  }
}

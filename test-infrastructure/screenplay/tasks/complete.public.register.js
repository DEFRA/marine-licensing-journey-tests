import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../base/task.js'

export default class CompletePublicRegisterTask extends Task {
  static andSaving() {
    return new CompletePublicRegisterTask(true)
  }

  static andNotSaving() {
    return new CompletePublicRegisterTask(false)
  }

  constructor(saveAndContinue) {
    super()
    this.saveAndContinue = saveAndContinue
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    await browseTheWeb.click(exemption.publicRegister.consent)
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

      if (actor.hasMemoryOf('exemption')) {
        actor.updates('exemption', (exemption) =>
          exemption.markPublicRegisterTaskCompleted()
        )
      }
    }
  }
}

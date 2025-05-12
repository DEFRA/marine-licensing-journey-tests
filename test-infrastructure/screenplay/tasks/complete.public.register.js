import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from './task'

export default class CompletePublicRegisterTask extends Task {
  static andSavingWith(selector, withholdReason = '') {
    return new CompletePublicRegisterTask(selector, withholdReason, true)
  }

  static andNotSavingWith(selector, withholdReason = '') {
    return new CompletePublicRegisterTask(selector, withholdReason, false)
  }

  constructor(selector, withholdReason = '', saveAndContinue) {
    super()
    this.selector = selector
    this.withholdReason = withholdReason
    this.saveAndContinue = saveAndContinue
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(this.selector)
    if (this.withholdReason.length > 0) {
      await browseTheWeb.sendKeys(
        PublicRegisterPage.withholdReason,
        this.withholdReason
      )
    }
    if (this.saveAndContinue) {
      await browseTheWeb.click(PublicRegisterPage.saveAndContinue)
    }
  }
}

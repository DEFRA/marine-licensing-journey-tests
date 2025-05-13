import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../tasks/task'

export default class EnsureReasonTextBox extends Task {
  static isDisplayed() {
    return new EnsureReasonTextBox(true)
  }

  static isNotDisplayed() {
    return new EnsureReasonTextBox(false)
  }

  constructor(isDisplayed) {
    super()
    this.isDisplayed = isDisplayed
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    if (this.isDisplayed) {
      await browseTheWeb.isDisplayed(PublicRegisterPage.withholdReason)
    } else {
      await browseTheWeb.isNotDisplayed(PublicRegisterPage.withholdReason)
    }
  }
}

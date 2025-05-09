import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../tasks/task'

export default class EnsureReasonTextBox extends Task {
  static isDisplayed() {
    return new EnsureReasonTextBox(true)
  }

  static isNotDisplayed() {
    return new EnsureReasonTextBox(false)
  }

  /**
   * Creates an instance of EnsureReasonTextBox.
   *
   * @constructor
   * @param {boolean} isDisplayed
   */
  constructor(isDisplayed) {
    super()
    this.isDisplayed = isDisplayed
  }

  /**
   * Checks the public register task details.
   *
   * @async
   * @param {Actor} actor
   * @returns {*}
   */
  async performAs(actor) {
    const browseTheWeb = actor.ability
    expect(
      await browseTheWeb.isDisplayed(PublicRegisterPage.withholdReason)
    ).toEqual(this.isDisplayed)
  }
}

import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../tasks/task'

export default class EnsurePublicRegisterTask extends Task {
  /**
   * Description placeholder
   *
   * @static
   * @param {string} option
   * @returns {EnsurePublicRegisterTask}
   */
  static hasBeenCompletedWith(option, withholdReason = '') {
    return new EnsurePublicRegisterTask(option, withholdReason)
  }

  /**
   * Creates an instance of EnsureProjectNameError.
   *
   * @constructor
   * @param {string} option
   * @param {string} [withholdReason='']
   */
  constructor(option, withholdReason = '') {
    super()
    this.option = option
    this.withholdReason = withholdReason
  }

  /**
   * Waits for the error message to appear
   *
   * @async
   * @param {Actor} actor
   * @returns {*}
   */
  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isSelected(this.option)
    if (this.withholdReason.length > 0) {
      await browseTheWeb.expectElementToContainText(
        PublicRegisterPage.withholdReason,
        this.withholdReason
      )
    }
  }
}

import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from '../tasks/task'

export default class AllowDetailsToBeAddedToPublicRegister extends Task {
  /**
   * Creates a new instance of AllowDetailsToBeAddedToPublicRegister with the specified details
   * @param {boolean} allowPublicRegister - whether to allow details to be added to the public register.
   * @param {string} withholdReason - the reason for withholding information.
   * @returns {AllowDetailsToBeAddedToPublicRegister} A new instance of ApplyForExemption.
   */
  static where(allowPublicRegister, withholdReason = '') {
    return new AllowDetailsToBeAddedToPublicRegister(
      allowPublicRegister,
      withholdReason
    )
  }

  /**
   * Constructs an AllowDetailsToBeAddedToPublicRegister task.
   * @param {boolean} allowPublicRegister - whether to allow details to be added to the public register.
   * @param {string} withholdReason - the reason for withholding information.
   */
  constructor(allowPublicRegister, withholdReason) {
    super()
    this.allowPublicRegister = allowPublicRegister
    this.withholdReason = withholdReason
  }

  /**
   * Performs the task as the given actor.
   *
   * @param {Actor} actor - The actor performing the task.
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async performAs(actor) {
    const browseTheWeb = actor.ability
    browseTheWeb.selectOption(
      PublicRegisterPage.allowPublicRegisterOption,
      this.allowPublicRegister
    )
    if (this.withholdReason.length > 0) {
      browseTheWeb.sendKeys(
        PublicRegisterPage.withholdReason,
        this.withholdReason
      )
    }
  }
}

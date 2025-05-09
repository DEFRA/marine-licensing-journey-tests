import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'
import Task from './task'

export default class CompletePublicRegisterTask extends Task {
  /**
   * Creates a new instance of CompletePublicRegisterTask with the specified details
   * @param {boolean} selector - whether to allow details to be added to the public register.
   * @param {string} withholdReason - the reason for withholding information.
   * @returns {CompletePublicRegisterTask} A new instance of ApplyForExemption.
   */
  static where(selector, withholdReason = '') {
    return new CompletePublicRegisterTask(selector, withholdReason)
  }

  /**
   * Constructs an CompletePublicRegisterTask task.
   * @param {boolean} selector - whether to allow details to be added to the public register.
   * @param {string} withholdReason - the reason for withholding information.
   */
  constructor(selector, withholdReason = '') {
    super()
    this.selector = selector
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
    await browseTheWeb.click(this.selector)
    if (this.withholdReason.length > 0) {
      await browseTheWeb.sendKeys(
        PublicRegisterPage.withholdReason,
        this.withholdReason
      )
    }
    await browseTheWeb.click(PublicRegisterPage.saveAndContinue)
  }
}

import Task from '../base/task.js'

/**
 * A generic task for filling out forms without saving/submitting them.
 * This is particularly useful for testing cancel/back behaviors.
 */
export default class FillForm extends Task {
  /**
   * Creates a task to fill out a form by performing a series of interactions
   * without saving or submitting the form.
   *
   * @param {Function} formFiller - A function that takes an actor and performs the form filling interactions
   * @returns {FillForm} A new FillForm task
   */
  static withInteractions(formFiller) {
    return new FillForm(formFiller)
  }

  /**
   * Creates a task to fill out a public register form with withholding information
   *
   * @param {string} reason - The reason for withholding information
   * @returns {FillForm} A new FillForm task
   */
  static publicRegisterWithhold(reason) {
    return new FillForm(async (actor) => {
      const PublicRegisterPage = (
        await import('~/test-infrastructure/pages/public.register.page')
      ).default
      const browseTheWeb = actor.ability

      await browseTheWeb.click(PublicRegisterPage.withhold)

      if (reason && reason.length > 0) {
        await browseTheWeb.sendKeys(PublicRegisterPage.withholdReason, reason)
      }
    })
  }

  constructor(formFiller) {
    super()
    this.formFiller = formFiller
  }

  async performAs(actor) {
    await this.formFiller(actor)

    // Note: This task deliberately does not save changes or update actor memory
    // as it's designed for edge cases where the user cancels or goes back
  }
}

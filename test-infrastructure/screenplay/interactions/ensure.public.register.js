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
    return new EnsurePublicRegisterTask(true, option, withholdReason)
  }

  static hasNoInformationCompleted() {
    return new EnsurePublicRegisterTask(false, '')
  }

  /**
   * Creates an instance of EnsureProjectNameError.
   *
   * @constructor
   * @param {boolean} hasBeenPreviouslyCompleted
   * @param {string} option
   * @param {string} [withholdReason='']
   */
  constructor(hasBeenPreviouslyCompleted, option, withholdReason = '') {
    super()
    this.hasBeenPreviouslyCompleted = hasBeenPreviouslyCompleted
    this.option = option
    this.withholdReason = withholdReason
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

    if (this.hasBeenPreviouslyCompleted) {
      await this.verifyPrepopulatedDetails(browseTheWeb)
    } else {
      await this.verifyNoPrepopulatedDetails(browseTheWeb)
    }
  }

  /**
   * Verifies that no details are prepopulated.
   *
   * @async
   * @param {BrowseTheWeb} browseTheWeb - The actor's ability to browse the web.
   */
  async verifyNoPrepopulatedDetails(browseTheWeb) {
    await Promise.all([
      browseTheWeb.isNotSelected(PublicRegisterPage.consent),
      browseTheWeb.isNotSelected(PublicRegisterPage.withhold)
    ])
  }

  /**
   * Verifies that details are prepopulated.
   *
   * @async
   * @param {BrowseTheWeb} browseTheWeb - The actor's ability to browse the web.
   */
  async verifyPrepopulatedDetails(browseTheWeb) {
    await browseTheWeb.isSelected(this.option)

    if (this.withholdReason.length > 0) {
      await browseTheWeb.expectElementToContainText(
        PublicRegisterPage.withholdReason,
        this.withholdReason
      )
    }
  }
}

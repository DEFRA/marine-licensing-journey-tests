import Task from '../tasks/task'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'

export default class EnsureProjectNameError extends Task {
  /**
   * Description placeholder
   *
   * @static
   * @param {string} expectation
   * @returns {EnsureProjectNameError}
   */
  static is(expectation) {
    return new EnsureProjectNameError(expectation)
  }

  /**
   * Creates an instance of EnsureProjectNameError.
   *
   * @constructor
   * @param {string} expectation
   */
  constructor(expectation) {
    super()
    this.expectation = expectation
  }

  /**
   * Waits for the error message to appear
   *
   * @async
   * @param {Actor} actor
   * @returns {*}
   */
  async performAs(actor) {
    await actor.ability.expectElementToContainText(
      ProjectNamePage.projectNameError,
      this.expectation
    )
  }
}

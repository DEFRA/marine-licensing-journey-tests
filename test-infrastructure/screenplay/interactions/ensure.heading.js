import Task from '../tasks/task'

export default class EnsurePageHeadingIs extends Task {
  /**
   * Description placeholder
   *
   * @static
   * @param {string} expectation
   * @returns {EnsurePageHeadingIs}
   */
  static is(expectation) {
    return new EnsurePageHeadingIs(expectation)
  }

  /**
   * Creates an instance of EnsurePageHeadingIs.
   *
   * @constructor
   * @param {string} expectation
   */
  constructor(expectation) {
    super()
    this.expectation = expectation
  }

  /**
   * Asserts that the title matches the expectation
   *
   * @async
   * @param {Actor} actor
   * @returns {*}
   */
  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.expectElementToContainText('h1', this.expectation)
  }
}

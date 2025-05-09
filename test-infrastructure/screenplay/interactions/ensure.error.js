import Task from '../tasks/task'

export default class EnsureErrorDisplayed extends Task {
  /**
   * Description placeholder
   *
   * @static
   * @param {string} locator
   * @param {string} expectation
   * @returns {EnsureErrorDisplayed}
   */
  static is(locator, expectation) {
    return new EnsureErrorDisplayed(locator, expectation)
  }

  /**
   * Creates an instance of EnsureErrorDisplayed.
   *
   * @constructor
   * @param {string} locator
   * @param {string} expectation
   */
  constructor(locator, expectation) {
    super()
    this.locator = locator
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
      this.locator,
      this.expectation
    )
  }
}

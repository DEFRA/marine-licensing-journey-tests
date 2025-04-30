import Task from '../tasks/task'

export default class EnsureTaskStatus extends Task {
  /**
   * @static
   * @param {string} locator
   * @param {string} expectation
   * @returns {EnsureTaskStatus}
   */
  static is(locator, expectation) {
    return new EnsureTaskStatus(locator, expectation)
  }

  /**
   * Creates an instance of EnsureThatTask.
   *
   * @constructor
   * @param {string} locator
   */
  constructor(locator, expectation) {
    super()
    this.locator = locator
    this.expectation = expectation
  }

  /**
   * @async
   * @param {Actor} actor
   * @returns {*}
   */
  async performAs(actor) {
    await actor.ability.expectElementToHaveText(this.locator, this.expectation)
  }
}

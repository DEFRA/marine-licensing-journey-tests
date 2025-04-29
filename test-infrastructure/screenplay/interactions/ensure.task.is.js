import Task from '../tasks/task'

export default class EnsureThatTask extends Task {
  /**
   * @static
   * @param {string} expectation
   * @returns {EnsureThatTask}
   */
  static is(taskName, expectation) {
    return new EnsureThatTask(taskName, expectation)
  }

  /**
   * Creates an instance of EnsureThatTask.
   *
   * @constructor
   * @param {string} expectation
   */
  constructor(taskName, expectation) {
    super()
    this.taskName = taskName
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
    await actor.ability.expectElementToHaveText(this.taskName, this.expectation)
  }
}

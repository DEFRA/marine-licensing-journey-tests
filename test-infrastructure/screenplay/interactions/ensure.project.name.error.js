import Task from '../tasks/task'

import { expect } from 'chai'

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
   * Description placeholder
   *
   * @async
   * @param {Actor} actor
   * @returns {*}
   */
  async performAs(actor) {
    const projectNameError = await actor.ability.getText('projectName-error')
    expect(projectNameError).to.equal(this.expectation)
  }
}

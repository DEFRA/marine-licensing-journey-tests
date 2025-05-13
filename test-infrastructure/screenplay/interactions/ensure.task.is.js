import Task from '../tasks/task'

export default class EnsureTaskStatus extends Task {
  static is(locator, expectation) {
    return new EnsureTaskStatus(locator, expectation)
  }

  constructor(locator, expectation) {
    super()
    this.locator = locator
    this.expectation = expectation
  }

  async performAs(actor) {
    await actor.ability.expectElementToContainText(
      this.locator,
      this.expectation
    )
  }
}

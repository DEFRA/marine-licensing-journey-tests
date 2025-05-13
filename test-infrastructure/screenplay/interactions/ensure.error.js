import Task from '../tasks/task'

export default class EnsureErrorDisplayed extends Task {
  static is(locator, expectation) {
    return new EnsureErrorDisplayed(locator, expectation)
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

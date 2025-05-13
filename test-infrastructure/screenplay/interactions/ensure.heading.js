import Task from '../tasks/task'

export default class EnsurePageHeadingIs extends Task {
  static is(expectation) {
    return new EnsurePageHeadingIs(expectation)
  }

  constructor(expectation) {
    super()
    this.expectation = expectation
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.expectElementToContainText('h1', this.expectation)
  }
}

import Task from '../base/task.js'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'

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
    await browseTheWeb.expectElementToContainText(
      CommonElementsPage.mainHeading,
      this.expectation
    )
  }
}

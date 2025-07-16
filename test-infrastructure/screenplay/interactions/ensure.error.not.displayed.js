import Task from '../base/task.js'

export default class EnsureErrorNotDisplayed extends Task {
  static is(locator, errorText = null) {
    return new EnsureErrorNotDisplayed(locator, errorText)
  }

  constructor(locator, errorText) {
    super()
    this.locator = locator
    this.errorText = errorText
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isNotDisplayed(this.locator)
    await browseTheWeb.expectElementToNotContainText(
      '.govuk-error-summary__list',
      this.errorText
    )
  }
}

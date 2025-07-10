import Task from '../base/task.js'

export default class EnsureNoErrorsDisplayed extends Task {
  static onPage(locators = ['.govuk-error-summary']) {
    return new EnsureNoErrorsDisplayed(locators)
  }

  static withLocators(locators) {
    return new EnsureNoErrorsDisplayed(locators)
  }

  constructor(locators = ['.govuk-error-summary']) {
    super()
    this.locators = Array.isArray(locators) ? locators : [locators]
  }

  async performAs(actor) {
    for (const locator of this.locators) {
      await actor.ability.isNotDisplayed(locator)
    }
  }
}

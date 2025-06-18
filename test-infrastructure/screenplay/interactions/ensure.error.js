import Task from '../base/task.js'
import { expect } from 'chai'

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
    try {
      await actor.ability.expectElementToContainText(
        this.locator,
        this.expectation
      )
    } catch (error) {
      expect.fail(
        `Expected error message "${this.expectation}" to be displayed in field error element (locator: ${JSON.stringify(this.locator)}), but it was not found. Original error: ${error.message}`
      )
    }

    try {
      await actor.ability.expectElementToContainText(
        '.govuk-error-summary__list',
        this.expectation
      )
    } catch (error) {
      expect.fail(
        `Expected error message "${this.expectation}" to be displayed in error summary list (.govuk-error-summary__list), but it was not found. This suggests the error summary component may not be working correctly. Original error: ${error.message}`
      )
    }
  }
}

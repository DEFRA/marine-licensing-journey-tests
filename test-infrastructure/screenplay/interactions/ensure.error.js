import { expect } from 'chai'
import Task from '../base/task.js'

export default class EnsureError extends Task {
  static is(locator, expectation) {
    return new EnsureError('displayed', locator, expectation)
  }

  static isDisplayed(locator, expectation) {
    return new EnsureError('displayed', locator, expectation)
  }

  static isNotDisplayed(locator, errorText = null) {
    return new EnsureError('not-displayed', locator, errorText)
  }

  static noneOnPage(locators = ['.govuk-error-summary']) {
    return new EnsureError('none-on-page', locators)
  }

  constructor(mode, locator, expectation = null) {
    super()
    this.mode = mode
    this.locator = locator
    this.expectation = expectation
  }

  async performAs(actor) {
    switch (this.mode) {
      case 'displayed':
        await this.verifyErrorDisplayed(actor)
        break
      case 'not-displayed':
        await this.verifyErrorNotDisplayed(actor)
        break
      case 'none-on-page':
        await this.verifyNoErrors(actor)
        break
    }
  }

  async verifyErrorDisplayed(actor) {
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

  async verifyErrorNotDisplayed(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isNotDisplayed(this.locator)
    if (this.expectation) {
      await browseTheWeb.expectElementToNotContainText(
        '.govuk-error-summary__list',
        this.expectation
      )
    }
  }

  async verifyNoErrors(actor) {
    const locators = Array.isArray(this.locator) ? this.locator : [this.locator]
    for (const locator of locators) {
      await actor.ability.isNotDisplayed(locator)
    }
  }
}

import Task from '../base/task.js'

export default class EnsureNoErrorsDisplayed extends Task {
  static onPage() {
    return new EnsureNoErrorsDisplayed()
  }

  async performAs(actor) {
    // Check that no error summary is displayed
    await actor.ability.isNotDisplayed('.govuk-error-summary')

    // Check that no file upload specific error is displayed
    await actor.ability.isNotDisplayed('#file-error')
  }
}

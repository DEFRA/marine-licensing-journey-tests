import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import Task from '../base/task.js'

export default class EnsureMcmsContextCardNotDisplayed extends Task {
  static now() {
    return new EnsureMcmsContextCardNotDisplayed()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isNotDisplayed(
      CheckYourAnswersPage.locators.projectSummary.heading
    )
  }
}

import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import Task from '../base/task.js'

export default class EnsureMcmsContextCardDisplaysOnlyProjectName extends Task {
  static now() {
    return new EnsureMcmsContextCardDisplaysOnlyProjectName()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isDisplayed(
      CheckYourAnswersPage.locators.projectSummary.heading
    )
    await browseTheWeb.isDisplayed(
      CheckYourAnswersPage.locators.projectSummary.projectNameTerm
    )
    await browseTheWeb.isNotDisplayed(
      CheckYourAnswersPage.locators.projectSummary.activityTypeTerm
    )
    await browseTheWeb.isNotDisplayed(
      CheckYourAnswersPage.locators.projectSummary.activityPurposeTerm
    )
    await browseTheWeb.isNotDisplayed(
      CheckYourAnswersPage.locators.projectSummary.exemptionReasonTerm
    )
    await browseTheWeb.isNotDisplayed(
      CheckYourAnswersPage.locators.projectSummary.pdfDownloadTerm
    )
  }
}

import CheckYourAnswersPage from '~/test-infrastructure/pages/check.your.answers.page.js'
import Task from '../../base/task.js'

export default class ClickConfirmAndSend extends Task {
  static now() {
    return new ClickConfirmAndSend()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(
      CheckYourAnswersPage.locators.submission.confirmAndSendButton
    )
  }
}

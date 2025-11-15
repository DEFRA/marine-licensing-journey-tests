import CheckYourAnswersPage from '../../pages/check.your.answers.page.js'
import Task from '../base/task.js'
import { Click } from './index.js'

export default class ChangeProvidingSiteLocation extends Task {
  static fromCheckYourAnswers() {
    return new ChangeProvidingSiteLocation()
  }

  async performAs(actor) {
    await actor.attemptsTo(
      Click.on(CheckYourAnswersPage.locators.providingSiteLocation.changeLink)
    )
  }
}

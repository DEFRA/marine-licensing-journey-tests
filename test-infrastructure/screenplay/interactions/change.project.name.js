import CheckYourAnswersPage from '../../pages/check.your.answers.page.js'
import Task from '../base/task.js'
import CompleteProjectName from '../tasks/complete.project.name.js'
import { Click } from './index.js'

export default class ChangeProjectName extends Task {
  static fromCheckYourAnswers() {
    return new ChangeProjectName()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const { faker } = await import('@faker-js/faker')
    const newProjectName = faker.company.catchPhrase()

    exemption.projectName = newProjectName

    await actor.attemptsTo(
      Click.on(CheckYourAnswersPage.locators.projectSummary.changeLink)
    )
    await actor.attemptsTo(CompleteProjectName.now())
  }
}

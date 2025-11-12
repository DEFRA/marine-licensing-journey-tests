import CheckYourAnswersPage from '../../pages/check.your.answers.page.js'
import Task from '../base/task.js'
import CompletePublicRegisterTask from '../tasks/complete.public.register.js'
import { Click } from './index.js'

export default class ChangeDataSharingConsent extends Task {
  static fromCheckYourAnswers() {
    return new ChangeDataSharingConsent()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const currentConsent = exemption.publicRegister.consent

    exemption.publicRegister = {
      consent: currentConsent !== 'yes',
      reason: currentConsent === 'yes' ? 'Changed my mind about sharing' : ''
    }

    await actor.attemptsTo(
      Click.on(CheckYourAnswersPage.locators.publicRegister.changeLink)
    )
    await actor.attemptsTo(CompletePublicRegisterTask.andSave())
  }
}

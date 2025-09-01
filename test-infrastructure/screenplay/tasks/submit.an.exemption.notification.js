import {
  ApplyForExemption,
  ClickConfirmAndSend,
  ClickReviewAndSend,
  CompleteAllTasks,
  Navigate,
  RememberTheExemptionReferenceNumber,
  SignIn
} from '~/test-infrastructure/screenplay'
import Task from '../base/task.js'

export default class SubmitAnExemptionNotification extends Task {
  static now() {
    return new SubmitAnExemptionNotification()
  }

  async performAs(actor) {
    actor.intendsTo(
      ApplyForExemption.withCompleteData().andSiteDetails.forACircleWithWGS84Coordinates()
    )
    await actor.attemptsTo(Navigate.toTheMarineLicensingApp())
    await actor.attemptsTo(SignIn.now())
    await actor.attemptsTo(CompleteAllTasks.now())
    await actor.attemptsTo(ClickReviewAndSend.now())
    await actor.attemptsTo(ClickConfirmAndSend.now())
    await actor.attemptsTo(RememberTheExemptionReferenceNumber.now())
  }
}

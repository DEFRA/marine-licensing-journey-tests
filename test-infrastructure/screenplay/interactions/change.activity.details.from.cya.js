import CheckYourAnswersPage from '../../pages/check.your.answers.page.js'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import ActivityDatesModel from '../models/activity.dates.model.js'
import CompleteActivityDates from '../tasks/complete.activity.dates.js'
import { Click, ClickButton } from './index.js'

export default class ChangeActivityDetails extends Task {
  static fromCheckYourAnswers() {
    return new ChangeActivityDetails()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const newActivityDates = ActivityDatesModel.generateValidActivityDates()

    exemption.activityDates = newActivityDates

    await actor.attemptsTo(
      Click.on(CheckYourAnswersPage.getActivityDetailsCardChangeLink())
    )
    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.activityDatesChangeLink)
    )
    await actor.attemptsTo(CompleteActivityDates.now())
    await actor.attemptsTo(ClickButton.withText('Continue'))
  }
}

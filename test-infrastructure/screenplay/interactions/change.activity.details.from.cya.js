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

    const activityDetailsChangeLink = `//h2[contains(@class, "govuk-summary-card__title") and contains(text(), "Activity details")]/ancestor::div[contains(@class, "govuk-summary-card")]//a[contains(text(), "Change")]`

    await actor.attemptsTo(Click.on(activityDetailsChangeLink))
    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.activityDatesChangeLink)
    )
    await actor.attemptsTo(CompleteActivityDates.now())
    await actor.attemptsTo(ClickButton.withText('Continue'))
  }
}

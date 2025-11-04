import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import ActivityDatesModel from '../models/activity.dates.model.js'
import CompleteActivityDates from '../tasks/complete.activity.dates.js'
import { Click } from './index.js'

export default class ChangeProjectLevelActivityDates extends Task {
  static now() {
    return new ChangeProjectLevelActivityDates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const newActivityDates = ActivityDatesModel.generateValidActivityDates()

    exemption.activityDates = newActivityDates

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.activityDatesChangeLink)
    )
    await actor.attemptsTo(CompleteActivityDates.now())
  }
}

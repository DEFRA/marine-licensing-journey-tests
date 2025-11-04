import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import ActivityDatesModel from '../models/activity.dates.model.js'
import SameActivityDatesPageInteractions from '../page-interactions/same.activity.dates.page.interactions.js'
import CompleteActivityDates from '../tasks/complete.activity.dates.js'
import { Click } from './index.js'

export default class SwitchToProjectLevelActivityDates extends Task {
  static now() {
    return new SwitchToProjectLevelActivityDates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const newActivityDates = ActivityDatesModel.generateValidActivityDates()

    exemption.activityDates = newActivityDates
    exemption.siteDetails.sameActivityDates = true
    if (exemption.siteDetails?.sites) {
      exemption.siteDetails.sites.forEach((site) => {
        delete site.activityDates
      })
    }

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.sameActivityDatesChangeLink)
    )

    const browseTheWeb = actor.ability
    await SameActivityDatesPageInteractions.selectSameActivityDatesAndContinue(
      browseTheWeb,
      true
    )

    await actor.attemptsTo(CompleteActivityDates.now())
  }
}

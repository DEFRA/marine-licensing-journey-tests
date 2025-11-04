import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import { Click } from './index.js'
import SameActivityDatesPageInteractions from '../page-interactions/same.activity.dates.page.interactions.js'

export default class SwitchToSiteLevelActivityDates extends Task {
  static now() {
    return new SwitchToSiteLevelActivityDates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')

    const projectDates = exemption.activityDates

    exemption.siteDetails.sameActivityDates = false
    delete exemption.activityDates

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.sameActivityDatesChangeLink)
    )

    const browseTheWeb = actor.ability
    await SameActivityDatesPageInteractions.selectSameActivityDatesAndContinue(
      browseTheWeb,
      false
    )

    if (exemption.siteDetails?.sites) {
      exemption.siteDetails.sites.forEach((site) => {
        site.activityDates = projectDates
      })
    }
  }
}

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

    // Capture the existing project-level dates before clearing them
    const projectDates = exemption.activityDates

    // Update flags
    exemption.siteDetails.sameActivityDates = false
    delete exemption.activityDates

    // Navigate to change page
    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.sameActivityDatesChangeLink)
    )

    // Select "No" for same activity dates
    // Per AC3: app returns directly to review page and cascades existing dates to all sites
    const browseTheWeb = actor.ability
    await SameActivityDatesPageInteractions.selectSameActivityDatesAndContinue(
      browseTheWeb,
      false
    )

    // Cascade the existing project-level dates to all sites
    if (exemption.siteDetails?.sites) {
      exemption.siteDetails.sites.forEach((site) => {
        site.activityDates = projectDates
      })
    }
  }
}

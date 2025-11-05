import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import { Click } from './index.js'
import SameActivityDescriptionPageInteractions from '../page-interactions/same.activity.description.page.interactions.js'

export default class SwitchToSiteLevelActivityDescriptions extends Task {
  static now() {
    return new SwitchToSiteLevelActivityDescriptions()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const existingDescription = exemption.activityDescription

    delete exemption.activityDescription
    exemption.siteDetails.sameActivityDescription = false

    if (exemption.siteDetails?.sites) {
      exemption.siteDetails.sites.forEach((site) => {
        site.activityDescription = existingDescription
      })
    }

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.sameActivityDescriptionChangeLink)
    )

    const browseTheWeb = actor.ability
    await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
      browseTheWeb,
      false
    )
  }
}

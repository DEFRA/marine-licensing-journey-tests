import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import ActivityDescriptionModel from '../models/activity.description.model.js'
import CompleteActivityDescription from '../tasks/complete.activity.description.js'
import { Click } from './index.js'
import SameActivityDescriptionPageInteractions from '../page-interactions/same.activity.description.page.interactions.js'

export default class SwitchToProjectLevelActivityDescriptions extends Task {
  static now() {
    return new SwitchToProjectLevelActivityDescriptions()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const newActivityDescription =
      ActivityDescriptionModel.generateActivityDescription()

    exemption.activityDescription = newActivityDescription
    exemption.siteDetails.sameActivityDescription = true
    if (exemption.siteDetails?.sites) {
      exemption.siteDetails.sites.forEach((site) => {
        delete site.activityDescription
      })
    }

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.sameActivityDescriptionChangeLink)
    )

    const browseTheWeb = actor.ability
    await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
      browseTheWeb,
      true
    )

    await actor.attemptsTo(CompleteActivityDescription.now())
  }
}

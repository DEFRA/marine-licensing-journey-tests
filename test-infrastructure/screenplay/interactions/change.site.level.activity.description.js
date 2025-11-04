import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import ActivityDescriptionModel from '../models/activity.description.model.js'
import CompleteActivityDescription from '../tasks/complete.activity.description.js'
import { Click } from './index.js'

export default class ChangeSiteLevelActivityDescription extends Task {
  constructor(siteNumber) {
    super()
    this.siteNumber = siteNumber
  }

  static forSite(siteNumber) {
    return new ChangeSiteLevelActivityDescription(siteNumber)
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const siteIndex = this.siteNumber - 1
    const newActivityDescription =
      ActivityDescriptionModel.generateActivityDescription()

    delete exemption.activityDescription
    if (exemption.siteDetails?.sites?.[siteIndex]) {
      exemption.siteDetails.sites[siteIndex].activityDescription =
        newActivityDescription
    }

    await actor.attemptsTo(
      Click.on(
        ReviewSiteDetailsPage.getSiteActivityDescriptionChangeLink(
          this.siteNumber
        )
      )
    )
    await actor.attemptsTo(CompleteActivityDescription.forSite(this.siteNumber))
  }
}

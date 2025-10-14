import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import { ActivityDescriptionPageInteractions } from '../page-interactions/index.js'

export default class AddMissingActivityDescription extends Task {
  constructor(siteNumber, activityDescription) {
    super()
    this.siteNumber = siteNumber
    this.activityDescription = activityDescription
  }

  static forSite(siteNumber, activityDescription) {
    return new AddMissingActivityDescription(siteNumber, activityDescription)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    const addLink = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteActivityDescriptionAddLink(this.siteNumber)
    )
    await addLink.click()

    await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
      browseTheWeb,
      this.activityDescription
    )
  }
}

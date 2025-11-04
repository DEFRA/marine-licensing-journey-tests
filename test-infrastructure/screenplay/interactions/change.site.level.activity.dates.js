import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import ActivityDatesModel from '../models/activity.dates.model.js'
import CompleteActivityDates from '../tasks/complete.activity.dates.js'
import { Click } from './index.js'

export default class ChangeSiteLevelActivityDates extends Task {
  constructor(siteNumber) {
    super()
    this.siteNumber = siteNumber
  }

  static forSite(siteNumber) {
    return new ChangeSiteLevelActivityDates(siteNumber)
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const siteIndex = this.siteNumber - 1
    const newActivityDates = ActivityDatesModel.generateValidActivityDates()

    delete exemption.activityDates
    if (exemption.siteDetails?.sites?.[siteIndex]) {
      exemption.siteDetails.sites[siteIndex].activityDates = newActivityDates
    }

    await actor.attemptsTo(
      Click.on(
        ReviewSiteDetailsPage.getSiteActivityDatesChangeLink(this.siteNumber)
      )
    )
    await actor.attemptsTo(CompleteActivityDates.forSite(this.siteNumber))
  }
}

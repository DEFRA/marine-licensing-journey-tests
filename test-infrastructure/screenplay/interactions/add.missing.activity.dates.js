import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import CompleteActivityDates from '../tasks/complete.activity.dates.js'

export default class AddMissingActivityDates extends Task {
  constructor(siteNumber) {
    super()
    this.siteNumber = siteNumber
  }

  static forSite(siteNumber) {
    return new AddMissingActivityDates(siteNumber)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    const addLink = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteActivityDatesAddLink(this.siteNumber)
    )
    await addLink.click()

    await actor.attemptsTo(CompleteActivityDates.forSite(this.siteNumber))
  }
}

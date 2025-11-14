import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import EnterCoordinatesCentrePointPageInteractions from '../page-interactions/enter.coordinates.centre.point.page.interactions.js'
import { Click } from './index.js'

export default class ChangeCentrePointCoordinates extends Task {
  static now() {
    return new ChangeCentrePointCoordinates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const site = exemption.siteDetails?.sites?.[0]

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.coordinatesAtCentreChangeLink)
    )
    await EnterCoordinatesCentrePointPageInteractions.updateCircleCoordinates(
      browseTheWeb,
      site
    )
  }
}

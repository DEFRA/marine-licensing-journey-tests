import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import WidthOfCircularSitePageInteractions from '../page-interactions/width.of.circular.site.page.interactions.js'
import { Click } from './index.js'

export default class ChangeCircleWidth extends Task {
  static now() {
    return new ChangeCircleWidth()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const newWidth = '25'

    if (exemption.siteDetails?.sites?.[0]) {
      exemption.siteDetails.sites[0].circleData.width = newWidth
    }

    await actor.attemptsTo(Click.on(ReviewSiteDetailsPage.widthChangeLink))
    await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
      browseTheWeb,
      newWidth
    )
  }
}

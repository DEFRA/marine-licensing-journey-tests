import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import EnterCoordinatesCentrePointPageInteractions from '../page-interactions/enter.coordinates.centre.point.page.interactions.js'
import WhatCoordinateSystemPageInteractions from '../page-interactions/what.coordinate.system.page.interactions.js'
import WidthOfCircularSitePageInteractions from '../page-interactions/width.of.circular.site.page.interactions.js'
import { Click } from './index.js'

export default class ChangeCircularSiteCoordinateSystem extends Task {
  static now() {
    return new ChangeCircularSiteCoordinateSystem()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const site = exemption.siteDetails?.sites?.[0]

    const newCoordinateSystem =
      site?.coordinateSystem === 'WGS84' ? 'OSGB36' : 'WGS84'
    site.coordinateSystem = newCoordinateSystem

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.coordinateSystemChangeLink)
    )
    await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
      browseTheWeb,
      newCoordinateSystem
    )
    await EnterCoordinatesCentrePointPageInteractions.updateCircleCoordinates(
      browseTheWeb,
      site,
      newCoordinateSystem
    )
    await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
      browseTheWeb,
      site.circleData.width.toString()
    )
  }
}

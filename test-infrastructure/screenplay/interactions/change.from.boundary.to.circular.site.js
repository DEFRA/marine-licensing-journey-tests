import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import EnterCoordinatesCentrePointPageInteractions from '../page-interactions/enter.coordinates.centre.point.page.interactions.js'
import HowDoYouWantToEnterTheCoordinatesPageInteractions from '../page-interactions/how.do.you.want.to.enter.the.coordinates.page.interactions.js'
import WhatCoordinateSystemPageInteractions from '../page-interactions/what.coordinate.system.page.interactions.js'
import WidthOfCircularSitePageInteractions from '../page-interactions/width.of.circular.site.page.interactions.js'
import { Click } from './index.js'

export default class ChangeFromBoundaryToCircularSite extends Task {
  static now() {
    return new ChangeFromBoundaryToCircularSite()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const site = exemption.siteDetails?.sites?.[0]

    site.siteType = 'circle'
    delete site.coordinates

    const coordinateSystem = site.coordinateSystem || 'WGS84'
    site.circleData = {
      width: '20'
    }

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.singleOrMultipleCoordinatesChangeLink)
    )
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
      browseTheWeb,
      'circle'
    )
    await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
      browseTheWeb,
      coordinateSystem
    )
    await EnterCoordinatesCentrePointPageInteractions.updateCircleCoordinates(
      browseTheWeb,
      site,
      coordinateSystem
    )
    await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
      browseTheWeb,
      site.circleData.width
    )
  }
}

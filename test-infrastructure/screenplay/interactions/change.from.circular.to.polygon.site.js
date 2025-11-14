import EnterMultipleCoordinatesPage from '../../pages/enter.multiple.coordinates.page.js'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import EnterMultipleCoordinatesPageInteractions from '../page-interactions/enter.multiple.coordinates.page.interactions.js'
import HowDoYouWantToEnterTheCoordinatesPageInteractions from '../page-interactions/how.do.you.want.to.enter.the.coordinates.page.interactions.js'
import WhatCoordinateSystemPageInteractions from '../page-interactions/what.coordinate.system.page.interactions.js'
import { Click } from './index.js'

export default class ChangeFromCircularToPolygonSite extends Task {
  static now() {
    return new ChangeFromCircularToPolygonSite()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const site = exemption.siteDetails?.sites?.[0]

    site.siteType = 'boundary'
    delete site.circleData

    const coordinateSystem = site.coordinateSystem || 'WGS84'
    const coords =
      coordinateSystem === 'WGS84'
        ? [
            { latitude: '50.000000', longitude: '-1.000000' },
            { latitude: '50.001000', longitude: '-0.999000' },
            { latitude: '50.000500', longitude: '-0.999500' }
          ]
        : [
            { eastings: '432675', northings: '181310' },
            { eastings: '433000', northings: '181500' },
            { eastings: '432800', northings: '181700' }
          ]

    site.coordinates = coords

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.singleOrMultipleCoordinatesChangeLink)
    )
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
      browseTheWeb,
      'boundary'
    )
    await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
      browseTheWeb,
      coordinateSystem
    )
    await EnterMultipleCoordinatesPageInteractions.enterCoordinates(
      browseTheWeb,
      coordinateSystem,
      coords
    )
    await browseTheWeb.click(EnterMultipleCoordinatesPage.continueButton)
  }
}

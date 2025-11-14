import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import EnterMultipleCoordinatesPage from '../../pages/enter.multiple.coordinates.page.js'
import Task from '../base/task.js'
import EnterMultipleCoordinatesPageInteractions from '../page-interactions/enter.multiple.coordinates.page.interactions.js'
import { Click } from './index.js'

export default class ChangeBoundaryCoordinates extends Task {
  static now() {
    return new ChangeBoundaryCoordinates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const site = exemption.siteDetails?.sites?.[0]

    const coordinateSystem = site?.coordinateSystem || 'WGS84'
    const coords =
      coordinateSystem === 'WGS84'
        ? [
            { latitude: '51.000000', longitude: '-1.500000' },
            { latitude: '51.001000', longitude: '-1.499000' },
            { latitude: '51.000500', longitude: '-1.499500' }
          ]
        : [
            { eastings: '435000', northings: '185000' },
            { eastings: '435500', northings: '185500' },
            { eastings: '435200', northings: '185800' }
          ]

    site.coordinates = coords

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.startAndEndPointsChangeLink)
    )
    await EnterMultipleCoordinatesPageInteractions.enterCoordinates(
      browseTheWeb,
      coordinateSystem,
      coords
    )
    await browseTheWeb.click(EnterMultipleCoordinatesPage.continueButton)
  }
}

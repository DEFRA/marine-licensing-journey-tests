import { expect } from 'chai'
import Task from '../base/task.js'
import {
  HowDoYouWantToEnterTheCoordinatesPageInteractions,
  HowDoYouWantToProvideCoordinatesPageInteractions,
  WhatCoordinateSystemPageInteractions
} from '../page-interactions/index.js'

export default class NavigateToSiteDetailsPage extends Task {
  static coordinatesEntryMethod() {
    return new NavigateToSiteDetailsPage('coordinates-entry-method')
  }

  static coordinateSystem() {
    return new NavigateToSiteDetailsPage('coordinate-system')
  }

  static andSelectWGS84() {
    return new NavigateToSiteDetailsPage('select-wgs84-only')
  }

  constructor(targetPage) {
    super()
    this.targetPage = targetPage
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    switch (this.targetPage) {
      case 'coordinates-entry-method':
        await HowDoYouWantToProvideCoordinatesPageInteractions.navigateToCoordinatesEntryMethod(
          browseTheWeb
        )
        break
      case 'coordinate-system':
        await this.navigateToCoordinateSystem(browseTheWeb)
        break
      case 'coordinate-system-with-wgs84':
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectWGS84(browseTheWeb)
        break
      case 'select-wgs84-only':
        await WhatCoordinateSystemPageInteractions.selectWGS84(browseTheWeb)
        break
      default:
        expect.fail(`Unknown target page: ${this.targetPage}`)
    }
  }

  async navigateToCoordinateSystem(browseTheWeb) {
    await HowDoYouWantToProvideCoordinatesPageInteractions.navigateToCoordinatesEntryMethod(
      browseTheWeb
    )
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectCircularSiteAndContinue(
      browseTheWeb
    )
  }
}

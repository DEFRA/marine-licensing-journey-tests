import { expect } from 'chai'
import Task from '../base/task.js'
import {
  EnterCoordinatesCentrePointPageInteractions,
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

  static enterWGS84Coordinates() {
    return new NavigateToSiteDetailsPage('enter-wgs84-coordinates')
  }

  static enterOSGB36Coordinates() {
    return new NavigateToSiteDetailsPage('enter-osgb36-coordinates')
  }

  static enterWidthOfCircle() {
    return new NavigateToSiteDetailsPage('enter-width-of-circle')
  }

  static enterWGS84CoordinatesPageOnly() {
    return new NavigateToSiteDetailsPage('enter-wgs84-coordinates-page-only')
  }

  static enterOSGB36CoordinatesPageOnly() {
    return new NavigateToSiteDetailsPage('enter-osgb36-coordinates-page-only')
  }

  constructor(targetPage) {
    super()
    this.targetPage = targetPage
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    switch (this.targetPage) {
      case 'coordinates-entry-method':
        await HowDoYouWantToProvideCoordinatesPageInteractions.navigateToCoordinatesEntryMethod(
          browseTheWeb
        )
        break
      case 'coordinate-system':
        await this.navigateToCoordinateSystem(browseTheWeb)
        break
      case 'select-wgs84-only':
        await WhatCoordinateSystemPageInteractions.selectWGS84(browseTheWeb)
        break
      case 'enter-wgs84-coordinates':
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectWGS84AndContinue(
          browseTheWeb
        )
        if (siteDetails?.circleData) {
          await EnterCoordinatesCentrePointPageInteractions.enterCircleCoordinates(
            browseTheWeb,
            siteDetails
          )
        }
        break
      case 'enter-osgb36-coordinates':
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectOSGB36AndContinue(
          browseTheWeb
        )
        break
      case 'enter-wgs84-coordinates-page-only':
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectWGS84AndContinue(
          browseTheWeb
        )
        // Stop here - don't enter any coordinates (for validation testing)
        break
      case 'enter-osgb36-coordinates-page-only':
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectOSGB36AndContinue(
          browseTheWeb
        )
        // Stop here - don't enter any coordinates (for validation testing)
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

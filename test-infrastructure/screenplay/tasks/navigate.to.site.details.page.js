import { expect } from 'chai'
import Task from '../base/task.js'
import {
  DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions,
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

  static enterPolygonOSGB36CoordinatesPageOnly() {
    return new NavigateToSiteDetailsPage(
      'enter-polygon-osgb36-coordinates-page-only'
    )
  }

  static enterPolygonWGS84CoordinatesPageOnly() {
    return new NavigateToSiteDetailsPage(
      'enter-polygon-wgs84-coordinates-page-only'
    )
  }

  constructor(targetPage) {
    super()
    this.targetPage = targetPage
    this.navigationStrategies = this.createNavigationStrategies()
  }

  createNavigationStrategies() {
    return {
      'coordinates-entry-method': async (browseTheWeb) => {
        await HowDoYouWantToProvideCoordinatesPageInteractions.navigateToCoordinatesEntryMethod(
          browseTheWeb
        )
        await DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions.selectNoAndContinue(
          browseTheWeb
        )
      },
      'coordinate-system': async (browseTheWeb) => {
        await this.navigateToCoordinateSystem(browseTheWeb)
      },
      'select-wgs84-only': async (browseTheWeb) => {
        await WhatCoordinateSystemPageInteractions.selectWGS84(browseTheWeb)
      },
      'enter-wgs84-coordinates': async (browseTheWeb, siteDetails) => {
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
      },
      'enter-osgb36-coordinates': async (browseTheWeb) => {
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectOSGB36AndContinue(
          browseTheWeb
        )
      },
      'enter-wgs84-coordinates-page-only': async (browseTheWeb) => {
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectWGS84AndContinue(
          browseTheWeb
        )
      },
      'enter-osgb36-coordinates-page-only': async (browseTheWeb) => {
        await this.navigateToCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectOSGB36AndContinue(
          browseTheWeb
        )
      },
      'enter-polygon-osgb36-coordinates-page-only': async (browseTheWeb) => {
        await this.navigateToTriangleCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectOSGB36AndContinue(
          browseTheWeb
        )
      },
      'enter-polygon-wgs84-coordinates-page-only': async (browseTheWeb) => {
        await this.navigateToTriangleCoordinateSystem(browseTheWeb)
        await WhatCoordinateSystemPageInteractions.selectWGS84AndContinue(
          browseTheWeb
        )
      }
    }
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    const navigationStrategy = this.navigationStrategies[this.targetPage]

    if (!navigationStrategy) {
      expect.fail(`Unknown target page: ${this.targetPage}`)
    }

    await navigationStrategy(browseTheWeb, siteDetails)
  }

  async navigateToCoordinateSystem(browseTheWeb) {
    await this.navigateToSiteTypeSelection(browseTheWeb)
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectCircularSiteAndContinue(
      browseTheWeb
    )
  }

  async navigateToTriangleCoordinateSystem(browseTheWeb) {
    await this.navigateToSiteTypeSelection(browseTheWeb)
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
      browseTheWeb,
      'triangle'
    )
  }

  async navigateToSiteTypeSelection(browseTheWeb) {
    await HowDoYouWantToProvideCoordinatesPageInteractions.navigateToCoordinatesEntryMethod(
      browseTheWeb
    )
    await DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions.selectNoAndContinue(
      browseTheWeb
    )
  }
}

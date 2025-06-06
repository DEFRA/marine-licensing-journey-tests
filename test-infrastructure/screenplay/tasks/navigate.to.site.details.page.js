import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page.js'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page.js'
import Task from '../base/task.js'
import { expect } from 'chai'

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
        await this.navigateToCoordinatesEntryMethod(browseTheWeb)
        break
      case 'coordinate-system':
        await this.navigateToCoordinateSystem(browseTheWeb)
        break
      case 'coordinate-system-with-wgs84':
        await this.navigateToCoordinateSystem(browseTheWeb)
        await this.selectWGS84CoordinateSystem(browseTheWeb)
        break
      case 'select-wgs84-only':
        await this.selectWGS84CoordinateSystem(browseTheWeb)
        break
      default:
        expect.fail(`Unknown target page: ${this.targetPage}`)
    }
  }

  async navigateToCoordinatesEntryMethod(browseTheWeb) {
    // Choose to enter coordinates manually and continue
    await browseTheWeb.click(
      HowDoYouWantToProvideCoordinatesPage.enterCoordinates
    )
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)
  }

  async navigateToCoordinateSystem(browseTheWeb) {
    // Navigate through: manual entry -> circular site -> coordinate system page
    await this.navigateToCoordinatesEntryMethod(browseTheWeb)
    await browseTheWeb.click(HowDoYouWantToEnterTheCoordinatesPage.circularSite)
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)
  }

  async selectWGS84CoordinateSystem(browseTheWeb) {
    await browseTheWeb.click(WhatCoordinateSystemPage.wgs84)
  }
}

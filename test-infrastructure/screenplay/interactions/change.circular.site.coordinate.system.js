import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import WhatCoordinateSystemPage from '../../pages/what.coordinate.system.page.js'
import EnterCoordinatesCentrePointPage from '../../pages/enter.coordinates.centre.point.js'
import WidthOfCircularSitePage from '../../pages/width.of.circular.site.page.js'
import CommonElementsPage from '../../pages/common.elements.page.js'
import Task from '../base/task.js'

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

    let newCoords
    if (newCoordinateSystem === 'WGS84') {
      newCoords = {
        latitude: (Math.random() * 5 + 50).toFixed(6),
        longitude: (Math.random() * 2 - 1).toFixed(6)
      }
    } else {
      newCoords = {
        eastings: Math.floor(Math.random() * 10000 + 430000),
        northings: Math.floor(Math.random() * 10000 + 180000)
      }
    }
    site.coordinates = [newCoords]

    await browseTheWeb.click(
      ReviewSiteDetailsPage.coordinateSystemValue +
        '/following-sibling::dd//a[text()="Change"]'
    )

    const coordinateSystemSelector =
      WhatCoordinateSystemPage.getCoordinateSystemSelector(newCoordinateSystem)
    await browseTheWeb.click(coordinateSystemSelector)
    await browseTheWeb.click(WhatCoordinateSystemPage.saveAndContinue)

    if (newCoordinateSystem === 'WGS84') {
      await browseTheWeb.sendKeys(
        EnterCoordinatesCentrePointPage.latitudeInput,
        newCoords.latitude
      )
      await browseTheWeb.sendKeys(
        EnterCoordinatesCentrePointPage.longitudeInput,
        newCoords.longitude
      )
    } else {
      await browseTheWeb.sendKeys(
        EnterCoordinatesCentrePointPage.eastingsInput,
        newCoords.eastings.toString()
      )
      await browseTheWeb.sendKeys(
        EnterCoordinatesCentrePointPage.northingsInput,
        newCoords.northings.toString()
      )
    }

    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)

    await browseTheWeb.sendKeys(
      WidthOfCircularSitePage.widthInput,
      site.circleData.width.toString()
    )
    await browseTheWeb.click(WidthOfCircularSitePage.saveAndContinueButton)
  }
}

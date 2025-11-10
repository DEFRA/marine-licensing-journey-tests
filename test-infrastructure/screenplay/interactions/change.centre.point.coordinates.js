import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import EnterCoordinatesCentrePointPage from '../../pages/enter.coordinates.centre.point.js'
import CommonElementsPage from '../../pages/common.elements.page.js'
import Task from '../base/task.js'

export default class ChangeCentrePointCoordinates extends Task {
  static now() {
    return new ChangeCentrePointCoordinates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const site = exemption.siteDetails?.sites?.[0]

    let newCoords
    if (site?.coordinateSystem === 'WGS84') {
      newCoords = {
        latitude: (Math.random() * 5 + 50).toFixed(6),
        longitude: (Math.random() * 2 - 1).toFixed(6)
      }
      site.coordinates = [newCoords]
    } else {
      newCoords = {
        eastings: Math.floor(Math.random() * 10000 + 430000),
        northings: Math.floor(Math.random() * 10000 + 180000)
      }
      site.coordinates = [newCoords]
    }

    await browseTheWeb.click(
      ReviewSiteDetailsPage.coordinatesAtCentreOfSiteValue +
        '/following-sibling::dd//a[text()="Change"]'
    )

    if (site?.coordinateSystem === 'WGS84') {
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
  }
}

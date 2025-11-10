import HowDoYouWantToEnterTheCoordinatesPage from '../../pages/how.do.you.want.to.enter.the.coordinates.page.js'
import WhatCoordinateSystemPage from '../../pages/what.coordinate.system.page.js'
import EnterMultipleCoordinatesPage from '../../pages/enter.multiple.coordinates.page.js'
import Task from '../base/task.js'

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
    let coords
    if (coordinateSystem === 'WGS84') {
      coords = [
        {
          latitude: (Math.random() * 5 + 50).toFixed(6),
          longitude: (Math.random() * 2 - 1).toFixed(6)
        },
        {
          latitude: (Math.random() * 5 + 50).toFixed(6),
          longitude: (Math.random() * 2 - 1).toFixed(6)
        },
        {
          latitude: (Math.random() * 5 + 50).toFixed(6),
          longitude: (Math.random() * 2 - 1).toFixed(6)
        }
      ]
    } else {
      coords = [
        {
          eastings: Math.floor(Math.random() * 10000 + 430000),
          northings: Math.floor(Math.random() * 10000 + 180000)
        },
        {
          eastings: Math.floor(Math.random() * 10000 + 430000),
          northings: Math.floor(Math.random() * 10000 + 180000)
        },
        {
          eastings: Math.floor(Math.random() * 10000 + 430000),
          northings: Math.floor(Math.random() * 10000 + 180000)
        }
      ]
    }
    site.coordinates = coords

    await browseTheWeb.click(
      `//dt[contains(text(), "Single or multiple sets of coordinates")]/following-sibling::dd/following-sibling::dd//a[text()="Change"]`
    )

    await browseTheWeb.click(HowDoYouWantToEnterTheCoordinatesPage.boundarySite)
    await browseTheWeb.click(
      HowDoYouWantToEnterTheCoordinatesPage.saveAndContinue
    )

    const coordinateSystemSelector =
      WhatCoordinateSystemPage.getCoordinateSystemSelector(coordinateSystem)
    await browseTheWeb.click(coordinateSystemSelector)
    await browseTheWeb.click(WhatCoordinateSystemPage.saveAndContinue)

    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i]
      if (coordinateSystem === 'WGS84') {
        await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.latitudeInput(i),
          coord.latitude
        )
        await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.longitudeInput(i),
          coord.longitude
        )
      } else {
        await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.eastingsInput(i),
          coord.eastings.toString()
        )
        await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.northingsInput(i),
          coord.northings.toString()
        )
      }
    }

    await browseTheWeb.click(EnterMultipleCoordinatesPage.continueButton)
  }
}

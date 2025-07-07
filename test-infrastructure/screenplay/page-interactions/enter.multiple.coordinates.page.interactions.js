import EnterMultipleCoordinatesPage from '~/test-infrastructure/pages/enter.multiple.coordinates.page.js'

export default class EnterMultipleCoordinatesPageInteractions {
  static async enterPolygonCoordinates(browseTheWeb, siteDetails) {
    const { coordinateSystem, polygonData } = siteDetails

    if (!polygonData?.coordinates) {
      return
    }

    const coordinates = polygonData.coordinates.slice(0, 3) // Take only first 3 points for triangle

    await this.enterCoordinates(browseTheWeb, coordinateSystem, coordinates)
  }

  static async enterCoordinates(browseTheWeb, coordinateSystem, coordinates) {
    if (coordinateSystem === 'WGS84') {
      await this.enterWGS84Coordinates(browseTheWeb, coordinates)
    } else if (coordinateSystem === 'OSGB36') {
      await this.enterOSGB36Coordinates(browseTheWeb, coordinates)
    }
  }

  static async enterWGS84Coordinates(browseTheWeb, coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i]
      coordinate.latitude &&
        (await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.latitudeInput(i),
          coordinate.latitude
        ))
      coordinate.longitude &&
        (await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.longitudeInput(i),
          coordinate.longitude
        ))
    }
  }

  static async enterOSGB36Coordinates(browseTheWeb, coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i]
      coordinate.eastings &&
        (await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.eastingsInput(i),
          coordinate.eastings
        ))
      coordinate.northings &&
        (await browseTheWeb.sendKeys(
          EnterMultipleCoordinatesPage.northingsInput(i),
          coordinate.northings
        ))
    }
  }

  static async enterPolygonCoordinatesAndContinue(browseTheWeb, siteDetails) {
    await this.enterPolygonCoordinates(browseTheWeb, siteDetails)
    await browseTheWeb.click(EnterMultipleCoordinatesPage.continueButton)
  }
}

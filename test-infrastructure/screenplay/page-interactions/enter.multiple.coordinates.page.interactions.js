import EnterMultipleCoordinatesPage from '~/test-infrastructure/pages/enter.multiple.coordinates.page.js'

export default class EnterMultipleCoordinatesPageInteractions {
  static async enterPolygonCoordinates(
    browseTheWeb,
    siteDetails,
    useAddAnotherPoint = false
  ) {
    const { coordinateSystem, polygonData } = siteDetails

    if (!polygonData?.coordinates) {
      return
    }

    let coordinates
    if (useAddAnotherPoint) {
      coordinates = polygonData.coordinates
    } else {
      coordinates = polygonData.coordinates.slice(0, 3)
    }

    await this.enterCoordinatesWithAddAnotherPoint(
      browseTheWeb,
      coordinateSystem,
      coordinates,
      useAddAnotherPoint
    )
  }

  static async enterCoordinates(browseTheWeb, coordinateSystem, coordinates) {
    if (coordinateSystem === 'WGS84') {
      await this.enterWGS84Coordinates(browseTheWeb, coordinates)
    } else if (coordinateSystem === 'OSGB36') {
      await this.enterOSGB36Coordinates(browseTheWeb, coordinates)
    }
  }

  static async enterCoordinatesWithAddAnotherPoint(
    browseTheWeb,
    coordinateSystem,
    coordinates,
    useAddAnotherPoint
  ) {
    await this.enterCoordinates(
      browseTheWeb,
      coordinateSystem,
      coordinates.slice(0, 3)
    )

    if (useAddAnotherPoint && coordinates.length > 3) {
      await this.addAdditionalCoordinates(
        browseTheWeb,
        coordinateSystem,
        coordinates.slice(3)
      )
    }
  }

  static async addAdditionalCoordinates(
    browseTheWeb,
    coordinateSystem,
    additionalCoordinates
  ) {
    for (let i = 0; i < additionalCoordinates.length; i++) {
      await browseTheWeb.click(
        EnterMultipleCoordinatesPage.addAnotherPointButton
      )
      await this.enterSingleCoordinate(
        browseTheWeb,
        coordinateSystem,
        additionalCoordinates[i],
        3 + i
      )
    }
  }

  static async enterSingleCoordinate(
    browseTheWeb,
    coordinateSystem,
    coordinate,
    coordinateIndex
  ) {
    if (coordinateSystem === 'WGS84') {
      await this.enterWGS84Coordinate(browseTheWeb, coordinate, coordinateIndex)
    } else if (coordinateSystem === 'OSGB36') {
      await this.enterOSGB36Coordinate(
        browseTheWeb,
        coordinate,
        coordinateIndex
      )
    }
  }

  static async enterWGS84Coordinate(browseTheWeb, coordinate, coordinateIndex) {
    await this.enterCoordinateField(
      browseTheWeb,
      coordinate.latitude,
      EnterMultipleCoordinatesPage.latitudeInput(coordinateIndex)
    )
    await this.enterCoordinateField(
      browseTheWeb,
      coordinate.longitude,
      EnterMultipleCoordinatesPage.longitudeInput(coordinateIndex)
    )
  }

  static async enterOSGB36Coordinate(
    browseTheWeb,
    coordinate,
    coordinateIndex
  ) {
    await this.enterCoordinateField(
      browseTheWeb,
      coordinate.eastings,
      EnterMultipleCoordinatesPage.eastingsInput(coordinateIndex)
    )
    await this.enterCoordinateField(
      browseTheWeb,
      coordinate.northings,
      EnterMultipleCoordinatesPage.northingsInput(coordinateIndex)
    )
  }

  static async enterCoordinateField(browseTheWeb, value, selector) {
    value && (await browseTheWeb.sendKeys(selector, value))
  }

  static async enterWGS84Coordinates(browseTheWeb, coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      await this.enterWGS84Coordinate(browseTheWeb, coordinates[i], i)
    }
  }

  static async enterOSGB36Coordinates(browseTheWeb, coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      await this.enterOSGB36Coordinate(browseTheWeb, coordinates[i], i)
    }
  }

  static async enterPolygonCoordinatesAndContinue(browseTheWeb, siteDetails) {
    await this.enterPolygonCoordinates(browseTheWeb, siteDetails)
    await browseTheWeb.click(EnterMultipleCoordinatesPage.continueButton)
  }
}

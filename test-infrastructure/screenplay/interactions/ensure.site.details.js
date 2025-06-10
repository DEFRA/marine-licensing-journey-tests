import Task from '../base/task.js'
import expect from 'chai'

/**
 * Ensures that the site details displayed on the review page match the expected data.
 * Supports both WGS84 (latitude/longitude) and OSGB36 (eastings/northings) coordinate systems.
 */
export default class EnsureSiteDetails extends Task {
  static areCorrect() {
    return new EnsureSiteDetails()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    const siteDetails = this._getSiteDetailsData(actor)

    await this._verifyMethodOfProvidingSiteLocation(browseTheWeb)
    await this._verifyCoordinateSystem(browseTheWeb, siteDetails)
    await this._verifyCoordinatesAtCentreOfSite(browseTheWeb, siteDetails)
    await this._verifyWidthOfCircularSite(browseTheWeb, siteDetails)
  }

  /**
   * Retrieves site details data from the actor's memory
   */
  _getSiteDetailsData(actor) {
    const exemption = actor.recalls('exemption')

    if (!exemption) {
      expect.Fail('No exemption data available for verification')
    }

    if (!exemption.siteDetails) {
      expect.Fail('No site details data available for verification')
    }

    return exemption.siteDetails
  }

  /**
   * Verifies that the method of providing site location is correctly displayed
   */
  async _verifyMethodOfProvidingSiteLocation(browseTheWeb) {
    const expectedMethod =
      'Manually enter one set of coordinates and a width to create a circular site'

    // Use XPath to find the dt element by text and then get its following dd sibling
    const valueElement = await browseTheWeb.getElement(
      '//dt[contains(text(), "Method of providing site location")]/following-sibling::dd'
    )
    await valueElement.waitForExist()

    const actualValue = await valueElement.getText()

    if (!actualValue.includes(expectedMethod)) {
      expect.Fail(
        `Expected method "${expectedMethod}" but found "${actualValue}"`
      )
    }
  }

  /**
   * Verifies that the coordinate system is correctly displayed based on the site details
   */
  async _verifyCoordinateSystem(browseTheWeb, siteDetails) {
    // The display format includes technical name and descriptive text
    let expectedSystem
    if (siteDetails.coordinateSystem === 'WGS84') {
      expectedSystem = 'WGS84 (World Geodetic System 1984)'
    } else if (siteDetails.coordinateSystem === 'OSGB36') {
      expectedSystem = 'OSGB36 (National Grid)'
    } else {
      expect.Fail(`Unknown coordinate system: ${siteDetails.coordinateSystem}`)
    }

    // Use XPath to find the dt element by text and then get its following dd sibling
    const valueElement = await browseTheWeb.getElement(
      '//dt[contains(text(), "Coordinate system")]/following-sibling::dd'
    )
    await valueElement.waitForExist()

    const actualValue = await valueElement.getText()

    if (!actualValue.includes(expectedSystem)) {
      expect.Fail(
        `Expected coordinate system "${expectedSystem}" but found "${actualValue}"`
      )
    }
  }

  /**
   * Verifies the coordinates are displayed correctly based on the coordinate system
   */
  async _verifyCoordinatesAtCentreOfSite(browseTheWeb, siteDetails) {
    const { coordinateSystem, circleData } = siteDetails

    let expectedCoordinates
    if (coordinateSystem === 'WGS84') {
      expectedCoordinates = `${circleData.latitude}, ${circleData.longitude}`
    } else if (coordinateSystem === 'OSGB36') {
      expectedCoordinates = `${circleData.eastings}, ${circleData.northings}`
    } else {
      expect.Fail(`Unknown coordinate system: ${coordinateSystem}`)
    }

    // Use XPath to find the dt element by text and then get its following dd sibling
    const valueElement = await browseTheWeb.getElement(
      '//dt[contains(text(), "Coordinates at centre of site")]/following-sibling::dd'
    )
    await valueElement.waitForExist()

    const actualValue = await valueElement.getText()

    if (!actualValue.includes(expectedCoordinates)) {
      expect.Fail(
        `Expected coordinates "${expectedCoordinates}" but found "${actualValue}"`
      )
    }
  }

  /**
   * Verifies the width of the circular site is displayed correctly
   */
  async _verifyWidthOfCircularSite(browseTheWeb, siteDetails) {
    const { circleData } = siteDetails
    const expectedWidth = `${circleData.width} metres`

    // Use XPath to find the dt element by text and then get its following dd sibling
    const valueElement = await browseTheWeb.getElement(
      '//dt[contains(text(), "Width of circular site")]/following-sibling::dd'
    )
    await valueElement.waitForExist()

    const actualValue = await valueElement.getText()

    if (!actualValue.includes(expectedWidth)) {
      expect.Fail(
        `Expected width "${expectedWidth}" but found "${actualValue}"`
      )
    }
  }
}

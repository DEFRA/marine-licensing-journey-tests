import Task from '../base/task.js'
import { expect } from 'chai'

export default class EnsureSiteDetails extends Task {
  static areCorrect() {
    return new EnsureSiteDetails()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const siteDetails = this.getSiteDetailsData(actor)
    await this.verifyMethodOfProvidingSiteLocation(browseTheWeb)
    await this.verifyCoordinateSystem(browseTheWeb, siteDetails)
    await this.verifyCoordinatesAtCentreOfSite(browseTheWeb, siteDetails)
    await this.verifyWidthOfCircularSite(browseTheWeb, siteDetails)
  }

  getSiteDetailsData(actor) {
    const exemption = actor.recalls('exemption')

    if (!exemption) {
      expect.Fail('No exemption data available for verification')
    }

    if (!exemption.siteDetails) {
      expect.Fail('No site details data available for verification')
    }

    return exemption.siteDetails
  }

  async verifyMethodOfProvidingSiteLocation(browseTheWeb) {
    const expectedMethod =
      'Manually enter one set of coordinates and a width to create a circular site'

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

  async verifyCoordinateSystem(browseTheWeb, siteDetails) {
    let expectedSystem
    if (siteDetails.coordinateSystem === 'WGS84') {
      expectedSystem = 'WGS84 (World Geodetic System 1984)'
    } else if (siteDetails.coordinateSystem === 'OSGB36') {
      expectedSystem = 'OSGB36 (National Grid)'
    } else {
      expect.Fail(`Unknown coordinate system: ${siteDetails.coordinateSystem}`)
    }

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

  async verifyCoordinatesAtCentreOfSite(browseTheWeb, siteDetails) {
    const { coordinateSystem, circleData } = siteDetails

    let expectedCoordinates
    if (coordinateSystem === 'WGS84') {
      expectedCoordinates = `${circleData.latitude}, ${circleData.longitude}`
    } else if (coordinateSystem === 'OSGB36') {
      expectedCoordinates = `${circleData.eastings}, ${circleData.northings}`
    } else {
      expect.Fail(`Unknown coordinate system: ${coordinateSystem}`)
    }

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

  async verifyWidthOfCircularSite(browseTheWeb, siteDetails) {
    const { circleData } = siteDetails
    const expectedWidth = `${circleData.width} metres`

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

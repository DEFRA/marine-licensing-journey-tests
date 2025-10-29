import { expect } from 'chai'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureIndividualSiteDetailsCards extends Task {
  static areCorrect() {
    return new EnsureIndividualSiteDetailsCards()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!siteDetails) return
    if (siteDetails.coordinatesEntryMethod === 'file-upload') return
    if (!siteDetails.multipleSitesEnabled) return

    const sites = siteDetails?.sites || [siteDetails]

    for (let i = 0; i < sites.length; i++) {
      const siteNumber = i + 1
      const site = sites[i]

      await this.verifySiteCard(browseTheWeb, siteNumber, site)
    }
  }

  async verifySiteCard(browseTheWeb, siteNumber, site) {
    await this.verifySiteCoordinateMethod(browseTheWeb, siteNumber, site)
    await this.verifySiteCoordinateSystem(browseTheWeb, siteNumber, site)
    await this.verifySiteName(browseTheWeb, siteNumber, site)
  }

  async verifySiteCoordinateMethod(browseTheWeb, siteNumber, site) {
    const expectedMethod = this.determineSiteSpecificMethod(site)

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.getSiteCoordinateMethodValue(siteNumber),
      expectedMethod
    )
  }

  async verifySiteCoordinateSystem(browseTheWeb, siteNumber, site) {
    const coordinateSystem = site?.coordinateSystem
    if (!coordinateSystem) {
      return
    }

    const expectedDisplayText =
      this._mapCoordinateSystemToDisplayText(coordinateSystem)
    const actualText = await browseTheWeb.getText(
      ReviewSiteDetailsPage.getSiteCoordinateSystemValue(siteNumber)
    )

    const normalizedActual = actualText.trim().replaceAll('\n', ' ')
    if (normalizedActual !== expectedDisplayText) {
      expect.fail(
        `Coordinate system mismatch for Site ${siteNumber}. Expected: "${expectedDisplayText}", but found: "${actualText}"`
      )
    }
  }

  async verifySiteName(browseTheWeb, siteNumber, site) {
    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.getSiteName(siteNumber),
      site.siteName
    )
  }

  determineSiteSpecificMethod(site) {
    const siteType = site?.siteType

    if (siteType === 'circle') {
      return 'Manually enter one set of coordinates and a width to create a circular site'
    }

    return 'Manually enter multiple sets of coordinates to mark the boundary of the site'
  }

  _mapCoordinateSystemToDisplayText(coordinateSystem) {
    const mappings = {
      WGS84: 'WGS84 (World Geodetic System 1984) Latitude and longitude',
      OSGB36: 'British National Grid (OSGB36) Eastings and Northings'
    }
    return mappings[coordinateSystem] || coordinateSystem
  }
}

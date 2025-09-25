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

    // Only validate numbered site cards for multi-site scenarios (ML-361/ML-608)
    if (!siteDetails) return
    if (siteDetails.coordinatesEntryMethod === 'file-upload') return
    if (siteDetails.multipleSitesEnabled !== 'yes') return

    const sites = siteDetails?.sites || [siteDetails]

    for (let i = 0; i < sites.length; i++) {
      const siteNumber = i + 1
      const site = sites[i]

      await this.verifySiteCard(browseTheWeb, siteNumber, site)
    }
  }

  async verifySiteCard(browseTheWeb, siteNumber, site) {
    // Verify the site card exists
    await browseTheWeb.isDisplayed(
      ReviewSiteDetailsPage.getSiteDetailsCardTitle(siteNumber)
    )

    // Verify site-specific coordinate method text
    await this.verifySiteCoordinateMethod(browseTheWeb, siteNumber, site)

    // Verify site name if present
    await this.verifySiteName(browseTheWeb, siteNumber, site)

    // Verify activity dates if different for each site
    await this.verifyActivityDates(browseTheWeb, siteNumber, site)

    // Verify activity description if different for each site
    await this.verifyActivityDescription(browseTheWeb, siteNumber, site)
  }

  async verifySiteCoordinateMethod(browseTheWeb, siteNumber, site) {
    const expectedMethod = this.determineSiteSpecificMethod(site)

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.getSiteCoordinateMethodValue(siteNumber),
      expectedMethod
    )
  }

  async verifySiteName(browseTheWeb, siteNumber, site) {
    // TODO: Add site name verification when selector is available
    // This would be implemented when ML-228 (provide site name) is fully integrated
  }

  async verifyActivityDates(browseTheWeb, siteNumber, site) {
    // TODO: Add activity dates verification for individual sites
    // Only verify if dates are NOT shared (i.e., user answered "No" to "Are all activity dates the same?")
    // Per ML-608 AC2: "Activity dates - This row is only displayed if I selected that the dates are not the same for every site"
  }

  async verifyActivityDescription(browseTheWeb, siteNumber, site) {
    // TODO: Add activity description verification for individual sites
    // Only verify if descriptions are NOT shared (i.e., user answered "No" to "Are all activity descriptions the same?")
    // Per ML-608 AC2: "Activity description - This row is only displayed if I selected that the description is not the same for every site"
  }

  determineSiteSpecificMethod(site) {
    const siteType = site?.siteType

    if (siteType === 'circle') {
      return 'Manually enter one set of coordinates and a width to create a circular site'
    }

    if (siteType === 'triangle') {
      return 'Manually enter multiple sets of coordinates to mark the boundary of the site'
    }

    expect.fail(
      `Unable to determine site-specific method for site type: ${siteType}`
    )
  }
}

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
    if (siteDetails.multipleSitesEnabled !== 'yes') return

    const sites = siteDetails?.sites || [siteDetails]

    for (let i = 0; i < sites.length; i++) {
      const siteNumber = i + 1
      const site = sites[i]

      await this.verifySiteCard(browseTheWeb, siteNumber, site)
    }
  }

  async verifySiteCard(browseTheWeb, siteNumber, site) {
    await browseTheWeb.isDisplayed(
      ReviewSiteDetailsPage.getSiteDetailsCardTitle(siteNumber)
    )
    await this.verifySiteCoordinateMethod(browseTheWeb, siteNumber, site)
    await this.verifySiteName(browseTheWeb, siteNumber, site)
    await this.verifyActivityDates(browseTheWeb, siteNumber, site)
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

    return 'Manually enter multiple sets of coordinates to mark the boundary of the site'
  }
}

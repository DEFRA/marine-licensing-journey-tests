import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureProvidingSiteLocationCard extends Task {
  static isCorrect() {
    return new EnsureProvidingSiteLocationCard()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!siteDetails) return

    // Skip for file upload scenarios - they don't have this card structure
    if (siteDetails.coordinatesEntryMethod === 'file-upload') return

    await this.verifyCardExists(browseTheWeb)
    await this.verifyMethodOfProvidingSiteLocation(browseTheWeb, siteDetails)
    await this.verifyMoreThanOneSite(browseTheWeb, siteDetails)
  }

  async verifyCardExists(browseTheWeb) {
    await browseTheWeb.isDisplayed(
      ReviewSiteDetailsPage.providingTheSiteLocationCard
    )
  }

  async verifyMethodOfProvidingSiteLocation(browseTheWeb, siteDetails) {
    const expectedMethod = this.determineExpectedMethod(siteDetails)

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.methodOfProvidingSiteLocationValue,
      expectedMethod
    )
  }

  async verifyMoreThanOneSite(browseTheWeb, siteDetails) {
    const isMultiSite = siteDetails?.multipleSitesEnabled === true

    if (isMultiSite) {
      await browseTheWeb.expectElementToContainText(
        ReviewSiteDetailsPage.moreThanOneSiteValue,
        'Yes'
      )
    } else {
      await browseTheWeb.expectElementToContainText(
        ReviewSiteDetailsPage.moreThanOneSiteValue,
        'No'
      )
    }
  }

  determineExpectedMethod(siteDetails) {
    if (siteDetails?.coordinatesEntryMethod === 'file-upload') {
      return 'Upload a file with the coordinates of the site'
    }

    // For manual entry, return the general method text (ML-608 AC3)
    return 'Enter the coordinates of the site manually'
  }
}

import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureIndividualSiteActivityDetails extends Task {
  static areCorrect() {
    return new EnsureIndividualSiteActivityDetails()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!this.shouldValidateIndividualSites(siteDetails)) return

    const validationConfig = {
      hasIndividualDates: siteDetails?.sameActivityDates === false,
      hasIndividualDescriptions: siteDetails?.sameActivityDescription === false
    }

    const sites = siteDetails?.sites || []

    for (let i = 0; i < sites.length; i++) {
      const siteNumber = i + 1
      const site = sites[i]

      await this.verifySiteActivityDetails(
        browseTheWeb,
        siteNumber,
        site,
        validationConfig
      )
    }
  }

  shouldValidateIndividualSites(siteDetails) {
    if (!siteDetails) return false
    if (siteDetails.coordinatesEntryMethod === 'file-upload') return false
    if (!siteDetails.multipleSitesEnabled) return false

    const hasIndividualDates = siteDetails?.sameActivityDates === false
    const hasIndividualDescriptions =
      siteDetails?.sameActivityDescription === false

    return hasIndividualDates || hasIndividualDescriptions
  }

  async verifySiteActivityDetails(
    browseTheWeb,
    siteNumber,
    site,
    validationConfig
  ) {
    if (validationConfig.hasIndividualDates) {
      await this.verifySiteActivityDates(browseTheWeb, siteNumber, site)
    }

    if (validationConfig.hasIndividualDescriptions) {
      await this.verifySiteActivityDescription(browseTheWeb, siteNumber, site)
    }
  }

  async verifySiteActivityDates(browseTheWeb, siteNumber, site) {
    const activityDates = site?.activityDates
    if (!activityDates) return

    let expectedDateRange
    if (activityDates.start && activityDates.end) {
      expectedDateRange = `${activityDates.start} to ${activityDates.end}`
    } else if (activityDates.startDate && activityDates.endDate) {
      await browseTheWeb.expectElementToBePresent(
        ReviewSiteDetailsPage.getSiteActivityDates(siteNumber)
      )
      return
    } else {
      return
    }

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.getSiteActivityDates(siteNumber),
      expectedDateRange
    )
  }

  async verifySiteActivityDescription(browseTheWeb, siteNumber, site) {
    const activityDescription = site?.activityDescription
    if (!activityDescription) return

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.getSiteActivityDescription(siteNumber),
      activityDescription
    )
  }
}

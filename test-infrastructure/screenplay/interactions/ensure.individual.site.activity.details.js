import { formatDateObjectToDisplay } from '../../helpers/date-formatter.js'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureIndividualSiteActivityDetails extends Task {
  constructor(siteNumber = null) {
    super()
    this.siteNumber = siteNumber
  }

  static areCorrect() {
    return new EnsureIndividualSiteActivityDetails()
  }

  static forSite(siteNumber) {
    return new EnsureIndividualSiteActivityDetails(siteNumber)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!this.shouldValidateIndividualSites(siteDetails)) return

    const validationConfig = this.buildValidationConfig(siteDetails)
    const sites = siteDetails?.sites || []

    if (this.siteNumber) {
      await this.validateSingleSite(browseTheWeb, sites, validationConfig)
    } else {
      await this.validateAllSites(browseTheWeb, sites, validationConfig)
    }
  }

  buildValidationConfig(siteDetails) {
    return {
      hasIndividualDates: siteDetails?.sameActivityDates === false,
      hasIndividualDescriptions: siteDetails?.sameActivityDescription === false
    }
  }

  async validateSingleSite(browseTheWeb, sites, validationConfig) {
    const siteIndex = this.siteNumber - 1
    const site = sites[siteIndex]
    await this.verifySiteActivityDetails(
      browseTheWeb,
      this.siteNumber,
      site,
      validationConfig
    )
  }

  async validateAllSites(browseTheWeb, sites, validationConfig) {
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

    if (activityDates.startDate && activityDates.endDate) {
      const formattedStart = formatDateObjectToDisplay(activityDates.startDate)
      const formattedEnd = formatDateObjectToDisplay(activityDates.endDate)
      const expectedDateRange = `${formattedStart} to ${formattedEnd}`

      await browseTheWeb.expectElementToContainText(
        ReviewSiteDetailsPage.getSiteActivityDates(siteNumber),
        expectedDateRange
      )
    }
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

import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'

export default class EnsureActivityDetailsCard extends Task {
  static isCorrect() {
    return new EnsureActivityDetailsCard()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!this.shouldValidateCard(siteDetails)) return

    await this.verifySharedContent(browseTheWeb, siteDetails)
  }

  shouldValidateCard(siteDetails) {
    if (!siteDetails) return false

    const hasSharedDates = this.hasSharedActivityDates(siteDetails)
    const hasSharedDescriptions =
      this.hasSharedActivityDescriptions(siteDetails)

    return hasSharedDates || hasSharedDescriptions
  }

  async verifySharedContent(browseTheWeb, siteDetails) {
    if (this.hasSharedActivityDates(siteDetails)) {
      await this.verifySharedActivityDates(browseTheWeb, siteDetails)
    }

    if (this.hasSharedActivityDescriptions(siteDetails)) {
      await this.verifySharedActivityDescription(browseTheWeb, siteDetails)
    }
  }

  async verifySharedActivityDates(browseTheWeb, siteDetails) {
    const startDate =
      siteDetails.activityStartDate || siteDetails.sites?.[0]?.activityStartDate
    const endDate =
      siteDetails.activityEndDate || siteDetails.sites?.[0]?.activityEndDate

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.activityDatesValue,
      `${startDate} to ${endDate}`
    )
  }

  async verifySharedActivityDescription(browseTheWeb, siteDetails) {
    const description =
      siteDetails.activityDescription ||
      siteDetails.sites?.[0]?.activityDescription

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.activityDescriptionValue,
      description
    )
  }

  hasSharedActivityDates(siteDetails) {
    if (siteDetails.multipleSitesEnabled !== 'yes') return false

    return (
      siteDetails?.sharedActivityDates === 'yes' ||
      siteDetails?.allActivityDatesTheSame === 'yes'
    )
  }

  hasSharedActivityDescriptions(siteDetails) {
    if (siteDetails.multipleSitesEnabled !== 'yes') return false

    return (
      siteDetails?.sharedActivityDescriptions === 'yes' ||
      siteDetails?.allActivityDescriptionsTheSame === 'yes'
    )
  }
}

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

    await this.verifySharedContent(browseTheWeb, siteDetails, actor)
  }

  shouldValidateCard(siteDetails) {
    if (!siteDetails) return false

    const hasSharedDates = this.hasSharedActivityDates(siteDetails)
    const hasSharedDescriptions =
      this.hasSharedActivityDescriptions(siteDetails)

    return hasSharedDates || hasSharedDescriptions
  }

  async verifySharedContent(browseTheWeb, siteDetails, actor) {
    if (this.hasSharedActivityDates(siteDetails)) {
      await this.verifySharedActivityDates(browseTheWeb, siteDetails, actor)
    }

    if (this.hasSharedActivityDescriptions(siteDetails)) {
      await this.verifySharedActivityDescription(
        browseTheWeb,
        siteDetails,
        actor
      )
    }
  }

  async verifySharedActivityDates(browseTheWeb, siteDetails, actor) {
    const activityDates = this.getActivityDates(actor, siteDetails)
    if (!activityDates) return

    await this.assertActivityDates(browseTheWeb, activityDates)
  }

  getActivityDates(actor, siteDetails) {
    const exemption = actor.recalls('exemption')
    return exemption?.activityDates || siteDetails.sites?.[0]?.activityDates
  }

  async assertActivityDates(browseTheWeb, activityDates) {
    if (activityDates.start && activityDates.end) {
      const expectedDateRange = `${activityDates.start} to ${activityDates.end}`
      await browseTheWeb.expectElementToContainText(
        ReviewSiteDetailsPage.activityDatesValue,
        expectedDateRange
      )
    } else if (activityDates.startDate && activityDates.endDate) {
      await browseTheWeb.expectElementToBePresent(
        ReviewSiteDetailsPage.activityDatesValue
      )
    }
  }

  async verifySharedActivityDescription(browseTheWeb, siteDetails, actor) {
    const exemption = actor.recalls('exemption')
    const description =
      exemption?.activityDescription ||
      siteDetails.sites?.[0]?.activityDescription

    if (!description) return

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.activityDescriptionValue,
      description
    )
  }

  hasSharedActivityDates(siteDetails) {
    if (!siteDetails.multipleSitesEnabled) return false

    return siteDetails?.sameActivityDates === true
  }

  hasSharedActivityDescriptions(siteDetails) {
    if (!siteDetails.multipleSitesEnabled) return false

    return siteDetails?.sameActivityDescription === true
  }
}

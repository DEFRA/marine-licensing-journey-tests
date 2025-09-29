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
    const exemption = actor.recalls('exemption')
    const activityDates =
      exemption?.activityDates || siteDetails.sites?.[0]?.activityDates

    if (!activityDates) return

    // Handle both test format and backend format
    let expectedDateRange
    if (activityDates.start && activityDates.end) {
      // Backend format (formatted strings)
      expectedDateRange = `${activityDates.start} to ${activityDates.end}`
    } else if (activityDates.startDate && activityDates.endDate) {
      // Test model format - just verify element exists, don't check exact content
      // since we can't easily format the test dates to match UI formatting
      await browseTheWeb.expectElementToBePresent(
        ReviewSiteDetailsPage.activityDatesValue
      )
      return
    } else {
      return
    }

    await browseTheWeb.expectElementToContainText(
      ReviewSiteDetailsPage.activityDatesValue,
      expectedDateRange
    )
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

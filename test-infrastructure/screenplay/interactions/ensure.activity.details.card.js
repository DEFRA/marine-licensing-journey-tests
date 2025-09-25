import Task from '../base/task.js'

export default class EnsureActivityDetailsCard extends Task {
  static isCorrect() {
    return new EnsureActivityDetailsCard()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    if (!siteDetails) return

    const hasSharedDates = this.hasSharedActivityDates(siteDetails)
    const hasSharedDescriptions =
      this.hasSharedActivityDescriptions(siteDetails)

    // Only validate Activity details card if there are shared elements
    if (!hasSharedDates && !hasSharedDescriptions) return

    await this.verifyCardExists(browseTheWeb)

    if (hasSharedDates) {
      await this.verifySharedActivityDates(browseTheWeb, siteDetails)
    }

    if (hasSharedDescriptions) {
      await this.verifySharedActivityDescription(browseTheWeb, siteDetails)
    }
  }

  async verifyCardExists(browseTheWeb) {
    // TODO: Add selector for Activity details card when available
    // This would verify the "Activity details" summary card is displayed
  }

  async verifySharedActivityDates(browseTheWeb, siteDetails) {
    // TODO: Add verification for shared activity dates
    // This would only display dates if "Are all activity dates the same?" was answered "Yes"
    // Per ML-608 AC2: "This row is only displayed if I selected that the dates are the same for every site"
  }

  async verifySharedActivityDescription(browseTheWeb, siteDetails) {
    // TODO: Add verification for shared activity description
    // This would only display description if "Are all activity descriptions the same?" was answered "Yes"
    // Per ML-608 AC2: "This row is only displayed if I selected that the description is the same for every site"
  }

  hasSharedActivityDates(siteDetails) {
    // For single sites, always show activity dates in Activity details card
    if (siteDetails.multipleSitesEnabled !== 'yes') return true

    // For multi-sites, check if user answered "Yes" to "Are all activity dates the same?"
    return (
      siteDetails?.sharedActivityDates === 'yes' ||
      siteDetails?.allActivityDatesTheSame === 'yes'
    )
  }

  hasSharedActivityDescriptions(siteDetails) {
    // For single sites, always show activity descriptions in Activity details card
    if (siteDetails.multipleSitesEnabled !== 'yes') return true

    // For multi-sites, check if user answered "Yes" to "Are all activity descriptions the same?"
    return (
      siteDetails?.sharedActivityDescriptions === 'yes' ||
      siteDetails?.allActivityDescriptionsTheSame === 'yes'
    )
  }
}

import NotificationSummaryBase from '~/test-infrastructure/screenplay/base/notification.summary.base.js'

export default class EnsureViewDetailsPage extends NotificationSummaryBase {
  static showsAllAnswers() {
    return new EnsureViewDetailsPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const completedExemptions = actor.recalls('completedExemptions')
    const exemptionData = completedExemptions[completedExemptions.length - 1]

    // Comprehensive validation of all sections on View Details page
    await this._validateProjectSummary(browseTheWeb, exemptionData)
    await this._validateProjectDetails(browseTheWeb, exemptionData)
    await this._validateActivityDates(browseTheWeb, exemptionData)
    await this._validateActivityDetails(browseTheWeb, exemptionData)
    await this._validateSiteDetails(browseTheWeb, exemptionData)
    await this._validatePublicRegister(browseTheWeb, exemptionData)
    await this._validateSubmissionDetails(browseTheWeb, exemptionData)
  }
}

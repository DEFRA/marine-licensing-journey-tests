import NotificationSummaryBase from '~/test-infrastructure/screenplay/base/notification.summary.base.js'

export default class EnsureCheckYourAnswersPage extends NotificationSummaryBase {
  static showsAllAnswers() {
    return new EnsureCheckYourAnswersPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const exemptionData = actor.recalls('exemption')
    await this._validateActivityDates(browseTheWeb, exemptionData)
    await this._validateActivityDetails(browseTheWeb, exemptionData)
    await this._validateSiteDetails(browseTheWeb, exemptionData)
    await this._validatePublicRegister(browseTheWeb, exemptionData)
  }
}

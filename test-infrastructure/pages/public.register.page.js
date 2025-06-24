export default class PublicRegisterPage {
  static consentYes = '#consent' // "Yes" - withhold from public register
  static consentNo = '#consent-2' // "No" - don't withhold (share on public register)
  static withholdReason = '#reason'
  static saveAndContinue = 'button[type="submit"]'
  static consentError = '#consent-error'
  static reasonError = '#reason-error'
  static projectName = 'span.govuk-caption-l'

  static getConsentSelector(consent) {
    // consent: true = give consent to share = answer "No" to "should it be withheld?"
    // consent: false = withhold consent = answer "Yes" to "should it be withheld?"
    if (consent === true) return this.consentNo // Don't withhold (share)
    if (consent === false) return this.consentYes // Withhold (don't share)
    return consent
  }
}

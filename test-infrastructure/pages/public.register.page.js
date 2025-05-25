export default class PublicRegisterPage {
  static consent = '#consent-2'
  static withhold = '#consent'
  static withholdReason = '#reason'
  static saveAndContinue = 'button[type="submit"]'
  static consentError = '#consent-error'
  static reasonError = '#reason-error'
  static projectName = 'span.govuk-caption-l'

  static getConsentSelector(consent) {
    if (consent === true) return this.consent
    if (consent === false) return this.withhold
    return consent
  }
}

export default class PublicRegisterPage {
  static consentYes = '#consent'
  static consentNo = '#consent-2'
  static reason = '#reason'
  static saveAndContinue = 'button[type="submit"]'
  static consentError = '#consent-error'
  static reasonError = '#reason-error'
  static projectName = 'span.govuk-caption-l'
  static publicRegisterLink =
    'a[href*="marinelicensing.marinemanagement.org.uk"]'

  static getConsentSelector(consent) {
    if (consent === true) return this.consentYes
    if (consent === false) return this.consentNo
    return consent
  }

  static get withholdReason() {
    return this.reason
  }
}

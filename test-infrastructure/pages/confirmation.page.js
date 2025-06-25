export default class ConfirmationPage {
  static get locators() {
    return {
      panel: '.govuk-panel',
      panelTitle: '.govuk-panel__title',
      applicationReference: '.govuk-panel__body strong',
      confirmationEmail: 'p.govuk-body',
      whatHappensNextHeading: 'h2.govuk-heading-m'
    }
  }
}

export default class ConfirmationPage {
  static get locators() {
    return {
      panel: '.govuk-panel',
      panelTitle: '.govuk-panel__title',
      applicationReference: '.govuk-panel__body strong',
      confirmationEmail: 'p.govuk-body',
      whatHappensNextHeading: 'h2.govuk-heading-m',
      feedbackLink: '.govuk-grid-row a[href*="jfe/form/SV_"]'
    }
  }

  static get expectedFeedbackUrl() {
    return 'https://defragroup.eu.qualtrics.com/jfe/form/SV_9GjBVwAH3a9ED6C'
  }
}

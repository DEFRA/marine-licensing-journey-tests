export default class ConfirmationPage {
  static get locators() {
    return {
      panel: '.govuk-panel',
      panelTitle: '.govuk-panel__title',
      applicationReference: '.govuk-panel__body strong',
      confirmationEmail: 'p.govuk-body',
      whatHappensNextHeading: 'h2.govuk-heading-m',
      feedbackLink:
        'a[href*="SV_9GjBVwAH3a9ED6C"], a[href*="SV_8p5Cle8p7Yov9FI"]'
    }
  }

  static get expectedFeedbackUrl() {
    return 'https://defragroup.eu.qualtrics.com/jfe/form/SV_9GjBVwAH3a9ED6C'
  }
}

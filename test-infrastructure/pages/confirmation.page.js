export default class ConfirmationPage {
  static get locators() {
    return {
      panel: '.govuk-panel',
      panelTitle: '.govuk-panel__title',
      applicationReference: '.govuk-panel__body strong',
      confirmationEmail: 'p.govuk-body',
      whatHappensNextHeading: 'h2.govuk-heading-m',
      feedbackLink: '.govuk-grid-row a[href*="forms.office.com"]'
    }
  }

  static get expectedFeedbackUrl() {
    return 'https://forms.office.com/pages/responsepage.aspx?id=UCQKdycCYkyQx044U38RAjXEiYXnHG1DvkWr_VjRfzZURFMxRkhCSzQyVlRKQzdZNDEyVDhSMFdSNy4u&route=shorturl'
  }
}

export default class DefraAccountPage {
  static url = '/management'

  static locators = {
    pageHeading: 'h1',
    yourAccountsHeading: 'h2.govuk-heading-l',
    yourServicesHeading:
      '//h2[@class="govuk-heading-l"][contains(text(), "Your services")]',
    marineLicensingServiceLink: '#link-get-permission-for-marine-work'
  }

  static expectedContent = {
    pageTitle: 'Your Defra account',
    yourAccountsSection: 'Your accounts',
    yourServicesSection: 'Your services'
  }
}

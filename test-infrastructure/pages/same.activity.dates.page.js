export default class SameActivityDatesPage {
  static url = '/exemption/same-activity-dates'

  static locators = {
    pageHeading: 'h1',
    yesRadioButton: '#sameActivityDates',
    noRadioButton: '#sameActivityDates-2',
    continueButton: 'button[type="submit"]',
    backLink: '//a[text()="Back"]',
    cancelLink: '//a[text()="Cancel"]'
  }
}

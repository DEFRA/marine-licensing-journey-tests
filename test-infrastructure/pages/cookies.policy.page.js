export default class CookiesPolicyPage {
  static locators = {
    analyticsYesRadio: 'input[name="analytics"][value="yes"]',
    analyticsNoRadio: 'input[name="analytics"][value="no"]',
    saveButton: 'button[type="submit"]',
    confirmationBanner: '.govuk-notification-banner'
  }
}

export default class WithdrawProjectPage {
  static url = '/withdraw'

  static locators = {
    pageHeading: 'h1',
    withdrawButton: '//button[normalize-space(text())="Yes, withdraw project"]',
    cancelLink: '//a[normalize-space(text())="Cancel"]',
    backLink: '//a[normalize-space(text())="Back"]'
  }
}

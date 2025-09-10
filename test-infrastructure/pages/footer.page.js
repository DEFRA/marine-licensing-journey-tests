export default class FooterPage {
  static locators = {
    privacyLink: '//footer//a[normalize-space(text())="Privacy"]',
    cookiesLink: '//footer//a[normalize-space(text())="Cookies"]',
    accessibilityStatementLink:
      '//footer//a[normalize-space(text())="Accessibility statement"]'
  }
}

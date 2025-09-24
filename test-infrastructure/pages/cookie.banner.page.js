export default class CookieBannerPage {
  static locators = {
    acceptAnalyticsButton: 'button[name="analytics"][value="yes"]',
    rejectAnalyticsButton: 'button[name="analytics"][value="no"]',
    viewCookiesLink: 'a[href="/help/cookies"]',
    bannerForm: 'form[action="/help/cookies"]'
  }
}

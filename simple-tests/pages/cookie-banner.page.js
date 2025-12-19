// Reuses locators from test-infrastructure/pages/cookie.banner.page.js
export class CookieBannerPage {
  static selectors = {
    acceptAnalyticsButton: 'button[name="analytics"][value="yes"]',
    rejectAnalyticsButton: 'button[name="analytics"][value="no"]',
    viewCookiesLink: 'a[href="/help/cookies"]',
    bannerForm: 'form[action="/help/cookies"]'
  }

  static async acceptAnalytics(page) {
    const button = page.locator(this.selectors.acceptAnalyticsButton)
    if (await button.isVisible()) {
      await button.click()
    }
  }

  static async rejectAnalytics(page) {
    const button = page.locator(this.selectors.rejectAnalyticsButton)
    if (await button.isVisible()) {
      await button.click()
    }
  }
}

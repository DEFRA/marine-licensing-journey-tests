import CookieBannerPage from '~/test-infrastructure/pages/cookie.banner.page.js'
import Task from '../base/task.js'

export default class HandleCookieBanner extends Task {
  static now() {
    return new HandleCookieBanner()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')

    if (this.shouldSkipCookieHandling(actor, exemption)) {
      return
    }

    const cookiePreferences = exemption?.cookiePreferences || 'accept'
    await this.handleCookieChoice(actor, cookiePreferences)
  }

  shouldSkipCookieHandling(actor, exemption) {
    if (exemption?.noPreviousCookieDecision) {
      return true
    }
    return (
      actor.hasMemoryOf('cookiePreferencesSet') &&
      actor.recalls('cookiePreferencesSet')
    )
  }

  async handleCookieChoice(actor, cookiePreferences) {
    const browseTheWeb = actor.ability

    if (cookiePreferences === 'accept') {
      await browseTheWeb.click(CookieBannerPage.locators.acceptAnalyticsButton)
      actor.remembers('cookiePreferencesSet', true)
    } else if (cookiePreferences === 'reject') {
      await browseTheWeb.click(CookieBannerPage.locators.rejectAnalyticsButton)
      actor.remembers('cookiePreferencesSet', true)
    }
    // If 'none', do nothing - leave cookie banner displayed
  }
}

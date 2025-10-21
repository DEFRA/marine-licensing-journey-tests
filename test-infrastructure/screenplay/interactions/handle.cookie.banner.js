import CookieBannerPage from '~/test-infrastructure/pages/cookie.banner.page.js'
import Task from '../base/task.js'

export default class HandleCookieBanner extends Task {
  static now() {
    return new HandleCookieBanner()
  }

  static accepting() {
    return new HandleCookieBanner('accept')
  }

  static rejecting() {
    return new HandleCookieBanner('reject')
  }

  constructor(forcedChoice = null) {
    super()
    this.forcedChoice = forcedChoice
  }

  async performAs(actor) {
    // When forcedChoice is set (accepting/rejecting), always perform the action
    if (this.forcedChoice) {
      await this.handleCookieChoice(actor, this.forcedChoice)
      return
    }

    // For .now() method, check if we should skip based on context
    const exemption = actor.hasMemoryOf('exemption')
      ? actor.recalls('exemption')
      : null

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

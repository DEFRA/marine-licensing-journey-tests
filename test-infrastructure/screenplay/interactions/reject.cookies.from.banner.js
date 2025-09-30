import CookieBannerPage from '~/test-infrastructure/pages/cookie.banner.page.js'
import Task from '../base/task.js'

export default class RejectCookiesFromBanner extends Task {
  static now() {
    return new RejectCookiesFromBanner()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(CookieBannerPage.locators.rejectAnalyticsButton)
    actor.remembers('cookiePreferencesSet', true)
  }
}

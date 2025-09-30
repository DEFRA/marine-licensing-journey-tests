import CookieBannerPage from '~/test-infrastructure/pages/cookie.banner.page.js'
import Task from '../base/task.js'

export default class AcceptCookiesFromBanner extends Task {
  static now() {
    return new AcceptCookiesFromBanner()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(CookieBannerPage.locators.acceptAnalyticsButton)
    actor.remembers('cookiePreferencesSet', true)
  }
}

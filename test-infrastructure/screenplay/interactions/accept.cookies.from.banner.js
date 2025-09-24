import CookieBannerPage from '~/test-infrastructure/pages/cookie.banner.page.js'
import Task from '../base/task.js'

export default class HandleCookieBanner extends Task {
    static now() {
        return new HandleCookieBanner()
    }

    async performAs(actor) {
        const browseTheWeb = actor.ability
        const exemption = actor.recalls('exemption')
        const cookiePreferences = exemption?.cookiePreferences || 'accept'

        if (cookiePreferences === 'accept') {
            await browseTheWeb.click(CookieBannerPage.locators.acceptAnalyticsButton)
        } else if (cookiePreferences === 'reject') {
            await browseTheWeb.click(CookieBannerPage.locators.rejectAnalyticsButton)
        }
        // If 'none', do nothing - leave cookie banner displayed
    }
}

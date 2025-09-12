import CookiesPolicyPage from '~/test-infrastructure/pages/cookies.policy.page.js'
import Task from '../base/task.js'

export default class EnsureCookieConfirmationBanner extends Task {
  static isDisplayed() {
    return new EnsureCookieConfirmationBanner()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isDisplayed(
      CookiesPolicyPage.locators.confirmationBanner
    )
  }
}

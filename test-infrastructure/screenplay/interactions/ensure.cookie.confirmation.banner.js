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

    await browseTheWeb.isDisplayed('.govuk-notification-banner--success')

    await browseTheWeb.expectElementToContainText(
      CookiesPolicyPage.locators.confirmationBanner,
      'Your cookie preferences were saved'
    )

    await browseTheWeb.expectElementToContainText(
      CookiesPolicyPage.locators.confirmationBanner,
      'Go back to the previous page'
    )
  }
}

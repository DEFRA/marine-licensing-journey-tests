import CookiesPolicyPage from '~/test-infrastructure/pages/cookies.policy.page.js'
import Task from '../base/task.js'

export default class EnsureCookieConfirmationBanner extends Task {
  static isDisplayed() {
    return new EnsureCookieConfirmationBanner()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    // Verify the banner exists and is displayed
    await browseTheWeb.isDisplayed(
      CookiesPolicyPage.locators.confirmationBanner
    )

    // Verify it's specifically the success notification banner
    await browseTheWeb.isDisplayed('.govuk-notification-banner--success')

    // Verify the banner contains the expected cookie preferences confirmation text
    await browseTheWeb.containsText(
      CookiesPolicyPage.locators.confirmationBanner,
      'Your cookie preferences were saved'
    )

    // Verify the "Go back to the previous page" link is present
    await browseTheWeb.containsText(
      CookiesPolicyPage.locators.confirmationBanner,
      'Go back to the previous page'
    )
  }
}

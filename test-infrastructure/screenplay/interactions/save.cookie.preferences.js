import CookiesPolicyPage from '~/test-infrastructure/pages/cookies.policy.page.js'
import Task from '../base/task.js'

export default class SaveCookiePreferences extends Task {
  static accepting() {
    return new SaveCookiePreferences('Yes')
  }

  static rejecting() {
    return new SaveCookiePreferences('No')
  }

  static now() {
    return new SaveCookiePreferences()
  }

  constructor(analyticsChoice = null) {
    super()
    this.analyticsChoice = analyticsChoice
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    if (this.analyticsChoice) {
      const radioSelector =
        this.analyticsChoice === 'Yes'
          ? CookiesPolicyPage.locators.analyticsYesRadio
          : CookiesPolicyPage.locators.analyticsNoRadio

      await browseTheWeb.click(radioSelector)
    }

    await browseTheWeb.click(CookiesPolicyPage.locators.saveButton)
  }
}

import { expect } from 'chai'
import Task from '../base/task.js'

export default class EnsurePrivacyPolicyPage extends Task {
  static isDisplayed() {
    return new EnsurePrivacyPolicyPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const currentUrl = await browseTheWeb.browser.getUrl()

    expect(
      currentUrl,
      'The privacy policy page should be displayed'
    ).to.include('/help/privacy')

    const headingSelector = '//h1[contains(text(), "Privacy")]'
    await browseTheWeb.isDisplayed(headingSelector)
  }
}

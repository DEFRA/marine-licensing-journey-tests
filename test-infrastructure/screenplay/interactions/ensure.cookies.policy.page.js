import { expect } from 'chai'
import Task from '../base/task.js'
import EnsurePageHeading from './ensure.page.heading.js'

export default class EnsureCookiesPolicyPage extends Task {
  static isDisplayed() {
    return new EnsureCookiesPolicyPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const currentUrl = await browseTheWeb.browser.getUrl()

    expect(
      currentUrl,
      'The cookies policy page should be displayed'
    ).to.include('/help/cookies')

    await actor.attemptsTo(
      EnsurePageHeading.is('Cookies on Get permission for marine work')
    )
  }
}

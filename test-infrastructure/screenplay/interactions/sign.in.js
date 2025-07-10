import Task from '../base/task.js'
import AuthenticateWith from './authenticate.with.js'

export default class SignIn extends Task {
  static now() {
    return new SignIn()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    // Check if we're on the authentication page (URL contains 'cdp-defra-id-stub')
    const currentUrl = await browseTheWeb.browser.getUrl()
    if (currentUrl.includes('cdp-defra-id-stub')) {
      // We're on the auth page, so we need to authenticate
      await actor.attemptsTo(AuthenticateWith.theTestUser())
    }
    // If we're not on the auth page, we're already authenticated - do nothing
  }
}

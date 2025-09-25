import Task from '../base/task.js'
import AuthenticateWith from './authenticate.with.js'
import HandleCookieBanner from './handle.cookie.banner.js'

export default class SignIn extends Task {
  static now() {
    return new SignIn()
  }

  async performAs(actor) {
    if (!actor.hasMemoryOf('isAuthenticated')) {
      await actor.attemptsTo(AuthenticateWith.theTestUser())
      actor.remembers('isAuthenticated', true)
      await actor.attemptsTo(HandleCookieBanner.now())
    }
  }
}

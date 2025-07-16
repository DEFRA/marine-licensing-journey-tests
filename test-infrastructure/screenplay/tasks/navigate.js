import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'
import AuthenticateWithAPermanentUser from '../interactions/authenticate.with.a.permanent.user.js'
import AuthenticateWith from '../interactions/authenticate.with.js'

export default class Navigate extends Task {
  static toTheMarineLicensingApp() {
    return new Navigate(ProjectNamePage.url)
  }

  static toProjectNamePage() {
    return new Navigate(ProjectNamePage.url)
  }

  constructor(url) {
    super()
    this.url = url
  }

  async performAs(actor) {
    if (process.env.ENVIRONMENT === 'test') {
      await actor.ability.navigateTo(this.url)
      if (!actor.hasMemoryOf('isAuthenticated')) {
        await actor.attemptsTo(AuthenticateWithAPermanentUser.aPermanentUser())
        actor.remembers('isAuthenticated', true)
      }
    } else {
      if (!actor.hasMemoryOf('testUser')) {
        const testUser = await actor.ability.registerTestUser(actor.name)
        actor.remembers('testUser', testUser)
      }
      await actor.ability.navigateTo(this.url)
      if (!actor.hasMemoryOf('isAuthenticated')) {
        await actor.attemptsTo(AuthenticateWith.theTestUser())
        actor.remembers('isAuthenticated', true)
      }
    }
  }
}

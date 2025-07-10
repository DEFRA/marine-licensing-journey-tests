import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'
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
    if (!actor.hasMemoryOf('testUser')) {
      const testUser = await actor.ability.registerTestUser(actor.name)
      actor.remembers('testUser', testUser)
    }

    await actor.ability.navigateTo(this.url)

    await actor.attemptsTo(AuthenticateWith.theTestUser())
  }
}

import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class StartNewExemption extends Task {
  static now() {
    return new StartNewExemption()
  }

  async performAs(actor) {
    await actor.ability.navigateTo(ProjectNamePage.url)
  }
}

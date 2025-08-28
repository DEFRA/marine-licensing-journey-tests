import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class EnsureThatProjectNameIsEmpty extends Task {
  static now() {
    return new EnsureThatProjectNameIsEmpty()
  }

  async performAs(actor) {
    await actor.ability.expectInputToBeEmpty(ProjectNamePage.projectNameInput)
  }
}

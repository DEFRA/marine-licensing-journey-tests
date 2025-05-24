import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class EnsureThatProjectName extends Task {
  static is(expectation) {
    return new EnsureThatProjectName(expectation)
  }

  constructor(expectation) {
    super()
    this.expectation = expectation
  }

  async performAs(actor) {
    await actor.ability.expectElementToHaveValue(
      ProjectNamePage.projectNameInput,
      this.expectation
    )
  }
}

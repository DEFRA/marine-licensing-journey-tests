import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class EnsureThatProjectName extends Task {
  static isCorrect() {
    return new EnsureThatProjectName()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    await actor.ability.expectElementToHaveValue(
      ProjectNamePage.projectNameInput,
      exemption.projectName
    )
  }
}

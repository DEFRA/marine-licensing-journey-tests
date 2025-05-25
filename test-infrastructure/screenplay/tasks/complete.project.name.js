import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class CompleteProjectName extends Task {
  static now() {
    return new CompleteProjectName()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys(
      ProjectNamePage.projectNameInput,
      exemption.projectName
    )
    await browseTheWeb.click(ProjectNamePage.saveAndContinue)

    if (actor.hasMemoryOf('exemption')) {
      actor.updates('exemption', (exemption) =>
        exemption.markProjectNameTaskCompleted()
      )
    }
  }
}

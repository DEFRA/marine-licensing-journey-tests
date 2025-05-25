import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class CompleteProjectName extends Task {
  static with(projectName) {
    return new CompleteProjectName(projectName)
  }

  constructor(projectName) {
    super()
    this.projectName = projectName
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys(
      ProjectNamePage.projectNameInput,
      this.projectName
    )
    await browseTheWeb.click(ProjectNamePage.saveAndContinue)

    const exemption = actor.recalls('exemption')
    if (exemption) {
      exemption.projectNameTaskCompleted = true
      actor.remembers('exemption', exemption)
    }
  }
}

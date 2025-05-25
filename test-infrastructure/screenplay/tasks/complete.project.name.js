import { expect } from 'chai'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class CompleteProjectName extends Task {
  static now() {
    return new CompleteProjectName()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(
        'Exemption data must be initialized before completing project name'
      )
    }
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys(
      ProjectNamePage.projectNameInput,
      exemption.projectName
    )
    await browseTheWeb.click(ProjectNamePage.saveAndContinue)

    actor.updates('exemption', (exemption) =>
      exemption.markProjectNameTaskCompleted()
    )
  }
}

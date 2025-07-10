import { expect } from 'chai'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import Memory from '../memory.js'

export default class CompleteProjectName extends Task {
  static now() {
    return new CompleteProjectName()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.MISSING_EXEMPTION('project name'))
    }
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys(
      ProjectNamePage.projectNameInput,
      exemption.projectName
    )
    await browseTheWeb.click(ProjectNamePage.saveAndContinue)

    actor.updates(Memory.markTaskCompleted('projectName'))
  }
}

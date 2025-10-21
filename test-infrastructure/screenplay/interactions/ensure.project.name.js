import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class EnsureProjectName extends Task {
  static isCorrect() {
    return new EnsureProjectName('correct')
  }

  static isEmpty() {
    return new EnsureProjectName('empty')
  }

  constructor(mode, expectedValue = null) {
    super()
    this.mode = mode
    this.expectedValue = expectedValue
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    switch (this.mode) {
      case 'correct':
        await this.verifyIsCorrect(actor, browseTheWeb)
        break
      case 'empty':
        await this.verifyIsEmpty(browseTheWeb)
        break
      case 'value':
        await this.verifyHasValue(browseTheWeb)
        break
    }
  }

  async verifyIsCorrect(actor, browseTheWeb) {
    const exemption = actor.recalls('exemption')
    await browseTheWeb.expectElementToHaveValue(
      ProjectNamePage.projectNameInput,
      exemption.projectName
    )
  }

  async verifyIsEmpty(browseTheWeb) {
    await browseTheWeb.expectInputToBeEmpty(ProjectNamePage.projectNameInput)
  }

  async verifyHasValue(browseTheWeb) {
    await browseTheWeb.expectElementToHaveValue(
      ProjectNamePage.projectNameInput,
      this.expectedValue
    )
  }
}

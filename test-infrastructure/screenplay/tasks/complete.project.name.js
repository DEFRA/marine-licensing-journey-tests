export default class CompleteProjectName {
  static with(projectName) {
    return new CompleteProjectName(projectName)
  }

  constructor(projectName) {
    this.projectName = projectName
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys('', this.projectName)
    await browseTheWeb.click('')
  }
}

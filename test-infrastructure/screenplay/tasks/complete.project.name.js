import Task from '../tasks/task'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'

export default class CompleteProjectName extends Task {
  /**
   * Creates a new instance of CompleteProjectName with the specified project name.
   *
   * @param {string} projectName - The name of the project to complete.
   * @returns {CompleteProjectName} A new instance of CompleteProjectName.
   */
  static with(projectName) {
    return new CompleteProjectName(projectName)
  }

  /**
   * Constructs a CompleteProjectName task.
   *
   * @param {string} projectName - The name of the project to complete.
   */
  constructor(projectName) {
    super()
    this.projectName = projectName
  }

  /**
   * Performs the task as the given actor.
   * Uses the actor's ability to input and save the project name
   *
   * @param {Actor} actor - The actor performing the task.
   * @returns {Promise<void>} A promise that resolves when the task is complete.
   */
  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys(
      ProjectNamePage.projectNameInput,
      this.projectName
    )
    await browseTheWeb.click(ProjectNamePage.saveAndContinue)
  }
}

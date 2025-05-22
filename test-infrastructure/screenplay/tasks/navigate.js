import { faker } from '@faker-js/faker'
import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import TaskListPage from '~/test-infrastructure/pages/task.list.page'
import Task from './task'

/**
 * Navigation task for common flows in the application
 * Follows the Screenplay pattern where the Actor performs the navigation
 */
export default class Navigate extends Task {
  /**
   * Create a navigation task to the Public Register page
   * @returns {Navigate} A navigation task to go to the Public Register page
   */
  static toPublicRegisterPage() {
    return new Navigate()
      .startAt(ProjectNamePage.url)
      .completeProjectName()
      .selectTask('Public register')
  }

  /**
   * Create a navigation task to the Project Name page
   * @returns {Navigate} A navigation task to go to the Project Name page
   */
  static toProjectNamePage() {
    return new Navigate().startAt(ProjectNamePage.url)
  }

  /**
   * Create a navigation task to the Task List page
   * @returns {Navigate} A navigation task to go to the Task List page
   */
  static toTaskListPage() {
    return new Navigate().startAt(ProjectNamePage.url).completeProjectName()
  }

  constructor() {
    super()
    this.steps = []
    this.projectNameValue = null
  }

  /**
   * Start navigation at a specific URL
   * @param {string} url - The URL to start navigation from
   * @returns {Navigate} This navigation task for chaining
   */
  startAt(url) {
    this.startUrl = url
    return this
  }

  /**
   * Add step to complete the project name form
   * @param {string} [projectName] - Optional project name to use
   * @returns {Navigate} This navigation task for chaining
   */
  completeProjectName(projectName = null) {
    this.projectNameValue = projectName
    return this
  }

  /**
   * Add step to select a specific task
   * @param {string} taskName - The name of the task to select
   * @returns {Navigate} This navigation task for chaining
   */
  selectTask(taskName) {
    this.taskNameValue = taskName
    return this
  }

  /**
   * Perform the navigation as an actor
   * @param {Actor} actor - The actor performing the navigation
   */
  async performAs(actor) {
    // Start at the specified URL
    await actor.ability.navigateTo(this.startUrl)

    // Complete project name if needed
    if (this.projectNameValue || !this.startUrl.includes('task-list')) {
      // Use provided name or generate one
      const projectName = this.projectNameValue || faker.lorem.words(5)
      actor.remembers('projectName', projectName)

      // Fill and submit the form
      await actor.ability.sendKeys(
        ProjectNamePage.projectNameInput,
        projectName
      )
      await actor.ability.click(ProjectNamePage.saveAndContinue)
    }

    // Select task if specified
    if (this.taskNameValue) {
      await actor.ability.click(TaskListPage.getTaskLink(this.taskNameValue))
    }
  }
}

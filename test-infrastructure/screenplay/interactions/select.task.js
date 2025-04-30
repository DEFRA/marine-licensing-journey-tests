import Task from '../tasks/task'

export default class SelectTheTask extends Task {
  /**
   * @static
   * @param {string} taskName
   * @returns {SelectTheTask}
   */
  static withName(taskName) {
    return new SelectTheTask(taskName)
  }

  /**
   * Creates an instance of SelectTheTask.
   *
   * @constructor
   * @param {string} taskName
   */
  constructor(taskName) {
    super()
    this.taskName = taskName
  }

  /**
   * Selects the task from the tast list
   *
   * @async
   * @param {Actor} actor
   * @returns {*}
   */
  async performAs(actor) {
    const browseTheWeb = actor.ability
    browseTheWeb.click(`a.govuk-task-list__link=${this.taskName}`)
  }
}

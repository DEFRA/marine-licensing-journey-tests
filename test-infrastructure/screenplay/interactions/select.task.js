import Task from '../base/task.js'
import TaskListPage from '~/test-infrastructure/pages/task.list.page'

export default class SelectTheTask extends Task {
  static withName(taskName) {
    return new SelectTheTask(taskName)
  }

  constructor(taskName) {
    super()
    this.taskName = taskName
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(TaskListPage.getTaskLink(this.taskName))
  }
}

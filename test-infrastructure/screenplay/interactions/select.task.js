import Task from '../tasks/task'

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
    browseTheWeb.click(`//a[normalize-space(text())="${this.taskName}"]`)
  }
}

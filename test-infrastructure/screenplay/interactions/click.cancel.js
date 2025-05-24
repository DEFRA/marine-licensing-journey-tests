import Task from '../base/task.js'

export default class ClickCancel extends Task {
  async performAs(actor) {
    await actor.ability.clickCancel()
  }

  static now() {
    return new ClickCancel()
  }
}

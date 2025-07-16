import Task from '../../base/task.js'

export default class ClickBack extends Task {
  async performAs(actor) {
    await actor.ability.clickBack()
  }

  static now() {
    return new ClickBack()
  }
}

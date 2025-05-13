import Task from '../tasks/task'

export default class ClickCancel extends Task {
  async performAs(actor) {
    await actor.ability.clickCancel()
  }

  static now() {
    return new ClickCancel()
  }
}

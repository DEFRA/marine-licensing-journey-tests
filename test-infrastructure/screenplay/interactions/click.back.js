import Task from '../tasks/task'

export default class ClickBack extends Task {
  async performAs(actor) {
    await actor.ability.clickBack()
  }

  static now() {
    return new ClickBack()
  }
}

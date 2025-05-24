import Task from '../base/task.js'

export default class ClickSaveAndContinue extends Task {
  async performAs(actor) {
    await actor.ability.clickSaveAndContinue()
  }

  static now() {
    return new ClickSaveAndContinue()
  }
}

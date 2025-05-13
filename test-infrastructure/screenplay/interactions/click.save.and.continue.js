import Task from '../tasks/task'

export default class ClickSaveAndContinue extends Task {
  async performAs(actor) {
    await actor.ability.clickSaveAndContinue()
  }

  static now() {
    return new ClickSaveAndContinue()
  }
}

import Task from '../base/task.js'

export default class ClickStartNow extends Task {
  static now() {
    return new ClickStartNow()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click('button*=Start now')
  }
}

import Task from '../base/task.js'

export default class Click extends Task {
  static on(locator) {
    return new Click(locator, false)
  }

  static onAfterCheckingDisplay(locator) {
    return new Click(locator, true)
  }

  constructor(locator, checkDisplay = false) {
    super()
    this.locator = locator
    this.checkDisplay = checkDisplay
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    if (this.checkDisplay) {
      await browseTheWeb.isDisplayed(this.locator)
    }

    await browseTheWeb.click(this.locator)
  }
}

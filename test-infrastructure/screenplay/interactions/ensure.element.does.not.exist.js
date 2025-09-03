import Task from '../base/task.js'

export default class EnsureElementDoesNotExist extends Task {
  constructor(locator, description) {
    super()
    this.locator = locator
    this.description = description
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isNotDisplayed(this.locator)
  }
}

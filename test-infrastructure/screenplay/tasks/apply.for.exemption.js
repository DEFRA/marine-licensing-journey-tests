import Task from '../tasks/task'

export default class ApplyForExemption extends Task {
  static where(url) {
    return new ApplyForExemption(url)
  }

  constructor(url) {
    super()
    this.url = url
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.navigateTo(this.url)
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

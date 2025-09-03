import Task from '../base/task.js'

export default class LaunchIat extends Task {
  static now() {
    return new LaunchIat()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const iatUrl = process.env.IAT_URL

    if (!iatUrl) {
      throw new Error('IAT_URL environment variable is not set')
    }

    await browseTheWeb.navigateTo(iatUrl)
  }
}

import Task from '../tasks/task'

export default class ApplyForExemption extends Task {
  /**
   * Creates a new instance of ApplyForExemption with the specified URL.
   * @param {string} url - The URL for the exemptions app.
   * @returns {ApplyForExemption} A new instance of ApplyForExemption.
   */
  static where(url) {
    return new ApplyForExemption(url)
  }

  /**
   * Constructs an ApplyForExemption task.
   * @param {string} url - The URL for the exemptions app.
   */
  constructor(url) {
    super()
    this.url = url
  }

  /**
   * Performs the task as the given actor.
   * Uses the actor's ability to navigate to the given URL.
   * @param {Actor} actor - The actor performing the task.
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async performAs(actor) {
    await this.sleep(2000)
    const browseTheWeb = actor.ability
    await browseTheWeb.navigateTo(this.url)
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

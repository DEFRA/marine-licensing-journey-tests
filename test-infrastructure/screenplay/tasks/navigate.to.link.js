import Task from '../base/task.js'

export default class NavigateToLink extends Task {
  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   * @returns {NavigateToLink}
   */
  static to(url) {
    return new NavigateToLink({ type: 'direct', value: url })
  }

  /**
   * Navigate to a URL stored in actor's memory
   * @param {string} memoryKey - The memory key containing the URL
   * @returns {NavigateToLink}
   */
  static fromMemory(memoryKey) {
    return new NavigateToLink({ type: 'memory', value: memoryKey })
  }

  constructor(config) {
    super()
    this.config = config
  }

  async performAs(actor) {
    let url

    if (this.config.type === 'direct') {
      url = this.config.value
    } else if (this.config.type === 'memory') {
      url = actor.recalls(this.config.value)
    }

    await actor.ability.navigateTo(url)
  }
}

import Task from '../base/task.js'

export default class NavigateToViewDetailsLink extends Task {
  static now() {
    return new NavigateToViewDetailsLink()
  }

  async performAs(actor) {
    const viewDetailsLink = actor.recalls('viewDetailsLink')
    await actor.ability.navigateTo(viewDetailsLink)
  }
}

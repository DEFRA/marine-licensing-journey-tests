import ProjectNamePage from '~/test-infrastructure/pages/project.name.page'
import Task from '../base/task.js'

export default class Navigate extends Task {
  static toTheMarineLicensingApp = {
    now: () => new Navigate(ProjectNamePage.url)
  }

  static toProjectNamePage() {
    return new Navigate(ProjectNamePage.url)
  }

  constructor(url) {
    super()
    this.url = url
  }

  async performAs(actor) {
    await actor.ability.navigateTo(this.url)
  }
}

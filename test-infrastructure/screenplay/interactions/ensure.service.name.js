import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import Task from '../base/task.js'

export default class EnsureServiceName extends Task {
  static is(expectedServiceName) {
    return new EnsureServiceName(expectedServiceName)
  }

  constructor(expectedServiceName) {
    super()
    this.expectedServiceName = expectedServiceName
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.expectElementToContainText(
      CommonElementsPage.serviceName,
      this.expectedServiceName
    )
  }
}

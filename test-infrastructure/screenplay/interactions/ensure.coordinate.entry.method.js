import Task from '../base/task.js'

import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'

export default class EnsureThatCoordinateEntryMethodSelected extends Task {
  static is(expectedMethod) {
    return new EnsureThatCoordinateEntryMethodSelected(expectedMethod)
  }

  constructor(expectedMethod) {
    super()
    this.expectedMethod = expectedMethod
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isSelected(
      HowDoYouWantToProvideCoordinatesPage.getCoordinatesInputMethodSelector(
        this.expectedMethod
      )
    )
  }
}

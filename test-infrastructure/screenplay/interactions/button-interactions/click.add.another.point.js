import EnterMultipleCoordinatesPage from '../../../pages/enter.multiple.coordinates.page.js'
import Task from '../../base/task.js'

export default class ClickAddAnotherPoint extends Task {
  static now() {
    return new ClickAddAnotherPoint()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(EnterMultipleCoordinatesPage.addAnotherPointButton)
  }
}

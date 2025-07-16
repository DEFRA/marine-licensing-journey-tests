import Task from '../../base/task.js'

export default class ClickRemovePointButton extends Task {
  static forPoint(pointNumber) {
    return new ClickRemovePointButton(pointNumber)
  }

  constructor(pointNumber) {
    super()
    this.pointNumber = pointNumber
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const buttonSelector = `[name="remove"][value="${this.pointNumber - 1}"]`
    await browseTheWeb.click(buttonSelector)
  }
}

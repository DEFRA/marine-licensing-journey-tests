import Task from '../../base/task.js'

export default class ClickButton extends Task {
  static withText(buttonText) {
    return new ClickButton(buttonText)
  }

  constructor(buttonText) {
    super()
    this.buttonText = buttonText
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const buttonSelector = `button*=${this.buttonText}`
    await browseTheWeb.click(buttonSelector)
  }
}

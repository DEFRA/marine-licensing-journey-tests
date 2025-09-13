import Task from '../base/task.js'

export default class EnsureCookiesRadioButtonSelected extends Task {
  static is(radioOption) {
    return new EnsureCookiesRadioButtonSelected(radioOption)
  }

  constructor(radioOption) {
    super()
    this.radioOption = radioOption
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    const radioSelector =
      this.radioOption === 'Yes'
        ? 'input[name="analytics"][value="yes"]'
        : 'input[name="analytics"][value="no"]'

    await browseTheWeb.isSelected(radioSelector)
  }
}

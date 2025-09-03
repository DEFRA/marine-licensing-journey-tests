import Task from '../base/task.js'

export default class EnsureJurisdictionCheckPage extends Task {
  static isDisplayed() {
    return new EnsureJurisdictionCheckPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.expectElementToContainText(
      'h1',
      'Where will the activity take place?'
    )
    await browseTheWeb.expectElementToContainText('main', 'Jurisdiction check')
    await browseTheWeb.expectElementToBePresent('input[type="radio"]')
    await browseTheWeb.expectElementToBePresent('button*=Continue')
  }
}

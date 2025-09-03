import Task from '../base/task.js'

export default class EnsureThatIatIsDisplayed extends Task {
  static now() {
    return new EnsureThatIatIsDisplayed()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.expectElementToContainText(
      'h1',
      'Check if you need a marine licence'
    )
    await browseTheWeb.expectElementToContainText(
      'main',
      'Use this tool to find out:'
    )
    await browseTheWeb.expectElementToBePresent('button*=Start now')
  }
}

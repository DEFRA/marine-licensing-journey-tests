export default class TakeScreenshot {
  static named(name) {
    return new TakeScreenshot(name)
  }

  constructor(name) {
    this.name = name || 'Screenshot'
  }

  async performAs(actor) {
    await actor.ability.takeScreenshot(this.name)
  }
}

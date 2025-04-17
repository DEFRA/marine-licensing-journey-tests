export default class ApplyForExemption {
  static where(url) {
    return new ApplyForExemption(url)
  }

  constructor(url) {
    this.url = url
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.navigateTo(this.url)
  }
}

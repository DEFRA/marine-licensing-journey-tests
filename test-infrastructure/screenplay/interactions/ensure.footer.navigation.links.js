import Task from '../base/task.js'

export default class EnsureFooterNavigationLinks extends Task {
  static areDisplayed(expectedLinks) {
    return new EnsureFooterNavigationLinks(expectedLinks)
  }

  constructor(expectedLinks) {
    super()
    this.expectedLinks = expectedLinks
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    for (const linkText of this.expectedLinks) {
      const linkSelector = `//footer//a[normalize-space(text())="${linkText}"]`
      await browseTheWeb.isDisplayed(linkSelector)
    }
  }
}

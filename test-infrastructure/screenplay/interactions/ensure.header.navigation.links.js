import Task from '../base/task.js'

export default class EnsureHeaderNavigationLinks extends Task {
  static areDisplayed(expectedLinks) {
    return new EnsureHeaderNavigationLinks(expectedLinks)
  }

  constructor(expectedLinks) {
    super()
    this.expectedLinks = expectedLinks
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    // Verify each expected link is visible by its text content
    for (const linkText of this.expectedLinks) {
      const linkSelector = `//a[normalize-space(text())="${linkText}"]`
      await browseTheWeb.isDisplayed(linkSelector)
    }
  }
}

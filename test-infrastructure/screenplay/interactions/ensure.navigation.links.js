import Task from '../base/task.js'

export default class EnsureNavigationLinks extends Task {
  static inHeader(expectedLinks) {
    return new EnsureNavigationLinks('header', expectedLinks)
  }

  static inFooter(expectedLinks) {
    return new EnsureNavigationLinks('footer', expectedLinks)
  }

  constructor(location, expectedLinks) {
    super()
    this.location = location
    this.expectedLinks = expectedLinks
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const prefix = this.location === 'footer' ? '//footer' : ''

    for (const linkText of this.expectedLinks) {
      const linkSelector = `${prefix}//a[normalize-space(text())="${linkText}"]`
      await browseTheWeb.isDisplayed(linkSelector)
    }
  }
}

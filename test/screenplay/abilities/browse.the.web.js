export default class BrowseTheWeb {
  constructor(browser) {
    this.browser = browser
  }

  async navigateTo(url) {
    await this.browser.url(url)
  }

  async getTitle() {
    return await this.browser.getTitle()
  }

  async getHeading() {
    return await this.browser.$('h1').getText()
  }
}

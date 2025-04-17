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

  async sendKeys(locator, keys) {
    await this.browser.$(locator).setValue(keys)
  }

  async click(locator) {
    await this.browser.$(locator).click()
  }

  async selectOption(locator, option) {
    await this.browser.$(locator).selectByVisibleText(option)
  }

  async getText(locator) {
    return await this.browser.$(locator).getText()
  }
}

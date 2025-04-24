import Ability from '../abilities/ability'

/**
 * Represents an ability to browse the web using a browser instance.
 * Extends the Ability class to provide type safety
 */
export default class BrowseTheWeb extends Ability {
  /**
   * Creates an instance of BrowseTheWeb.
   * @param {Object} browser - The browser instance used for web interactions.
   */
  constructor(browser) {
    super()
    this.browser = browser
  }

  /**
   * Navigates to the specified URL.
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async navigateTo(url) {
    await this.browser.url(url)
  }

  /**
   * Retrieves the current page title.
   * @returns {Promise<string>} A promise that resolves to the page title.
   */
  async getTitle() {
    return await this.browser.getTitle()
  }

  /**
   * Retrieves the text content of the first `<h1>` element on the page.
   * @returns {Promise<string>} A promise that resolves to the heading text.
   */
  async getHeading() {
    return await this.browser.$('h1').getText()
  }

  /**
   * Sends keys to an input field identified by the given locator.
   * @param {string} locator - The selector for the input field.
   * @param {string} keys - The text to input.
   * @returns {Promise<void>} A promise that resolves when the keys are sent.
   */
  async sendKeys(locator, keys) {
    await this.browser.$(locator).setValue(keys)
  }

  /**
   * Clicks an element identified by the given locator.
   * @param {string} locator - The selector for the clickable element.
   * @returns {Promise<void>} A promise that resolves when the element is clicked.
   */
  async click(locator) {
    await this.browser.$(locator).click()
  }

  async clickSaveAndContinue() {
    await this.click('button[type="submit"]')
  }

  /**
   * Selects an option from a dropdown menu.
   * @param {string} locator - The selector for the dropdown element.
   * @param {string} option - The visible text of the option to select.
   * @returns {Promise<void>} A promise that resolves when the option is selected.
   */
  async selectOption(locator, option) {
    await this.browser.$(locator).selectByVisibleText(option)
  }

  /**
   * Retrieves the text content of an element identified by the given locator, ensuring the element is visible first.
   * @param {string} locator - The selector for the element.
   * @returns {Promise<string>} A promise that resolves to the element's text if it is not blank and visible.
   */
  async getText(locator) {
    const errorElement = $(locator)
    browser.waitUntil(() => errorElement.getText() !== '', {
      timeout: 5000,
      timeoutMsg: 'Error message did not match within the specified time'
    })
    return errorElement.getText()
  }

  /**
   * Takes a screenshot of the current page.
   * @param {string} name - The name to assign to the screenshot.
   * @returns {Promise<void>} A promise that resolves when the screenshot is taken.
   */
  async takeScreenshot(name) {
    await this.browser.takeScreenshot()
  }
}

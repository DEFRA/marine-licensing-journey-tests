import { expect } from '~/node_modules/@wdio/globals/build/index'
import Ability from '../abilities/ability'

/**
 * Represents an ability to browse the web using a browser instance.
 * Extends the Ability class to provide type safety
 */
export default class BrowseTheWeb extends Ability {
  /**
   * Creates an instance of BrowseTheWeb.
   *
   * @param {Object} browser - The browser instance used for web interactions.
   */
  constructor(browser) {
    super()
    this.browser = browser
  }

  /**
   * Navigates to the specified URL.
   *
   * @param {string} url - The URL to navigate to.
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async navigateTo(url) {
    await this.browser.url(url)
  }

  /**
   * Retrieves the current page title.
   *
   * @returns {Promise<string>} A promise that resolves to the page title.
   */
  async getTitle() {
    return await this.browser.getTitle()
  }

  /**
   * Retrieves the text content of the first `<h1>` element on the page.
   *
   * @returns {Promise<string>} A promise that resolves to the heading text.
   */
  async getHeading() {
    return await this.browser.$('h1').getText()
  }

  /**
   * Sends keys to an input field identified by the given locator.
   *
   * @param {string} locator - The selector for the input field.
   * @param {string} keys - The text to input.
   * @returns {Promise<void>} A promise that resolves when the keys are sent.
   */
  async sendKeys(locator, keys) {
    await this.browser.$(locator).setValue(keys)
  }

  /**
   * Clicks an element identified by the given locator.
   *
   * @param {string} locator - The selector for the clickable element.
   * @returns {Promise<void>} A promise that resolves when the element is clicked.
   */
  async click(locator) {
    await this.browser.$(locator).click()
  }

  /**
   * Calls the slickSubmit function, included for readability
   *
   * @async
   * @returns {*}
   */
  async clickSaveAndContinue() {
    await this.clickSubmit()
  }

  /**
   * Clicks a button of type submit
   *
   * @async
   * @returns {*}
   */
  async clickSubmit() {
    await this.click('button[type="submit"]')
  }

  /**
   * Selects an option from a dropdown menu.
   *
   * @param {string} locator - The selector for the dropdown element.
   * @param {string} option - The visible text of the option to select.
   * @returns {Promise<void>} A promise that resolves when the option is selected.
   */
  async selectOption(locator, option) {
    await this.browser.$(locator).selectByVisibleText(option)
  }

  /**
   * Waits for the element to have a specific text and throws an error if not
   *
   * @async
   * @param {string} locator
   * @param {string} expectedSubstring
   * @returns {*}
   */
  async expectElementToContainText(locator, expectedSubstring) {
    await this.browser.$(locator).waitForExist()
    await expect($(locator)).toHaveText(
      expect.stringContaining(expectedSubstring)
    )
  }

  /**
   * Waits for the element to have a specific value and throws an error if not
   *
   * @async
   * @param {string} locator
   * @param {string} expectedValue
   * @returns {*}
   */
  async expectElementToHaveValue(locator, expectedValue) {
    await expect($(locator)).toHaveAttribute('value', expectedValue)
  }

  /**
   * Checks if an element identified by the given locator is selected.
   *
   * @param {string} locator - The selector for the element to check.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the element is selected, otherwise `false`.
   */
  async isSelected(locator) {
    const isSelected = await this.browser.$(locator).isSelected()
    await expect(isSelected).toBe(true)
  }

  /**
   * Checks if an element identified by the given locator is not selected.
   *
   * @async
   * @param {string} locator
   * @returns {*}
   */
  async isNotSelected(locator) {
    const isSelected = await this.browser.$(locator).isSelected()
    await expect(isSelected).toBe(false)
  }

  async isDisplayed(locator) {
    await expect(this.browser.$(locator)).toBeDisplayed()
  }

  async isNotDisplayed(locator) {
    await expect(this.browser.$(locator)).not.toBeDisplayed()
  }

  async clickBack() {
    await this.browser.$('//a[text()="Back"]').click()
  }

  async clickCancel() {
    await this.browser.$('//a[text()="Cancel"]').click()
  }
}

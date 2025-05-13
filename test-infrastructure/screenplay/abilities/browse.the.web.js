import { expect } from '~/node_modules/@wdio/globals/build/index'
import Ability from '../abilities/ability'

export default class BrowseTheWeb extends Ability {
  constructor(browser) {
    super()
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

  async clickSaveAndContinue() {
    await this.clickSubmit()
  }

  async clickSubmit() {
    await this.click('button[type="submit"]')
  }

  async selectOption(locator, option) {
    await this.browser.$(locator).selectByVisibleText(option)
  }

  async expectElementToContainText(locator, expectedSubstring) {
    await this.browser.$(locator).waitForExist()
    await expect($(locator)).toHaveText(
      expect.stringContaining(expectedSubstring)
    )
  }

  async expectElementToHaveValue(locator, expectedValue) {
    await expect($(locator)).toHaveAttribute('value', expectedValue)
  }

  async isSelected(locator) {
    const isSelected = await this.browser.$(locator).isSelected()
    await expect(isSelected).toBe(true)
  }

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
    await this.click('//a[text()="Back"]')
  }

  async clickCancel() {
    await this.click('//a[text()="Cancel"]')
  }
}

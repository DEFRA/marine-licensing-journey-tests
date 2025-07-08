import { expect } from '@wdio/globals'
import { expect as chaiExpect } from 'chai'
import { DefraIdStubUserManager } from '~/test-infrastructure/helpers/defra-id-stub-user-manager.js'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import Ability from '../abilities/ability'
import { ERROR_MESSAGES } from '../constants/error-messages.js'

export default class BrowseTheWeb extends Ability {
  constructor(browser) {
    super()
    if (!browser) {
      chaiExpect.fail(ERROR_MESSAGES.MISSING_BROWSER)
    }
    this.browser = browser

    // Use defraIdUrl from config
    this.defraIdStub = new DefraIdStubUserManager(browser.options.defraIdUrl)
  }

  static using(browser) {
    return new BrowseTheWeb(browser)
  }

  async navigateTo(url) {
    await this.browser.url(url)
  }

  async getTitle() {
    return await this.browser.getTitle()
  }

  async getHeading() {
    return await this.browser.$(CommonElementsPage.mainHeading).getText()
  }

  async getElement(locator) {
    if (!locator) {
      chaiExpect.fail(ERROR_MESSAGES.LOCATOR_UNDEFINED)
    }

    if (typeof locator === 'object' && locator.primary) {
      const element = await this.browser.$(locator.primary)
      const isExisting = await element.isExisting()
      if (isExisting) {
        return element
      }

      if (locator.fallback) {
        return await this.browser.$(locator.fallback)
      }

      chaiExpect.fail(
        ERROR_MESSAGES.LOCATOR_NOT_FOUND(locator.primary, locator.fallback)
      )
    }

    return await this.browser.$(locator)
  }

  async sendKeys(locator, keys) {
    const element = await this.getElement(locator)
    await element.click()
    if (keys != null && keys !== '') {
      await element.setValue(keys)
    }
  }

  async click(locator) {
    const element = await this.getElement(locator)
    await element.click()
  }

  async clickSaveAndContinue() {
    await this.clickSubmit()
  }

  async clickSubmit() {
    await this.click(CommonElementsPage.submitButton)
  }

  async selectOption(locator, option) {
    const element = await this.getElement(locator)
    await element.selectByVisibleText(option)
  }

  async expectElementToContainText(locator, expectedSubstring) {
    const element = await this.getElement(locator)
    await element.waitForExist()
    await expect(element).toHaveText(expect.stringContaining(expectedSubstring))
  }

  async expectElementToHaveExactText(locator, expectedText) {
    const element = await this.getElement(locator)
    await element.waitForExist()
    await expect(element).toHaveText(expectedText)
  }

  async expectElementToBePresent(locator) {
    const element = await this.getElement(locator)
    await element.waitForExist()
    await expect(element).toExist()
  }

  async getText(locator) {
    const element = await this.getElement(locator)
    await element.waitForExist()
    return await element.getText()
  }

  async expectElementToHaveValue(locator, expectedValue) {
    const element = await this.getElement(locator)
    await expect(element).toHaveAttribute('value', expectedValue)
  }

  async isSelected(locator) {
    const element = await this.getElement(locator)
    const isSelected = await element.isSelected()
    await expect(isSelected).toBe(true)
  }

  async isNotSelected(locator) {
    const element = await this.getElement(locator)
    const isSelected = await element.isSelected()
    await expect(isSelected).toBe(false)
  }

  async isDisplayed(locator) {
    const element = await this.getElement(locator)
    await expect(element).toBeDisplayed()
  }

  async isNotDisplayed(locator) {
    const element = await this.getElement(locator)
    await expect(element).not.toBeDisplayed()
  }

  async clickBack() {
    await this.click(CommonElementsPage.backLink)
  }

  async clickCancel() {
    await this.click(CommonElementsPage.cancelLink)
  }

  async countElements(locator) {
    const elements = await this.browser.$$(locator)
    return elements.length
  }

  async registerTestUser(scenarioName) {
    return await this.defraIdStub.registerTestUser(scenarioName)
  }

  async expireTestUser(userId) {
    return await this.defraIdStub.expireTestUser(userId)
  }

  async setValue(locator, value) {
    const element = await this.getElement(locator)
    await element.setValue(value)
  }
}

import { expect } from '@wdio/globals'
import { expect as chaiExpect } from 'chai'
import path from 'path'
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

  async uploadFile(locator, filePath) {
    const absoluteFilePath = path.resolve(filePath)
    const remoteFilePath = await this.browser.uploadFile(absoluteFilePath)
    const element = await this.getElement(locator)
    const isHidden = await element.getAttribute('hidden')
    const isAriaHidden = await element.getAttribute('aria-hidden')

    if (isHidden === 'true' || isAriaHidden === 'true') {
      await this.browser.execute((el) => {
        const originalHidden = el.hidden
        const originalAriaHidden = el.getAttribute('aria-hidden')
        const originalTabIndex = el.tabIndex
        const originalDisplay = el.style.display
        const originalVisibility = el.style.visibility

        el.hidden = false
        el.removeAttribute('aria-hidden')
        el.style.display = 'block'
        el.style.visibility = 'visible'
        el.style.position = 'absolute'
        el.style.top = '0px'
        el.style.left = '0px'
        el.style.width = '1px'
        el.style.height = '1px'
        el.style.opacity = '0'
        el.style.zIndex = '9999'
        el.tabIndex = 0

        window.restoreFileInput = () => {
          el.hidden = originalHidden
          if (originalAriaHidden)
            el.setAttribute('aria-hidden', originalAriaHidden)
          el.tabIndex = originalTabIndex
          el.style.display = originalDisplay
          el.style.visibility = originalVisibility
          el.style.position = ''
          el.style.top = ''
          el.style.left = ''
          el.style.width = ''
          el.style.height = ''
          el.style.opacity = ''
          el.style.zIndex = ''
        }
      }, element)

      try {
        await element.setValue(remoteFilePath)
      } finally {
        await this.browser.execute(() => {
          if (window.restoreFileInput) {
            window.restoreFileInput()
            delete window.restoreFileInput
          }
        })
      }
    } else {
      await element.setValue(remoteFilePath)
    }
  }
}

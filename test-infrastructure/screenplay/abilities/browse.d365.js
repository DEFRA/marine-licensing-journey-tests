import { chromium } from 'playwright'
import { takePlaywrightScreenshot } from '~/test-infrastructure/capture/index.js'

export default class BrowseD365 {
  static withPlaywright() {
    return new BrowseD365()
  }

  constructor() {
    this.browser = null
    this.context = null
    this.page = null
  }

  async launch() {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: process.env.HEADLESS === 'true',
        devtools: false,
        executablePath: '/usr/lib/chromium/chromium'
      })
      this.context = await this.browser.newContext()
      this.context.setDefaultTimeout(60000)
      this.context.setDefaultNavigationTimeout(60000)
      this.page = await this.context.newPage()
    }
    return this.page
  }

  async navigateToUrl(url) {
    const page = await this.launch()
    await page.goto(url)
    await page.waitForLoadState('networkidle')
  }

  async fillField(selector, value) {
    const page = await this.launch()
    await page.locator(selector).fill(value)
  }

  async clickElement(selector) {
    const page = await this.launch()
    await page.locator(selector).click()
  }

  async isElementVisible(selector) {
    const page = await this.launch()
    return await page.locator(selector).isVisible()
  }

  async getInputValue(selector) {
    const page = await this.launch()
    return await page.locator(selector).inputValue()
  }

  async takeScreenshot(name = 'Screenshot') {
    const page = await this.launch()
    return await takePlaywrightScreenshot(page, name)
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
      this.context = null
      this.page = null
    }
  }
}

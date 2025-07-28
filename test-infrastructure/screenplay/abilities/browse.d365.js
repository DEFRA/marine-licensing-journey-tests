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
    this.accessToken = null
  }

  async launch() {
    if (!this.browser) {
      const launchOptions = {
        headless: process.env.HEADLESS === 'true',
        devtools: false
      }

      if (process.env.ENVIRONMENT === 'test') {
        launchOptions.executablePath = '/usr/lib/chromium/chromium'
      }

      this.browser = await chromium.launch(launchOptions)
      this.context = await this.browser.newContext({
        ignoreHTTPSErrors: true
      })

      this.context.setDefaultTimeout(60000)
      this.context.setDefaultNavigationTimeout(60000)
      this.page = await this.context.newPage()

      // Set authentication header if token is available
      if (this.accessToken) {
        await this.page.setExtraHTTPHeaders({
          Authorization: `Bearer ${this.accessToken}`
        })
      }
    }
    return this.page
  }

  async setAuthenticationToken(accessToken) {
    this.accessToken = accessToken

    // If page already exists, update headers
    if (this.page) {
      await this.page.setExtraHTTPHeaders({
        Authorization: `Bearer ${accessToken}`
      })
    }
  }

  async navigateToUrl(url) {
    const page = await this.launch()
    await page.goto(url)
  }

  async fillField(selector, value) {
    const page = await this.launch()
    await page.locator(selector).fill(value)
  }

  async clickElement(selector) {
    const page = await this.launch()
    await page.locator(selector).click()
  }

  async clickByRole(role, name) {
    const page = await this.launch()
    await page.getByRole(role, { name }).click()
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
      this.accessToken = null
    }
  }
}

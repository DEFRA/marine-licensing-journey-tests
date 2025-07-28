import { chromium } from 'playwright'
import { takePlaywrightScreenshot } from '~/test-infrastructure/capture/index.js'
import { ensureWebDriverSession } from './ensure.webdriver.session.js'

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
      const cdpEndpoint = process.env.CHROMEDRIVER_URL
        ? `http://${process.env.CHROMEDRIVER_URL}:9222`
        : 'http://localhost:9222'

      try {
        await ensureWebDriverSession()
        this.browser = await chromium.connectOverCDP(cdpEndpoint)

        const contexts = this.browser.contexts()
        this.context =
          contexts.length > 0 ? contexts[0] : await this.browser.newContext()
        const pages = this.context.pages()
        this.page = pages.length > 0 ? pages[0] : await this.context.newPage()
      } catch (cdpError) {
        if (process.env.CHROMEDRIVER_URL) {
          throw new Error(
            `Cannot connect to shared Chrome at ${cdpEndpoint}. Browser installation blocked by proxy in CDP environment.`
          )
        }

        this.browser = await chromium.launch({
          headless: process.env.HEADLESS !== 'false'
        })
        this.context = await this.browser.newContext()
        this.context.setDefaultTimeout(60000)
        this.context.setDefaultNavigationTimeout(60000)
        this.page = await this.context.newPage()
      }
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
      if (this.browser.constructor.name === 'CDPBrowser') {
        this.browser = null
        this.context = null
        this.page = null
      } else {
        await this.browser.close()
        this.browser = null
        this.context = null
        this.page = null
      }
    }
  }
}

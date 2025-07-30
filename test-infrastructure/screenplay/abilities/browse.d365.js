import { chromium } from 'playwright'
import {
  attachJson,
  takePlaywrightScreenshot
} from '~/test-infrastructure/capture/index.js'

export default class BrowseD365 {
  static withPlaywright() {
    return new BrowseD365()
  }

  constructor() {
    this.browser = null
    this.context = null
    this.page = null
    this.accessToken = null
    this.networkRequests = []
    this.networkResponses = []
  }

  async launch() {
    if (!this.browser) {
      const launchOptions = {
        headless: process.env.HEADLESS === 'true',
        devtools: false,
        args: [
          '--no-sandbox',
          '--disable-infobars',
          '--disable-gpu',
          '--window-size=1920,1080',
          '--enable-features=NetworkService,NetworkServiceInProcess',
          '--password-store=basic',
          '--use-mock-keychain',
          '--dns-prefetch-disable',
          '--disable-background-networking',
          '--disable-remote-fonts',
          '--ignore-certificate-errors',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--ignore-ssl-errors=true',
          '--ignore-ssl-errors-list',
          '--ignore-certificate-errors-spki-list',
          '--disable-blink-features=AutomationControlled',
          '--no-first-run',
          '--no-default-browser-check',
          '--disable-extensions',
          '--disable-plugins',
          '--disable-default-apps'
        ]
      }

      if (process.env.ENVIRONMENT === 'test') {
        launchOptions.executablePath = '/usr/lib/chromium/chromium'
      }

      this.browser = await chromium.launch(launchOptions)

      const contextOptions = {
        ignoreHTTPSErrors: true,
        viewport: { width: 1920, height: 1080 },
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        extraHTTPHeaders: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
        }
      }

      const httpProxyConfig = process.env.HTTP_PROXY
      const httpsProxyConfig = process.env.HTTPS_PROXY

      if (httpProxyConfig || httpsProxyConfig) {
        contextOptions.proxy = {
          server: httpsProxyConfig || httpProxyConfig
        }
      }

      this.context = await this.browser.newContext(contextOptions)

      this.context.setDefaultTimeout(60000)
      this.context.setDefaultNavigationTimeout(60000)

      this.page = await this.context.newPage()

      await this.page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
      })

      this.setupNetworkMonitoring()

      if (this.accessToken) {
        await this.page.setExtraHTTPHeaders({
          Authorization: `Bearer ${this.accessToken}`
        })
      }
    }
    return this.page
  }

  setupNetworkMonitoring() {
    this.page.on('request', (request) => {
      this.networkRequests.push({
        timestamp: new Date().toISOString(),
        method: request.method(),
        url: request.url(),
        headers: request.headers(),
        postData: request.postData()
      })
    })

    this.page.on('response', (response) => {
      this.networkResponses.push({
        timestamp: new Date().toISOString(),
        status: response.status(),
        statusText: response.statusText(),
        url: response.url(),
        headers: response.headers()
      })
    })

    this.page.on('requestfailed', (request) => {
      this.networkRequests.push({
        timestamp: new Date().toISOString(),
        method: request.method(),
        url: request.url(),
        failure: request.failure(),
        headers: request.headers()
      })
    })
  }

  async captureNetworkDebuggingInfo() {
    // Attach network requests and responses to allure report
    attachJson(this.networkRequests, 'D365-Network-Requests')
    attachJson(this.networkResponses, 'D365-Network-Responses')

    // Capture page info
    const pageInfo = {
      url: this.page.url(),
      title: await this.page.title().catch(() => 'Unknown'),
      userAgent: await this.page
        .evaluate(() => navigator.userAgent)
        .catch(() => 'Unknown'),
      timestamp: new Date().toISOString()
    }
    attachJson(pageInfo, 'D365-Page-Info')

    // Capture any console errors
    const consoleLogs = []
    this.page.on('console', (msg) => {
      consoleLogs.push({
        type: msg.type(),
        text: msg.text(),
        timestamp: new Date().toISOString()
      })
    })
    if (consoleLogs.length > 0) {
      attachJson(consoleLogs, 'D365-Console-Logs')
    }
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

    // Capture debugging info after navigation
    await this.captureNetworkDebuggingInfo()
  }

  async fillField(selector, value) {
    const page = await this.launch()
    await page.locator(selector).fill(value)
  }

  async clickElement(selector) {
    const page = await this.launch()
    await page.locator(selector).click()
  }

  async clickByRole(role, name, timeout = 60000) {
    const page = await this.launch()
    await page.getByRole(role, { name }).click({ timeout })
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
    // Capture final debugging info before closing
    if (this.page) {
      await this.captureNetworkDebuggingInfo()
    }

    if (this.browser) {
      await this.browser.close()
      this.browser = null
      this.context = null
      this.page = null
      this.accessToken = null
      this.networkRequests = []
      this.networkResponses = []
    }
  }
}

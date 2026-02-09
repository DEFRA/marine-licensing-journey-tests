import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  AfterStep,
  Status,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { chromium } from 'playwright'
import { getConfig } from './config.js'
import { expireTestUser } from './auth.js'

setDefaultTimeout(120_000)

let browser

BeforeAll(async function () {
  const config = getConfig()
  browser = await chromium.launch({
    headless: config.headless,
    args: config.chromiumArgs
  })
})

Before(async function (scenario) {
  this.scenarioName = scenario.pickle.name
  this.browserContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  })
  this.page = await this.browserContext.newPage()
  this.page.setDefaultTimeout(30_000)
})

AfterStep(async function () {
  if (this.page && !this.page.isClosed()) {
    try {
      const screenshot = await this.page.screenshot({ timeout: 10_000 })
      this.attach(screenshot, 'image/png')
    } catch {
      // Screenshot can timeout if page is mid-navigation; skip silently
    }
  }
})

After(async function (scenario) {
  if (
    scenario.result?.status === Status.FAILED &&
    this.page &&
    !this.page.isClosed()
  ) {
    const screenshot = await this.page.screenshot({ fullPage: true })
    this.attach(screenshot, 'image/png')
    this.attach(`Failure URL: ${this.page.url()}`, 'text/plain')

    if (Object.keys(this.data).length > 0) {
      this.attach(JSON.stringify(this.data, null, 2), 'application/json')
    }

    if (this.testUser) {
      this.attach(
        JSON.stringify(
          {
            userId: this.testUser.userId,
            email: this.testUser.email,
            firstName: this.testUser.firstName
          },
          null,
          2
        ),
        'application/json'
      )
    }
  }

  const config = getConfig()
  if (this.testUser && !config.isRealDefraId) {
    await expireTestUser(config.defraIdUrl, this.testUser.userId)
  }

  await this.page?.close()
  await this.browserContext?.close()
})

AfterAll(async function () {
  await browser?.close()
})

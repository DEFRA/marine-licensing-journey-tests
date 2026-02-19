import {
  Before,
  After,
  AfterStep,
  BeforeAll,
  AfterAll,
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
    args: config.chromiumArgs,
    proxy: config.proxy
  })
})

Before(async function (scenario) {
  this.scenarioName = scenario.pickle.name
  this.scenarioStart = Date.now()
  console.log(`▶ START: ${scenario.pickle.name}`)
  this.browserContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  })
  this.page = await this.browserContext.newPage()
  this.page.setDefaultTimeout(30_000)
})

// Capture screenshot on step failure — attaches to the test case body in Allure.
// Attachments in the After hook go to the fixture/tear-down scope instead, which
// is collapsed by default and effectively invisible in the Allure report.
AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED && this.page && !this.page.isClosed()) {
    const screenshot = await this.page.screenshot({ fullPage: true })
    this.attach(screenshot, 'image/png')
    this.attach(`Failure URL: ${this.page.url()}`, 'text/plain')
  }
})

After(async function (scenario) {
  const status = scenario.result?.status === Status.FAILED ? 'FAIL' : 'PASS'
  const duration = ((Date.now() - this.scenarioStart) / 1000).toFixed(1)
  console.log(
    `${status === 'FAIL' ? '✗' : '✓'} ${status}: ${scenario.pickle.name} (${duration}s)`
  )

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

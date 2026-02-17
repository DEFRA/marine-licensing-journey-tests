import fs from 'node:fs'
import {
  attachRichFeatureContext,
  logOperation,
  logUserCleanup
} from './test-infrastructure/capture/index.js'

// const chromeProxyConfig = {
//   proxy: {
//     proxyType: 'manual',
//     httpProxy: 'localhost:3128',
//     sslProxy: 'localhost:3128'
//   }
// }

const getTags = () => {
  if (process.env.ENVIRONMENT === 'test') {
    return '@real-defra-id or @d365 or @fivium'
  }
  return 'not @wip and not @bug and not @local-only and not @d365 and not @real-defra-id and not @fivium'
}

export const config = {
  runner: 'local',
  baseUrl: `https://marine-licensing-frontend.${process.env.ENVIRONMENT}.cdp-int.defra.cloud/`,
  defraIdUrl: `https://cdp-defra-id-stub.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`,
  hostname: process.env.CHROMEDRIVER_URL || '127.0.0.1',
  port: process.env.CHROMEDRIVER_PORT || 4444,

  specs: ['test/features/*.feature'],
  cucumberOpts: {
    require: ['test/steps/*.js'],
    tags: getTags(),
    timeout: 120000
  },

  // ============================================================================
  // PARALLEL EXECUTION CONFIGURATION
  // ============================================================================
  // Number of instances to run in parallel
  // Start with 3-5 for local development, can go higher for CI
  // Each feature file will run in a separate worker process
  maxInstances: process.env.MAX_INSTANCES
    ? parseInt(process.env.MAX_INSTANCES)
    : 4,

  capabilities: [
    {
      // ...chromeProxyConfig,
      ...{
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--no-sandbox',
            '--disable-infobars',
            ...(process.env.HEADLESS !== 'false' ? ['--headless'] : []),
            '--disable-gpu',
            '--window-size=1920,1080',
            '--enable-features=NetworkService,NetworkServiceInProcess',
            '--password-store=basic',
            '--use-mock-keychain',
            '--dns-prefetch-disable',
            '--disable-background-networking',
            '--disable-remote-fonts',
            '--ignore-certificate-errors',
            '--disable-dev-shm-usage'
          ]
        }
      }
    }
  ],

  execArgv: ['--loader', 'esm-module-alias/loader'],

  logLevel: 'info',

  // Number of failures before the test suite bails.
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'cucumber',

  reporters: [
    [
      'spec',
      {
        addConsoleLogs: true,
        realtimeReporting: true,
        color: false
      }
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        issueLinkTemplate: 'https://eaflood.atlassian.net/browse/{}',
        disableWebdriverStepsReporting: false,
        useCucumberStepReporter: true
      }
    ]
  ],
  beforeScenario: async function (world, context) {
    await browser.reloadSession()
    attachRichFeatureContext(world)
  },
  afterStep: async function () {
    await browser.takeScreenshot()
  },
  afterScenario: async function (scenario, world) {
    if (scenario.result.status === 'FAILED') {
      await browser.takeScreenshot()
      const currentUrl = await browser.getUrl()
      logOperation('Test Failure URL', currentUrl, true)
    }

    if (process.env.ENVIRONMENT !== 'test') {
      if (global.testUsersCreated && global.testUsersCreated.length > 0) {
        const { DefraIdStubUserManager } = await import(
          './test-infrastructure/helpers/defra-id-stub-user-manager.js'
        )
        const userManager = new DefraIdStubUserManager(config.defraIdUrl)

        for (const userId of global.testUsersCreated) {
          try {
            await userManager.expireTestUser(userId)
            logUserCleanup(userId, true)
          } catch (error) {
            logUserCleanup(userId, false, error)
          }
        }

        global.testUsersCreated = []
      }
    }
  },

  onComplete: function (exitCode, config, capabilities, results) {
    // !Do Not Remove! Required for test status to show correctly in portal.
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync('FAILED', JSON.stringify(results))
    }
  }
}

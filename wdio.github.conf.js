import fs from 'node:fs'
import {
  attachRichFeatureContext,
  logUserCleanup,
  logOperation
} from './test-infrastructure/capture/index.js'

const getTags = () => {
  return 'not @wip and not @bug and not @local-only and not @d365 and not @real-defra-id and not @fivium'
}

export const config = {
  runner: 'local',
  baseUrl: `http://marine-licensing-frontend:3000/`,
  defraIdUrl: `http://localhost:3200`,

  hostname: process.env.CHROMEDRIVER_URL || '127.0.0.1',
  port: process.env.CHROMEDRIVER_PORT || 4444,

  // Run multi-site feature multiple times in parallel if MULTI_SITE_PARALLEL is set
  specs: process.env.MULTI_SITE_PARALLEL
    ? ['test/features/manual.site.details.multi.site.feature']
    : ['test/features/*.feature'],

  cucumberOpts: {
    require: ['test/steps/*.js'],
    tags: getTags(),
    timeout: 120000,
    backtrace: false
  },

  // ============================================================================
  // PARALLEL EXECUTION CONFIGURATION
  // ============================================================================
  // Number of instances to run in parallel
  // When MULTI_SITE_PARALLEL is set, maxInstances controls how many can run at once
  maxInstances: process.env.MAX_INSTANCES
    ? parseInt(process.env.MAX_INSTANCES)
    : 4,

  // Create multiple capability instances to run the same feature multiple times
  capabilities: process.env.MULTI_SITE_PARALLEL
    ? Array(parseInt(process.env.MULTI_SITE_PARALLEL))
        .fill(null)
        .map((_, index) => ({
          browserName: 'chrome',
          'cjson:metadata': { runNumber: index + 1 },
          'goog:chromeOptions': {
            args: [
              '--no-sandbox',
              '--disable-infobars',
              '--headless',
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
        }))
    : [
        {
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: [
              '--no-sandbox',
              '--disable-infobars',
              '--headless',
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
      ],

  execArgv: ['--loader', 'esm-module-alias/loader'],

  logLevel: 'warn',

  // Number of failures before the test suite bails.
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 180000, // Increased for high parallel load
  connectionRetryCount: 5, // More retries for parallel execution
  framework: 'cucumber',

  reporters: [
    [
      'spec',
      {
        addConsoleLogs: false,
        realtimeReporting: false,
        color: false
      }
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        issueLinkTemplate: 'https://eaflood.atlassian.net/browse/{}',
        disableWebdriverStepsReporting: true,
        useCucumberStepReporter: true,
        disableMochaArtifacts: true,
        addConsoleLogs: false,
        useCucumberStepReporter: true
      }
    ]
  ],
  beforeScenario: async function (world, context) {
    const capabilities = browser.capabilities
    const runNumber = capabilities['cjson:metadata']?.runNumber || 'N/A'
    const sessionId = browser.sessionId

    console.log(
      `[WDIO] [Run #${runNumber}] [Session: ${sessionId}] Starting scenario: "${world.pickle.name}"`
    )

    // Add run information to Allure report
    if (global.allure) {
      global.allure.addLabel('thread', `Run-${runNumber}`)
      global.allure.addLabel('host', `Session-${sessionId}`)
      global.allure.addParameter('Run Number', runNumber)
      global.allure.addParameter('Session ID', sessionId)
    }

    await browser.reloadSession()
    attachRichFeatureContext(world)
  },

  afterScenario: async function (scenario, world) {
    if (scenario.result.status === 'FAILED') {
      const capabilities = browser.capabilities
      const runNumber = capabilities['cjson:metadata']?.runNumber || 'N/A'
      const sessionId = browser.sessionId

      await browser.takeScreenshot()
      const currentUrl = await browser.getUrl()

      console.log(
        `[WDIO] [Run #${runNumber}] [Session: ${sessionId}] ❌ FAILED at URL: ${currentUrl}`
      )
      logOperation(`Test Failure [Run #${runNumber}]`, currentUrl, true)

      // Add failure context to Allure
      if (global.allure) {
        global.allure.addAttachment(
          `Failed URL (Run #${runNumber})`,
          currentUrl,
          'text/plain'
        )
      }
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
      } else {
        console.log(
          `[WDIO] No users to clean up (either array doesn't exist or is empty)`
        )
      }
    } else {
      console.log(`[WDIO] Skipping user cleanup because ENVIRONMENT is 'test'`)
    }
  },

  // Add hooks to capture navigation and command failures
  beforeCommand: async function (commandName, args) {
    if (commandName === 'navigateTo' || commandName === 'url') {
      console.log(`[NAVIGATION] 🌐 Attempting to navigate to: ${args[0]}`)
    }
  },

  afterCommand: async function (commandName, args, result, error) {
    const isNavigationCommand =
      commandName === 'navigateTo' || commandName === 'url'
    if (error && isNavigationCommand) {
      console.log(`[NAVIGATION-ERROR] ❌ Navigation failed to: ${args[0]}`)
      console.log(`[NAVIGATION-ERROR] 📝 Error: ${error.message}`)
    }
  },

  // Hook to capture any WebDriver errors
  onError: async function (error, context) {
    console.log(
      `[WEBDRIVER-ERROR] 🚨 WebDriver Error in ${context}: ${error.message}`
    )
    console.log(
      `[WEBDRIVER-ERROR] 📍 Stack: ${error.stack?.split('\n')[1] || 'No stack available'}`
    )
  },

  onComplete: function (exitCode, config, capabilities, results) {
    console.log(`[WDIO] Test suite finished with exit code: ${exitCode}`)
    if (results) {
      console.log(
        `[WDIO] Results: ${results.passed || 0} passed, ${results.failed || 0} failed`
      )
    }

    // !Do Not Remove! Required for test status to show correctly in portal.
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync('FAILED', JSON.stringify(results))
    }
  }
}

import allure from 'allure-commandline'
import {
  attachRichFeatureContext,
  logUserCleanup
} from './test-infrastructure/capture/index.js'

const debug = process.env.DEBUG
const oneMinute = 60 * 1000

const execArgv = ['--loader', 'esm-module-alias/loader']

if (debug) {
  execArgv.push('--inspect')
}

export const config = {
  runner: 'local',
  specs: ['test/features/*.feature'],
  cucumberOpts: {
    require: ['test/steps/*.js'],
    tags: ['not @wip', 'not @bug'],
    timeout: 120000 // 60 seconds for local development (generous timeout for debugging)
  },

  // ============================================================================
  // PARALLEL EXECUTION CONFIGURATION - LOCAL DEVELOPMENT
  // ============================================================================
  // For local development, use fewer instances to avoid overwhelming the machine
  // Debug mode always uses 1 instance for easier debugging
  // Use MAX_INSTANCES environment variable to override (e.g., MAX_INSTANCES=3)
  maxInstances: debug
    ? 1
    : process.env.MAX_INSTANCES
      ? parseInt(process.env.MAX_INSTANCES)
      : 4,

  capabilities: debug
    ? [{ browserName: 'chrome' }]
    : [
        {
          // Remove maxInstances from capability level to use global setting
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: [
              '--no-sandbox',
              '--disable-infobars',
              '--disable-gpu',
              '--window-size=1920,1080',
              ...(process.env.HEADLESS === 'true' ? ['--headless'] : [])
            ]
          }
        }
      ],
  execArgv,
  logLevel: debug ? 'debug' : 'info',
  bail: 0,
  baseUrl: `http://localhost:3000/`,
  defraIdUrl: 'http://localhost:3200',
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: [
    'spec',
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
    }

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
  },
  onComplete: function (exitCode, config, capabilities, results) {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), oneMinute)

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)

        if (exitCode !== 0) {
          return reject(reportError)
        }

        allure(['open'])
        resolve()
      })
    })
  }
}

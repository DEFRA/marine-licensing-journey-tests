import allure from 'allure-commandline'

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
    require: ['test/steps/*.js']
  },
  maxInstances: 1,
  capabilities: debug
    ? [{ browserName: 'chrome' }]
    : [
        {
          maxInstances: 1,
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: [
              '--no-sandbox',
              '--disable-infobars',
              '--disable-gpu',
              '--window-size=1920,1080'
            ]
          }
        }
      ],
  execArgv,
  logLevel: debug ? 'debug' : 'info',
  bail: 1,
  baseUrl: `http://localhost:3000/`,
  waitforTimeout: 5000,
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

  /**
   * This cucumber hook executes after a scenario and attaches a screenshot
   * to the report if the scenario has failed
   *
   * @param {object} scenario the cucumber scenario context
   */
  afterScenario: async function (scenario) {
    if (scenario.result.status === 'FAILED') {
      await browser.takeScreenshot()
    }
  },

  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {object} exitCode 0 - success, 1 - fail
   * @param {object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
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

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
    require: ['test/steps/*.js'],
    tags: ['not @wip']
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
  bail: 0,
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
  beforeScenario: async function () {
    await browser.reloadSession()
  },
  afterStep: async function (step, scenario, result) {
    await browser.takeScreenshot()
  },
  afterScenario: async function (scenario) {
    if (scenario.result.status === 'FAILED') {
      await browser.takeScreenshot()
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

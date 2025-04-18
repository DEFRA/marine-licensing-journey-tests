import fs from 'node:fs'

let chromeProxyConfig = {}
if (process.env.HTTP_PROXY) {
  const url = new URL(process.env.HTTP_PROXY)
  chromeProxyConfig = {
    proxy: {
      proxyType: 'manual',
      httpProxy: `${url.host}:${url.port}`,
      sslProxy: `${url.host}:${url.port}`
    }
  }
}

export const config = {
  // Runner Configuration
  runner: 'local',

  // Base URL for the application
  baseUrl: `https://marine-licensing-frontend.${process.env.ENVIRONMENT}.cdp-int.defra.cloud/`,

  // Connection to remote chromedriver
  hostname: process.env.CHROMEDRIVER_URL || '127.0.0.1',
  port: process.env.CHROMEDRIVER_PORT || 4444,

  // Test files configuration
  specs: ['test/features/*.feature'],
  exclude: [],
  cucumberOpts: {
    require: ['test/steps/*.js']
  },
  maxInstances: 1,

  // Common Chrome capabilities
  capabilities: [
    {
      ...chromeProxyConfig,
      ...{
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
    }
  ],

  // ESM module loader
  execArgv: ['--loader', 'esm-module-alias/loader'],

  // Logging and timeouts
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 6000,
  connectionRetryCount: 3,

  // Framework
  framework: 'cucumber',

  // Reporters
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
        useCucumberStepReporter: true
      }
    ]
  ],

  // Hooks
  onComplete: function (exitCode, config, capabilities, results) {
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync('FAILED', JSON.stringify(results))
    }
  }
}

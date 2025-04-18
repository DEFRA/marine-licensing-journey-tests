import { bootstrap } from 'global-agent'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { config as baseConfig } from './wdio.base.conf.js'

/**
 * Enable webdriver.io to use the outbound proxy.
 * This is required for the test suite to be able to talk to BrowserStack.
 */
if (process.env.HTTP_PROXY) {
  const dispatcher = new ProxyAgent({
    uri: process.env.HTTP_PROXY
  })
  setGlobalDispatcher(dispatcher)
  bootstrap()
  global.GLOBAL_AGENT.HTTP_PROXY = process.env.HTTP_PROXY
}

export const config = {
  ...baseConfig,

  // BrowserStack credentials
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_KEY,

  // BrowserStack specific capabilities
  commonCapabilities: {
    'bstack:options': {
      buildName: `marine-licensing-journey-tests-${process.env.ENVIRONMENT}`
    }
  },

  capabilities: [
    {
      browserName: 'Chrome',
      'bstack:options': {
        browserVersion: 'latest',
        os: 'Windows',
        osVersion: '11'
      }
    }
  ],

  // BrowserStack service configuration
  services: [
    [
      'browserstack',
      {
        testObservability: true,
        testObservabilityOptions: {
          user: process.env.BROWSERSTACK_USER,
          key: process.env.BROWSERSTACK_KEY,
          projectName: 'cdp-node-env-test-suite',
          buildName: `marine-licensing-journey-tests-${process.env.ENVIRONMENT}`
        },
        acceptInsecureCerts: true,
        forceLocal: false,
        browserstackLocal: true
      }
    ]
  ]
}

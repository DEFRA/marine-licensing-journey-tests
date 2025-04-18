import { bootstrap } from 'global-agent'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { config as baseConfig } from './wdio.browserstack.base.conf.js'

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

  // Add any CDP Portal specific overrides here
  services: [
    [
      'browserstack',
      {
        ...baseConfig.services[0][1],
        opts: {
          proxyHost: 'localhost',
          proxyPort: 3128
        }
      }
    ]
  ]
}

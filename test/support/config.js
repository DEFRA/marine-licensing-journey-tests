const environment = process.env.ENVIRONMENT || 'local'

function getBaseURL() {
  if (environment === 'local') {
    return 'http://marine-licensing-frontend:3000'
  }
  return `https://marine-licensing-frontend.${environment}.cdp-int.defra.cloud`
}

function getDefraIdUrl() {
  if (process.env.DEFRA_ID_URL) {
    return process.env.DEFRA_ID_URL
  }
  if (environment === 'local') {
    return 'http://127.0.0.1:3200'
  }
  return `https://cdp-defra-id-stub.${environment}.cdp-int.defra.cloud`
}

const cdpEnvironments = ['dev', 'test']

function isCdpEnvironment() {
  return cdpEnvironments.includes(environment)
}

/**
 * Chromium-level proxy (matches wdio.conf.js chromeProxyConfig).
 * Uses --proxy-server so Chromium handles proxy directly, not Playwright.
 */
function getChromiumArgs() {
  const args = []

  if (isCdpEnvironment()) {
    args.push(
      '--proxy-server=http://localhost:3128',
      '--ignore-certificate-errors',
      '--disable-dev-shm-usage'
    )
  }

  if (environment === 'local' || process.env.BASE_URL) {
    const dockerHostnames = [
      'marine-licensing-frontend',
      'defra-id-stub',
      'cdp-uploader'
    ]
    const rules = dockerHostnames.map((h) => `MAP ${h} 127.0.0.1`).join(',')
    args.push(`--host-resolver-rules=${rules}`)
  }

  return args
}

export function getConfig() {
  return {
    baseURL: getBaseURL(),
    defraIdUrl: getDefraIdUrl(),
    headless: process.env.HEADLESS !== 'false',
    environment,
    isRealDefraId: environment === 'test',
    chromiumArgs: getChromiumArgs()
  }
}

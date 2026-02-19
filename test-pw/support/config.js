const environment = process.env.ENVIRONMENT || 'local'

function getBaseURL() {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL
  }
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

function getChromiumArgs() {
  if (environment !== 'local' && !process.env.BASE_URL) {
    return []
  }

  // Docker hostnames the browser will encounter during OIDC redirect chain
  // and file upload flow: frontend → defra-id-stub (auth), frontend → cdp-uploader (file upload)
  const dockerHostnames = [
    'marine-licensing-frontend',
    'defra-id-stub',
    'cdp-uploader'
  ]

  const rules = dockerHostnames.map((h) => `MAP ${h} 127.0.0.1`).join(',')
  return [`--host-resolver-rules=${rules}`]
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

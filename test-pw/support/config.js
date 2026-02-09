const environment = process.env.ENVIRONMENT || 'local'

function getBaseURL() {
  if (process.env.CI) {
    return 'http://marine-licensing-frontend:3000'
  }
  if (environment === 'local') {
    return 'http://marine-licensing-frontend.local:3000'
  }
  return `https://marine-licensing-frontend.${environment}.cdp-int.defra.cloud`
}

function getDefraIdUrl() {
  if (process.env.CI || environment === 'local') {
    return 'http://localhost:3200'
  }
  return `https://cdp-defra-id-stub.${environment}.cdp-int.defra.cloud`
}

export function getConfig() {
  return {
    baseURL: getBaseURL(),
    defraIdUrl: getDefraIdUrl(),
    headless: process.env.HEADLESS !== 'false',
    environment,
    isRealDefraId: environment === 'test'
  }
}

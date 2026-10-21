import { ProxyAgent, fetch } from 'undici'
import { CDP_PROXY_URL, getConfig } from './config.js'

const CLEANUP_ENVIRONMENTS = ['dev', 'test']

let proxyAgent

function backendFetch(url, options) {
  const { environment } = getConfig()
  if (environment === 'local' || process.env.CDP_PROXY === 'false') {
    return fetch(url, options)
  }
  proxyAgent ??= new ProxyAgent(CDP_PROXY_URL)
  return fetch(url, { ...options, dispatcher: proxyAgent })
}

function getBackendBaseUrl() {
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.replace(/\/$/, '')
  }

  const { environment } = getConfig()
  if (environment === 'local') {
    return 'http://127.0.0.1:3001'
  }

  return `https://marine-licensing-backend.${environment}.cdp-int.defra.cloud`
}

/**
 * Asks the backend to remove journey-test data left in MongoDB.
 * Only called for CDP `dev` and `test` — the backend endpoint itself is also
 * registered only on those environments.
 *
 * Errors are logged and swallowed so cleanup never masks the scenario result.
 */
export async function cleanupJourneyTestData() {
  const { environment } = getConfig()

  if (!CLEANUP_ENVIRONMENTS.includes(environment)) {
    return
  }

  const url = `${getBackendBaseUrl()}/test-data/cleanup`

  try {
    const response = await backendFetch(url, { method: 'POST' })
    if (!response.ok) {
      const body = await response.text()
      console.warn(`[cleanup] POST ${url} failed: ${response.status} ${body}`)
      return
    }

    const payload = await response.json()
    console.log(
      `[cleanup] ${environment}: removed`,
      JSON.stringify(payload.value?.deleted ?? payload)
    )
  } catch (error) {
    console.warn(`[cleanup] POST ${url} failed: ${error.message}`)
  }
}

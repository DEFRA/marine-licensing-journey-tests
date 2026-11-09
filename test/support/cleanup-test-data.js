import { ProxyAgent, fetch } from 'undici'
import { CDP_PROXY_URL, getConfig } from './config.js'

const CLEANUP_ENVIRONMENTS = ['dev']

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
 * Called once after the full suite finishes (entrypoint.sh), not after each
 * scenario — per-scenario wipe races with parallel workers.
 *
 * No-op unless ENVIRONMENT is `dev`. Not run on `test` so shared example data
 * is preserved. The backend endpoint is also registered only on `dev`.
 *
 * Errors are logged and swallowed so cleanup never fails the suite.
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

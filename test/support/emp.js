import { ProxyAgent, fetch } from 'undici'
import { CDP_PROXY_URL, getConfig } from './config.js'

// The feature layer the test environment's backend pushes exemptions to.
const DEFAULT_EMP_API_URL =
  'https://services.arcgis.com/JJzESW51TqeY9uat/arcgis/rest/services/TEST_Marine_Exemptions/FeatureServer/0'

const POLL_INTERVAL_MS = 15_000

// In CDP, outbound calls must go through the Squid sidecar; native fetch
// ignores Chromium's --proxy-server, so it is given the proxy explicitly.
let proxyAgent
function empFetch(url, options) {
  if (getConfig().environment === 'local') {
    return fetch(url, options)
  }
  proxyAgent ??= new ProxyAgent(CDP_PROXY_URL)
  return fetch(url, { ...options, dispatcher: proxyAgent })
}

function empCredentials() {
  const token = process.env.EMP_API_KEY
  if (!token) {
    throw new Error(
      'EMP_API_KEY environment variable is required to query the EMP feature layer'
    )
  }
  return { url: process.env.EMP_API_URL || DEFAULT_EMP_API_URL, token }
}

/**
 * The attributes of every EMP feature for an application reference. A
 * multi-circle exemption is pushed as one feature per circle, so there can be
 * several.
 */
export async function queryEmpFeatures(applicationReference) {
  const { url, token } = empCredentials()
  const response = await empFetch(`${url}/query`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      f: 'json',
      token,
      where: `CaseReference='${applicationReference}'`,
      outFields: 'OBJECTID,CaseReference,Status',
      returnGeometry: 'false'
    })
  })

  if (!response.ok) {
    throw new Error(`EMP query failed with HTTP ${response.status}`)
  }

  // ArcGIS reports errors with a 200 and an error body.
  const body = await response.json()
  if (body.error) {
    throw new Error(
      `EMP query failed: ${body.error.code} ${body.error.message}`
    )
  }

  return body.features.map((feature) => feature.attributes)
}

/**
 * Polls EMP until every feature for the reference carries the status. Pushes go
 * through the backend's EMP queue, so they land some seconds after the change.
 */
export async function waitForEmpStatus(
  applicationReference,
  status,
  timeoutMs
) {
  const deadline = Date.now() + timeoutMs
  let features = []

  while (Date.now() < deadline) {
    features = await queryEmpFeatures(applicationReference)
    if (
      features.length > 0 &&
      features.every((feature) => feature.Status === status)
    ) {
      return features
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
  }

  const seen =
    features.length > 0
      ? features.map((feature) => feature.Status).join(', ')
      : 'no features'
  throw new Error(
    `EMP did not show ${applicationReference} as "${status}" within ${timeoutMs / 1000}s (last seen: ${seen})`
  )
}

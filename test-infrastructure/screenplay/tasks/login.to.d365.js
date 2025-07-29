import { expect } from 'chai'
import Task from '../base/task.js'
import LaunchD365 from '../interactions/launch.d365.js'

export default class LoginToD365 extends Task {
  static now() {
    return new LoginToD365()
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')

    if (!browseD365) {
      throw new Error('Actor must have BrowseD365 ability to login to D365')
    }

    const accessToken = await this.getD365AccessToken()
    await browseD365.setAuthenticationToken(accessToken)
    await actor.attemptsTo(LaunchD365.now())
  }

  async proxyFetch(url, options) {
    const proxyUrlConfig = process.env.HTTP_PROXY

    if (!proxyUrlConfig) {
      return fetch(url, options)
    }

    const { ProxyAgent } = await import('undici')

    return fetch(url, {
      ...options,
      dispatcher: new ProxyAgent({
        uri: proxyUrlConfig,
        keepAliveTimeout: 10,
        keepAliveMaxTimeout: 10
      })
    })
  }

  validateD365Config(userId, password, clientId, tenantId) {
    if (!userId) {
      expect.fail('Missing D365_USER_ID environment variable')
    }
    if (!password) {
      expect.fail('Missing D365_USER_PASSWORD environment variable')
    }
    if (!clientId) {
      expect.fail('Missing D365_CLIENT_ID environment variable')
    }
    if (!tenantId) {
      expect.fail('Missing D365_TENANT_ID environment variable')
    }
  }

  async getD365AccessToken() {
    const userId = process.env.D365_USER_ID
    const password = process.env.D365_USER_PASSWORD
    const tenantId = process.env.D365_TENANT_ID
    const clientId = process.env.D365_CLIENT_ID
    const scope = 'https://marinelicensingdev.crm11.dynamics.com/.default'

    this.validateD365Config(userId, password, clientId, tenantId)

    try {
      const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`

      const formData = new URLSearchParams()
      formData.append('grant_type', 'password')
      formData.append('client_id', clientId)
      formData.append('scope', scope)
      formData.append('username', userId)
      formData.append('password', password)

      const response = await this.proxyFetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      })

      if (!response.ok) {
        const error = await response.text()
        expect.fail(`Failed to get access token: ${response.status} ${error}`)
      }

      const tokenData = await response.json()
      return tokenData.access_token
    } catch (error) {
      expect.fail(`OAuth2 token acquisition failed: ${error.message}`)
    }
  }
}

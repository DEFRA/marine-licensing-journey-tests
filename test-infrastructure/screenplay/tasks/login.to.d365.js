import { expect } from 'chai'
import Task from '../base/task.js'

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
    await browseD365.navigateToUrl(process.env.D365_URL)
  }

  async getD365AccessToken() {
    const userId = process.env.D365_USER_ID
    const password = process.env.D365_USER_PASSWORD
    const tenantId = process.env.D365_TENANT_ID || 'defradev.onmicrosoft.com'
    const clientId = process.env.D365_CLIENT_ID || '04b07795-8ddb-461a-bbee-02f9e1bf7b46' // Microsoft Office client ID

    if (!userId || !password) {
      expect.fail('Missing D365_USER_ID or D365_USER_PASSWORD environment variables')
    }

    try {
      // Use Resource Owner Password Credentials (ROPC) flow
      const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`

      const formData = new URLSearchParams()
      formData.append('grant_type', 'password')
      formData.append('client_id', clientId)
      formData.append('scope', 'https://marinelicensingdev.crm11.dynamics.com/.default')
      formData.append('username', userId)
      formData.append('password', password)

      const response = await fetch(tokenEndpoint, {
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

import { expect } from 'chai'
import { logOperation } from '~/test-infrastructure/capture/index.js'
import DefraIdLoginPage from '~/test-infrastructure/pages/defra.id.login.page.js'
import Task from '../base/task.js'
import SelectGovernmentGatewayAuthentication from './select.government.gateway.authentication.js'

export default class AuthenticateWithAPermanentUser extends Task {
  static now() {
    return new AuthenticateWithAPermanentUser()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const testUser = {
      id: process.env.DEFRA_ID_USER_ID,
      password: process.env.DEFRA_ID_USER_PASSWORD
    }

    if (!testUser.password) {
      expect.fail('Missing DEFRA_ID_USER_PASSWORD environment variable')
    }

    await actor.attemptsTo(SelectGovernmentGatewayAuthentication.now())

    await browseTheWeb.setValue(DefraIdLoginPage.usernameField, testUser.id)
    await browseTheWeb.setValue(
      DefraIdLoginPage.passwordField,
      testUser.password
    )

    await browseTheWeb.waitForEnabled(DefraIdLoginPage.signInButton)

    await browseTheWeb.click(DefraIdLoginPage.signInButton)
    logOperation(
      'Authentication',
      `Successfully authenticated as: ${testUser.id}`
    )
  }
}

import { expect } from 'chai'
import { logOperation } from '~/test-infrastructure/capture/index.js'
import DefraIdLoginPage from '~/test-infrastructure/pages/defra.id.login.page.js'
import Task from '../base/task.js'

export default class AuthenticateWith extends Task {
  static theTestUser() {
    return new AuthenticateWith()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const testUser = actor.recalls('testUser')

    if (!testUser) {
      expect.fail('No test user found in actor memory')
    }

    // Click the login link for our test user
    await browseTheWeb.click(DefraIdLoginPage.loginLinkForUser(testUser.email))

    logOperation(
      'Authentication',
      `Successfully authenticated as: ${testUser.email}`
    )
  }
}

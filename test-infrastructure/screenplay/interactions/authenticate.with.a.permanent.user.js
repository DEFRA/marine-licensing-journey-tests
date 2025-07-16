import DefraIdLoginPage from '~/test-infrastructure/pages/defra.id.login.page.js'
import { expect } from 'chai'
import Task from '../base/task.js'

export default class AuthenticateWithAPermanentUser extends Task {
  static aPermanentUser() {
    return new AuthenticateWithAPermanentUser()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const testUser = {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD
    }

    if (!testUser.email || !testUser.password) {
      expect.fail(
        'Missing TEST_USER_EMAIL or TEST_USER_PASSWORD environment variables'
      )
    }

    // This interaction is simplified as we don't have the real Defra ID login page locally.
    // In a real-world scenario, this would involve filling in the username and password fields.
    await browseTheWeb.click(DefraIdLoginPage.loginLinkForUser(testUser.email))
  }
}

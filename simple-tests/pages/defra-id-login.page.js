// Reuses locators from test-infrastructure/pages/defra.id.login.page.js
export class DefraIdLoginPage {
  static selectors = {
    usernameField: '#user_id',
    passwordField: '#password',
    signInButton: '#continue'
  }

  static loginLinkForUser(email) {
    return `a[href*="user=${email}"]`
  }

  static async enterCredentials(page, username, password) {
    await page.fill(this.selectors.usernameField, username)
    await page.fill(this.selectors.passwordField, password)
  }

  static async clickSignIn(page) {
    await page.click(this.selectors.signInButton)
  }

  static async clickLoginLinkForUser(page, email) {
    await page.click(this.loginLinkForUser(email))
  }
}

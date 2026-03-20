export default class DefraIdLoginPage {
  constructor(page) {
    this.page = page
    this.usernameField = page.locator('#user_id')
    this.passwordField = page.locator('#password')
    this.signInButton = page.locator('#continue')
  }

  loginLinkForUser(email) {
    return this.page.locator(`a[href*="user=${email}"]`)
  }

  async loginAsStubUser(testUser) {
    await this.loginLinkForUser(testUser.email).click()
  }

  async loginAsPermanentUser(userId, password) {
    await this.usernameField.fill(userId)
    await this.passwordField.fill(password)
    await this.signInButton.click()
  }
}

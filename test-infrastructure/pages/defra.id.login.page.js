export default class DefraIdLoginPage {
  static usernameField = '#user_id'
  static passwordField = '#password'
  static signInButton = '#continue'

  static loginLinkForUser(email) {
    return `a[href*="user=${email}"]`
  }
}

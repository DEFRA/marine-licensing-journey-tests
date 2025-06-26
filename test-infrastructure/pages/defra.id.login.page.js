export default class DefraIdLoginPage {
  static loginLink = 'a=Log in'

  static loginLinkForUser(email) {
    return `a[href*="user=${email}"]`
  }
}

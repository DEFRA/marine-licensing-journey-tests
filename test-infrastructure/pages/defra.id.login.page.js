export default class DefraIdLoginPage {
  static usernameField = '#user_id'
  static passwordField = '#password'
  static signInButton = '#continue'
  static organisationRadio = '//label[contains(text(),"Windfarm Co")]'
  static continueButton = '#continueReplacement'

  static loginLinkForUser(email) {
    return `a[href*="user=${email}"]`
  }
}

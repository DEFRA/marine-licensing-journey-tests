// Reuses locators from test-infrastructure/pages/check.your.answers.page.js
export class CheckYourAnswersPage {
  static selectors = {
    confirmAndSendButton: 'button[type="submit"]',
    declarationCheckbox: '#confirm-declaration'
  }

  static async checkDeclaration(page) {
    await page.check(this.selectors.declarationCheckbox)
  }

  static async clickConfirmAndSend(page) {
    await page.click(this.selectors.confirmAndSendButton)
  }
}

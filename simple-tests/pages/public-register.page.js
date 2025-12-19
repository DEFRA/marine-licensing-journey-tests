// Reuses locators from test-infrastructure/pages/public.register.page.js
export class PublicRegisterPage {
  static selectors = {
    consentYes: '#consent',
    saveAndContinue: 'button[type="submit"]'
  }

  static async selectYes(page) {
    await page.check(this.selectors.consentYes)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

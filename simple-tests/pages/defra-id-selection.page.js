// Reuses locators from test-infrastructure/pages/defra.id.selection.page.js
export class DefraIdSelectionPage {
  static selectors = {
    governmentGatewayRadio: '#scp',
    continueButton: '#continueReplacement'
  }

  static async selectGovernmentGateway(page) {
    await page.check(this.selectors.governmentGatewayRadio)
  }

  static async clickContinue(page) {
    await page.click(this.selectors.continueButton)
  }
}

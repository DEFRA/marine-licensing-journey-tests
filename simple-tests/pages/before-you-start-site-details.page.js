// Reuses locators from test-infrastructure/pages/before.you.start.site.details.page.js
export class BeforeYouStartSiteDetailsPage {
  static selectors = {
    continueButton: 'a.govuk-button'
  }

  static async clickContinue(page) {
    await page.click(this.selectors.continueButton)
  }
}

// Reuses locators from test-infrastructure/pages/review.site.details.page.js
export class ReviewSiteDetailsPage {
  static selectors = {
    saveAndContinue: 'button[type="submit"]'
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

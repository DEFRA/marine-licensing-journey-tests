// Reuses locators from test-infrastructure/pages/width.of.circular.site.page.js
export class WidthOfCircularSitePage {
  static selectors = {
    widthInput: '#width',
    saveAndContinue: 'button[type="submit"]'
  }

  static async enterWidth(page, width) {
    await page.fill(this.selectors.widthInput, width.toString())
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

// Reuses locators from test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js
export class HowDoYouWantToEnterCoordinatesPage {
  static selectors = {
    circularSite: 'input[name="coordinatesEntry"][value="single"]',
    saveAndContinue: 'button[type="submit"]'
  }

  static async selectCircle(page) {
    await page.check(this.selectors.circularSite)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

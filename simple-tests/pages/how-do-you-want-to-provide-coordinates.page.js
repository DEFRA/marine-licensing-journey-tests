// Reuses locators from test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page.js
export class HowDoYouWantToProvideCoordinatesPage {
  static selectors = {
    uploadCoordinates: '#coordinatesType',
    enterCoordinates: '#coordinatesType-2',
    saveAndContinue: 'button[type="submit"]'
  }

  static async selectFileUpload(page) {
    await page.check(this.selectors.uploadCoordinates)
  }

  static async selectEnterCoordinates(page) {
    await page.check(this.selectors.enterCoordinates)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

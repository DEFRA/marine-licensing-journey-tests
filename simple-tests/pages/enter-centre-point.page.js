// Reuses locators from test-infrastructure/pages/enter.coordinates.centre.point.js
export class EnterCentrePointPage {
  static selectors = {
    latitudeInput: '#latitude',
    longitudeInput: '#longitude',
    saveAndContinue: 'button[type="submit"]'
  }

  static async enterCoordinates(page, latitude, longitude) {
    await page.fill(this.selectors.latitudeInput, latitude.toString())
    await page.fill(this.selectors.longitudeInput, longitude.toString())
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

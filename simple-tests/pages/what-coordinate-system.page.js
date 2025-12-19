// Reuses locators from test-infrastructure/pages/what.coordinate.system.page.js
export class WhatCoordinateSystemPage {
  static selectors = {
    wgs84: '#coordinateSystem',
    saveAndContinue: 'button[type="submit"]'
  }

  static async selectWGS84(page) {
    await page.check(this.selectors.wgs84)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

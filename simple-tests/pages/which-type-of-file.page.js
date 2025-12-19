// Reuses locators from test-infrastructure/pages/which.type.of.file.do.you.want.to.upload.page.js
export class WhichTypeOfFilePage {
  static selectors = {
    shapefile: '#fileUploadType',
    kml: '#fileUploadType-2',
    saveAndContinue: 'button[type="submit"]'
  }

  static async selectKML(page) {
    await page.check(this.selectors.kml)
  }

  static async selectShapefile(page) {
    await page.check(this.selectors.shapefile)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

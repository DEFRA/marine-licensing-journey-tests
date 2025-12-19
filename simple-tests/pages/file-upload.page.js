// Reuses locators from test-infrastructure/pages/file.upload.page.js
export class FileUploadPage {
  static selectors = {
    cancelLink: 'a[href*="cancel"]',
    backLink: '.govuk-back-link'
  }

  static async clickCancel(page) {
    await page.click(this.selectors.cancelLink)
  }

  static async clickBack(page) {
    await page.click(this.selectors.backLink)
  }
}

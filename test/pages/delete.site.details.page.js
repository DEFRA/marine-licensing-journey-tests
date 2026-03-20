export default class DeleteSiteDetailsPage {
  constructor(page) {
    this.page = page
    this.confirmButton = page.locator(
      'xpath=//button[normalize-space(text())="Yes, delete all site details"]'
    )
    this.cancelLink = page.locator(
      'xpath=//a[normalize-space(text())="Cancel"]'
    )
  }

  async confirmDeletion() {
    await this.confirmButton.click()
  }

  async cancelDeletion() {
    await this.cancelLink.click()
  }
}

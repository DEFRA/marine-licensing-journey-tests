export default class DeleteProjectPage {
  constructor(page) {
    this.page = page
    this.deleteButton = page.locator(
      'xpath=//button[normalize-space(text())="Yes, delete project"]'
    )
    this.cancelLink = page.locator(
      'xpath=//a[normalize-space(text())="Cancel"]'
    )
  }

  async confirmDeletion() {
    await this.deleteButton.click()
    await this.page.waitForLoadState('load')
  }
}

export default class CookieBannerPage {
  constructor(page) {
    this.page = page
    this.acceptButton = page.locator('button[name="analytics"][value="yes"]')
    this.rejectButton = page.locator('button[name="analytics"][value="no"]')
    this.viewCookiesLink = page.locator('a[href="/help/cookies"]')
  }

  async accept() {
    try {
      await this.acceptButton.click({ timeout: 3000 })
    } catch {
      // Banner not visible — already handled
    }
  }

  async reject() {
    try {
      await this.rejectButton.click({ timeout: 3000 })
    } catch {
      // Banner not visible — already handled
    }
  }

  async isVisible() {
    return await this.acceptButton.isVisible()
  }
}

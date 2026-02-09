export default class FooterPage {
  constructor(page) {
    this.page = page
    this.footer = page.locator('footer')
    this.privacyLink = this.footer.locator('a', { hasText: 'Privacy' })
    this.cookiesLink = this.footer.locator('a', { hasText: 'Cookies' })
  }

  async clickPrivacyLink() {
    await this.privacyLink.click()
  }

  async clickCookiesLink() {
    await this.cookiesLink.click()
  }
}

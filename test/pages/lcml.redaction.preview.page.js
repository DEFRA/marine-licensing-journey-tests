export default class LcmlRedactionPreviewPage {
  constructor(page) {
    this.page = page
    this.heading = page.locator('#redaction-preview-heading')
    this.notice = page.locator('#redaction-preview-notice')
  }

  card(title) {
    return this.page
      .locator('.govuk-summary-card')
      .filter({
        has: this.page.locator('.govuk-summary-card__title', {
          hasText: title
        })
      })
      .first()
  }

  rowValue(cardTitle, rowKey) {
    return this.card(cardTitle)
      .locator('.govuk-summary-list__row')
      .filter({
        has: this.page.locator('.govuk-summary-list__key', { hasText: rowKey })
      })
      .locator('.govuk-summary-list__value')
      .first()
  }

  async cardText(title) {
    return (await this.card(title).innerText()).replace(/\s+/g, ' ').trim()
  }

  async serviceLinks() {
    return this.page.locator('main a[href]').evaluateAll((links) =>
      links
        .map((link) => new URL(link.getAttribute('href'), window.location.href))
        .filter(
          (url) =>
            url.origin === window.location.origin &&
            url.pathname !== window.location.pathname
        )
        .map((url) => url.pathname)
    )
  }
}

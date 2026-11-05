export default class ConsultationsPage {
  constructor(page) {
    this.page = page
  }

  static PATH = /\/consultations$/

  get heading() {
    return this.page.locator('main h1')
  }

  get table() {
    return this.page.locator('main table')
  }

  get columnHeaders() {
    return this.table.locator('thead th')
  }

  get rows() {
    return this.table.locator('tbody tr')
  }

  get headerLinks() {
    return this.page.locator('.govuk-service-navigation__item a')
  }

  get currentHeaderLink() {
    return this.page.locator(
      '.govuk-service-navigation__item--active a, .govuk-service-navigation__item a[aria-current="page"]'
    )
  }

  get phaseBanner() {
    return this.page.locator('.govuk-phase-banner')
  }

  organisationName(name) {
    return this.page.locator('.app-border-bottom span', { hasText: name })
  }

  async rowCells() {
    return this.rows.evaluateAll((rows) =>
      rows.map((row) =>
        [...row.querySelectorAll('th, td')].map((cell) =>
          cell.textContent.trim().replace(/\s+/g, ' ')
        )
      )
    )
  }

  async headerSortControls() {
    return this.table
      .locator('thead [aria-sort], thead button, thead a')
      .count()
  }
}

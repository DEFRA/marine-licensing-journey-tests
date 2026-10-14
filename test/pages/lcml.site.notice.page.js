import path from 'path'

export default class LcmlSiteNoticePage {
  constructor(page) {
    this.page = page
  }

  static DISPLAY_PATH = /\/marine-licence\/site-notice\/display\//
  static EVIDENCE_ITEMS = {
    locationName: 'Location name',
    dateDisplayed: 'Date you displayed the notice',
    closeUpPhoto: 'Close-up photo of notice',
    positionPhoto: 'Photo evidencing notice position and location'
  }

  evidenceCard() {
    return this.page.locator('.govuk-summary-card', {
      hasText: 'Location 1 evidence'
    })
  }

  evidenceRow(item) {
    return this.evidenceCard().locator(
      `.govuk-summary-list__row:has(dt:text-is("${item}"))`
    )
  }

  evidenceValue(item) {
    return this.evidenceRow(item).locator('.govuk-summary-list__value')
  }

  evidenceLink(item) {
    return this.evidenceRow(item).locator('.govuk-summary-list__actions a')
  }

  sendEvidenceButton() {
    return this.page.getByRole('button', { name: 'Send evidence' })
  }

  submissionNote() {
    return this.page.locator('main .govuk-inset-text', {
      hasText: 'Evidence was submitted'
    })
  }

  errorSummary() {
    return this.page.locator('.govuk-error-summary')
  }

  async openEvidenceItem(item) {
    await this.evidenceLink(item).click()
    await this.page.waitForLoadState('load')
  }

  async waitForDisplayPage() {
    await this.page.waitForURL(LcmlSiteNoticePage.DISPLAY_PATH, {
      timeout: 90_000
    })
    await this.page.waitForLoadState('load')
  }

  async saveLocationName(name) {
    await this.page.locator('#locationName').fill(name)
    await this.#saveAndContinue()
  }

  async saveDateDisplayed({ day, month, year }) {
    await this.page.locator('#date-displayed-day').fill(day)
    await this.page.locator('#date-displayed-month').fill(month)
    await this.page.locator('#date-displayed-year').fill(year)
    await this.#saveAndContinue()
  }

  async uploadPhoto(relativeFilePath) {
    await this.page
      .locator('input[type="file"]')
      .setInputFiles(path.resolve(process.cwd(), relativeFilePath))
    await this.page.getByRole('button', { name: 'Continue' }).click()
    await this.page.waitForURL(
      (url) => !/upload-and-wait|upload-and-scan/.test(url.toString()),
      { timeout: 90_000 }
    )
    await this.page.waitForLoadState('load')
  }

  async #saveAndContinue() {
    await this.page.getByRole('button', { name: 'Save and continue' }).click()
    await this.page.waitForLoadState('load')
  }
}

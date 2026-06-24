import path from 'path'
import { expect } from '@playwright/test'

/**
 * Page object for the Water Framework Directive (WFD) journey:
 * "Before you start" -> "One nautical mile" -> "Excluded activities" ->
 * ("WFD upload" -> spinner) -> "Review WFD answers".
 *
 * Also exposes helpers for the WFD summary card shown on the
 * Check your answers and View details pages (ML-1345).
 */
export default class WaterFrameworkDirectivePage {
  constructor(page) {
    this.page = page
  }

  // --- Routes / headings ---

  static REVIEW_PATH =
    '/marine-licence/water-framework-directive-review-your-answers'
  static NAUTICAL_MILE_PATH =
    '/marine-licence/water-framework-directive-nautical-mile'
  static UPLOAD_PATH = '/marine-licence/water-framework-directive-file-upload'
  static CARD_TITLE = 'Water Framework Directive assessment'

  static ROW = {
    nauticalMile:
      'Project located within one nautical mile (1.85km) of the coast',
    excludedActivities: 'Project limited to one of the excluded activities',
    upload: 'Water Framework Directive assessment upload'
  }

  // --- Navigation actions ---

  async openTaskFromList() {
    await this.page
      .locator('a:has-text("Water Framework Directive assessment")')
      .click()
    await this.page.waitForLoadState('load')
  }

  async continueFromBeforeYouStart() {
    if (/water-framework-directive-before-you-start/.test(this.page.url())) {
      await this.page.locator('a.govuk-button:has-text("Continue")').click()
      await this.page.waitForLoadState('load')
    }
  }

  async answerNauticalMile(answer) {
    await this.page
      .locator(answer === 'Yes' ? '#nauticalMile' : '#nauticalMile-2')
      .click()
    await this.#submit()
  }

  async answerExcludedActivities(answer) {
    await this.page
      .locator(
        answer === 'Yes' ? '#excludedActivities' : '#excludedActivities-2'
      )
      .click()
    await this.#submit()
  }

  /** Upload a WFD assessment file and wait for the spinner to redirect away. */
  async uploadAssessment(relativeFilePath) {
    const absolutePath = path.resolve(process.cwd(), relativeFilePath)
    await this.page.locator('input[type="file"]').setInputFiles(absolutePath)
    await this.#submit()
    // Spinner ("Checking your file...") meta-refreshes then redirects.
    await this.page.waitForURL(
      (url) => !/upload-and-wait/.test(url.toString()),
      {
        timeout: 60_000
      }
    )
    await this.page.waitForLoadState('load')
  }

  async #submit() {
    await this.page
      .locator('main button[type="submit"]:not([name="analytics"])')
      .click()
    await this.page.waitForLoadState('load')
  }

  // --- Review WFD answers page ---

  async expectOnReviewPage() {
    await expect(this.page).toHaveURL(
      new RegExp(WaterFrameworkDirectivePage.REVIEW_PATH),
      { timeout: 30_000 }
    )
    await expect(this.page.locator('h1').first()).toContainText(
      'Check your answers for Water Framework Directive',
      { timeout: 30_000 }
    )
  }

  reviewRow(key) {
    return this.page.locator(
      `.govuk-summary-list__row:has(dt:text-is("${key}"))`
    )
  }

  reviewRowValue(key) {
    return this.reviewRow(key).locator('.govuk-summary-list__value')
  }

  // --- WFD summary card (Check your answers / View details) ---

  card() {
    return this.page.locator(
      `.govuk-summary-card:has(.govuk-summary-card__title:text-is("${WaterFrameworkDirectivePage.CARD_TITLE}"))`
    )
  }

  cardRow(key) {
    return this.card().locator(
      `.govuk-summary-list__row:has(dt:text-is("${key}"))`
    )
  }

  cardRowValue(key) {
    return this.cardRow(key).locator('.govuk-summary-list__value')
  }

  cardChangeLink() {
    return this.card().locator('.govuk-summary-card__actions a')
  }
}

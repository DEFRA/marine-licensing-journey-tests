import { expect } from '@playwright/test'

export default class LcmlRedactionPage {
  constructor(page) {
    this.page = page
    this.heading = page.locator('h1')
  }

  row(fieldLabel) {
    return this.page
      .locator('.govuk-summary-list__row')
      .filter({ hasText: fieldLabel })
      .first()
  }

  redactLink(fieldLabel) {
    return this.row(fieldLabel).getByRole('link', { name: /^Redact / })
  }

  changeLink(fieldLabel) {
    return this.row(fieldLabel).getByRole('link', { name: /^Change redaction/ })
  }

  removeButton(fieldLabel) {
    return this.row(fieldLabel).getByRole('button', {
      name: /^Remove redaction/
    })
  }

  input(fieldLabel) {
    return this.row(fieldLabel).locator('input[id^="redaction-input-"]')
  }

  saveButton(fieldLabel) {
    return this.row(fieldLabel).getByRole('button', { name: 'Save' })
  }

  copyButton(fieldLabel) {
    return this.row(fieldLabel).getByRole('button', {
      name: 'Copy ***REDACTED***'
    })
  }

  redactedLabel(fieldLabel) {
    return this.row(fieldLabel).locator('.app-redaction-label')
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

  // Withhold, replace and remove are rendered as a button in one state and a
  // link in the other, so both roles are accepted.
  control(name) {
    return this.page
      .getByRole('button', { name })
      .or(this.page.getByRole('link', { name }))
      .first()
  }

  withholdDrawing(siteNumber = 1) {
    return this.control(
      `Withhold document for site ${siteNumber} construction drawing 1`
    )
  }

  removeDrawingRedaction() {
    return this.card('Construction drawing')
      .getByRole('button', { name: /Remove redaction/ })
      .or(
        this.card('Construction drawing').getByRole('link', {
          name: /Remove redaction/
        })
      )
      .first()
  }

  replaceDrawing() {
    return this.control('Replace document')
  }

  async revealDrawing() {
    const remove = this.removeDrawingRedaction()
    if (await remove.isVisible().catch(() => false)) {
      await remove.click()
      await this.page.waitForLoadState('load').catch(() => {})
      await expect(this.withholdDrawing()).toBeVisible({ timeout: 30_000 })
    }
  }

  async cardText(title) {
    return (await this.card(title).innerText()).replace(/\s+/g, ' ').trim()
  }

  async drawingFileName() {
    return (await this.cardText('Construction drawing')).match(
      /[\w-]+\.pdf/
    )?.[0]
  }

  async openEditor(fieldLabel) {
    await this.redactLink(fieldLabel).click()
    await expect(this.input(fieldLabel)).toBeVisible({ timeout: 30_000 })
  }

  async saveRedaction(fieldLabel, text) {
    await this.input(fieldLabel).fill(text)
    await this.saveButton(fieldLabel).click()
    await this.page.waitForLoadState('load').catch(() => {})
    await expect(this.changeLink(fieldLabel)).toBeVisible({ timeout: 30_000 })
  }
}

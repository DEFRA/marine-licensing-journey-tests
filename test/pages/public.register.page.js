import { expect } from '@playwright/test'

export default class PublicRegisterPage {
  constructor(page) {
    this.page = page
    this.consentYes = page.locator('#consent')
    this.consentNo = page.locator('#consent-2')
    this.reasonTextarea = page.locator('#reason')
    this.saveAndContinue = page.locator(
      'button[type="submit"]:not([name="analytics"])'
    )
    this.consentError = page.locator('#consent-error')
    this.reasonError = page.locator('#reason-error')
    this.projectNameCaption = page.locator('span.govuk-caption-l')
    this.exploreMarinaPlansLink = page.locator(
      'a[href*="explore-marine-plans"]'
    )
  }

  async selectConsent(consent) {
    if (consent) {
      await this.consentYes.click()
    } else {
      await this.consentNo.click()
    }
  }

  async fillReason(reason) {
    await this.reasonTextarea.fill(reason)
  }

  async clickSaveAndContinue() {
    await this.saveAndContinue.click()
  }

  async completeAndSave(consent, reason) {
    await this.selectConsent(consent)
    if (reason) {
      await this.fillReason(reason)
    }
    await this.clickSaveAndContinue()
  }

  async expectConsentSelected(consent) {
    if (consent) {
      await expect(this.consentYes).toBeChecked({ timeout: 30_000 })
    } else {
      await expect(this.consentNo).toBeChecked({ timeout: 30_000 })
    }
  }

  async expectNoConsentSelected() {
    await expect(this.consentYes).not.toBeChecked({ timeout: 30_000 })
    await expect(this.consentNo).not.toBeChecked({ timeout: 30_000 })
  }

  async expectReasonValue(reason) {
    await expect(this.reasonTextarea).toHaveValue(reason, { timeout: 30_000 })
  }

  async expectReasonNotVisible() {
    await expect(this.reasonTextarea).not.toBeVisible({ timeout: 30_000 })
  }

  async expectConsentError(message) {
    await expect(this.consentError).toContainText(message, { timeout: 30_000 })
  }

  async expectReasonError(message) {
    await expect(this.reasonError).toContainText(message, { timeout: 30_000 })
  }

  async expectProjectName(name) {
    await expect(this.projectNameCaption).toContainText(name, {
      timeout: 30_000
    })
  }
}

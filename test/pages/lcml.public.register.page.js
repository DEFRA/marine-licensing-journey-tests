import { expect } from '@playwright/test'

export default class LcmlPublicRegisterPage {
  constructor(page) {
    this.page = page
    this.withholdNo = page.locator('#withholdConsent')
    this.withholdYes = page.locator('#withholdConsent-2')
    this.reasonTextarea = page.locator('#reason')
    this.saveAndContinue = page.locator(
      'button[type="submit"]:not([name="analytics"])'
    )
    this.withholdError = page.locator('#withholdConsent-error')
    this.reasonError = page.locator('#reason-error')
    this.projectNameCaption = page.locator('span.govuk-caption-l')
  }

  async selectWithhold(withhold) {
    if (withhold) {
      await this.withholdYes.click()
    } else {
      await this.withholdNo.click()
    }
  }

  async completeAndSave(withhold, reason) {
    await this.selectWithhold(withhold)
    if (withhold && reason) {
      await this.reasonTextarea.fill(reason)
    }
    await this.saveAndContinue.click()
  }

  async expectWithholdSelected(withhold) {
    const radio = withhold ? this.withholdYes : this.withholdNo
    await expect(radio).toBeChecked({ timeout: 30_000 })
  }

  async expectReasonNotVisible() {
    await expect(this.reasonTextarea).not.toBeVisible({ timeout: 30_000 })
  }
}

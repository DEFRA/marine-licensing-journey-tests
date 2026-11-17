import { expect } from '@playwright/test'

export const PUBLIC_REGISTER_TASK =
  'Information published on the public register'

export const NATIONAL_SECURITY_PATH =
  '/marine-licence/withholding-information-national-security'

export const WITHHOLD_REASONS = {
  'National security reasons': 'nationalSecurity',
  'Commercial or industrial confidentiality reasons':
    'commercialConfidentiality'
}

export default class LcmlPublicRegisterPage {
  constructor(page) {
    this.page = page
    this.withholdYes = page.locator(
      'input[name="withholdConsent"][value="yes"]'
    )
    this.withholdNo = page.locator('input[name="withholdConsent"][value="no"]')
    this.withholdReasonRadios = page.locator('input[name="withholdReason"]')
    this.saveAndContinue = page.locator(
      'button[type="submit"]:not([name="analytics"])'
    )
    this.withholdError = page.locator('#withholdConsent-error')
    this.withholdReasonError = page.locator('#withholdReason-error')
    this.projectNameCaption = page.locator('span.govuk-caption-l')
  }

  nationalSecurityApproval(answer) {
    return this.page.locator(
      `input[name="nationalSecurityApproval"][value="${answer.toLowerCase()}"]`
    )
  }

  isOnNationalSecurityPage() {
    return new URL(this.page.url()).pathname === NATIONAL_SECURITY_PATH
  }

  async saveNationalSecurityApproval(answer) {
    await this.nationalSecurityApproval(answer).check()
    await this.saveAndContinue.click()
    await this.page.waitForLoadState('load')
  }

  withholdReason(label) {
    return this.page.locator(
      `input[name="withholdReason"][value="${WITHHOLD_REASONS[label]}"]`
    )
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
      await this.withholdReason(reason).check()
    }
    await this.saveAndContinue.click()
  }

  async expectWithholdSelected(withhold) {
    const radio = withhold ? this.withholdYes : this.withholdNo
    await expect(radio).toBeChecked({ timeout: 30_000 })
  }

  async expectReasonsNotVisible() {
    await expect(this.withholdReasonRadios.first()).not.toBeVisible({
      timeout: 30_000
    })
  }
}

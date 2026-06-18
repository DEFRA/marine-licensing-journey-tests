import { expect } from '@playwright/test'

// "Are you notifying us as an employee of X?" page. The individual-account
// variant renders #confirmIndividual* radios; the organisation-employee variant
// renders #confirmEmployee* radios — handle both with combined selectors.
export default class ConfirmEmployeePage {
  constructor(page) {
    this.page = page
    this.organisationRadio = page.locator(
      '#confirmIndividual-2, #confirmEmployee-2'
    )
    this.personalRadio = page.locator('#confirmIndividual, #confirmEmployee-3')
  }

  async selectOrganisation() {
    await this.organisationRadio.click()
  }

  async selectPersonal() {
    await this.personalRadio.click()
  }

  async expectSubheading(subheadingText) {
    await expect(
      this.page.locator('h2, .govuk-heading-m').first()
    ).toContainText(subheadingText, { timeout: 30_000 })
  }
}

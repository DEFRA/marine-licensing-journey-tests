// Reuses locators from test-infrastructure/pages/activity.description.page.js
export class ActivityDescriptionPage {
  static selectors = {
    activityDescriptionInput: '#activityDescription',
    saveAndContinue: 'button[type="submit"]'
  }

  static async enterDescription(page, description) {
    await page.fill(this.selectors.activityDescriptionInput, description)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

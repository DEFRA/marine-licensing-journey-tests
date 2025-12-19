// Reuses locators from test-infrastructure/pages/project.name.page.js
export class ProjectNamePage {
  static selectors = {
    projectNameInput: '#projectName',
    saveAndContinue: 'button[type="submit"]'
  }

  static async navigateTo(page, baseUrl) {
    await page.goto(baseUrl || '/')
  }

  static async enterProjectName(page, projectName) {
    await page.fill(this.selectors.projectNameInput, projectName)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

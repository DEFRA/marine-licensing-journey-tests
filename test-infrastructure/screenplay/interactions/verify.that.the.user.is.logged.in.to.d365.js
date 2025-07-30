import Task from '../base/task.js'

export default class VerifyThatTheUserIsLoggedInToD365 extends Task {
  static now() {
    return new VerifyThatTheUserIsLoggedInToD365()
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')
    const page = browseD365.page

    // Simple check: verify we're on the D365 domain and not a login page
    const currentUrl = page.url()
    if (!currentUrl.includes('crm11.dynamics.com')) {
      throw new Error(`Not on D365 page. Current URL: ${currentUrl}`)
    }

    // Verify we can see D365 interface (any Microsoft component)
    const hasD365Interface = await page
      .locator('[class*="ms-"]')
      .first()
      .isVisible({ timeout: 10000 })
    if (!hasD365Interface) {
      throw new Error('D365 interface not visible - login may have failed')
    }

    await browseD365.takeScreenshot('D365 login verified')
  }
}

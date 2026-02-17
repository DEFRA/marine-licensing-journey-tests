import Task from '../base/task.js'

export default class VerifyThatTheUserIsLoggedInToD365 extends Task {
  static now() {
    return new VerifyThatTheUserIsLoggedInToD365()
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')
    const page = browseD365.page

    // D365 may show multiple "Please sign in again" modal dialogs in succession.
    // The button has data-id="okButton" with a dynamic numeric suffix.
    // Keep clicking "Sign In" until the dialogs stop appearing.
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const signInBtn = page.locator('button[data-id="okButton"]')
        await signInBtn.waitFor({ state: 'visible', timeout: 15000 })
        await signInBtn.click()
        await page.waitForTimeout(2000)
      } catch {
        // No more sign-in prompts
        break
      }
    }

    // Verify we're on the D365 domain
    const currentUrl = page.url()
    if (!currentUrl.includes('crm11.dynamics.com')) {
      throw new Error(`Not on D365 page. Current URL: ${currentUrl}`)
    }

    // Wait for D365 SPA to render the "Cases" section
    await page
      .locator('span:has-text("Cases")')
      .first()
      .waitFor({ state: 'visible', timeout: 60000 })

    await browseD365.takeScreenshot('D365 login verified - Cases visible')
  }
}

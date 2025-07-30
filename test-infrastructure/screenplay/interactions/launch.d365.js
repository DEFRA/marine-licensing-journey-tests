import { attachJson } from '~/test-infrastructure/capture/index.js'
import Task from '../base/task.js'

export default class LaunchD365 extends Task {
  static now() {
    return new LaunchD365()
  }

  async performAs(actor) {
    const browseD365 = actor.abilityTo('BrowseD365')
    if (!browseD365) {
      throw new Error('Actor must have BrowseD365 ability to launch D365')
    }

    await browseD365.navigateToUrl(process.env.D365_URL)
    const page = await browseD365.launch()
    await browseD365.takeScreenshot('D365 after launch')

    await this.checkForErrorDialog(page, browseD365)
    await this.handleSignIn(browseD365, page)
    await browseD365.takeScreenshot('D365 after checking for sign in button')
  }

  async checkForErrorDialog(page, browseD365) {
    const errorExists = await page
      .locator('text=An error has occurred')
      .isVisible({ timeout: 5000 })
      .catch(() => false)

    if (!errorExists) {
      return
    }

    await browseD365.takeScreenshot('D365-error-dialog')
    await this.captureErrorDetails(page, browseD365)
    throw new Error(
      'D365 is showing an error dialog. Check screenshots and network logs for details.'
    )
  }

  async captureErrorDetails(page, browseD365) {
    const showDetailsButton = page.locator('text=Show Technical Details')
    const detailsVisible = await showDetailsButton
      .isVisible()
      .catch(() => false)

    if (!detailsVisible) {
      return
    }

    await showDetailsButton.click()
    await browseD365.takeScreenshot('D365-technical-details')

    const errorDetails = await page
      .textContent('body')
      .catch(() => 'Could not capture error details')

    attachJson(
      {
        errorDetails,
        url: page.url(),
        timestamp: new Date().toISOString()
      },
      'D365-Error-Details'
    )
  }

  async handleSignIn(browseD365, page) {
    try {
      await browseD365.clickByRole('button', 'Sign In', 15000)
      page.on('popup', async (popup) => {
        await popup.close()
      })
    } catch (error) {
      // Sign In button not found - likely already authenticated
    }
  }
}

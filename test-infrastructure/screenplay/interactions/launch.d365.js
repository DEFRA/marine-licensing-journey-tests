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

    try {
      await browseD365.clickByRole('button', 'Sign In', 15000)
      page.on('popup', async (popup) => {
        await popup.close()
      })
    } catch (error) {
      // Sign In button not found - likely already authenticated
    }

    await browseD365.takeScreenshot('D365 after checking for sign in button')
  }
}

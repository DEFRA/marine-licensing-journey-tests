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
    await browseD365.clickByRole('button', 'Sign In')
    page.on('popup', async (popup) => {
      await popup.close()
    })
  }
}

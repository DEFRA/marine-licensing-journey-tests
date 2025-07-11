import Task from '../base/task.js'

export default class SignOut extends Task {
  static now() {
    return new SignOut()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click('a[href="/sign-out"]')

    await browseTheWeb.browser.waitUntil(
      async () => {
        const url = await browseTheWeb.browser.getUrl()
        return url.includes('/login') || url.includes('cdp-defra-id-stub')
      },
      { timeout: 10000 }
    )

    delete actor.memory.isAuthenticated
  }
}

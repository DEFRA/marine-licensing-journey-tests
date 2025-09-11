import { PublicRegisterPage } from '~/test-infrastructure/pages'
import Task from '../base/task.js'

export default class ClickPublicRegisterLink extends Task {
  static now() {
    return new ClickPublicRegisterLink()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const originalWindowHandle = await browseTheWeb.browser.getWindowHandle()
    actor.remembers('originalWindowHandle', originalWindowHandle)
    await browseTheWeb.click(PublicRegisterPage.publicRegisterLink)
    await browseTheWeb.browser.waitUntil(
      async () => {
        const windowHandles = await browseTheWeb.browser.getWindowHandles()
        return windowHandles.length > 1
      },
      {
        timeout: 5000,
        timeoutMsg: 'New tab did not open within 5 seconds'
      }
    )
  }
}

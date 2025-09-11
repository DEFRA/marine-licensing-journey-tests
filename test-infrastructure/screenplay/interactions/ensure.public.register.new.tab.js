import { expect } from '@wdio/globals'
import Task from '../base/task.js'

export default class EnsurePublicRegisterNewTab extends Task {
  static isOpened() {
    return new EnsurePublicRegisterNewTab()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const originalWindowHandle = actor.recalls('originalWindowHandle')

    const windowHandles = await browseTheWeb.browser.getWindowHandles()

    await expect(windowHandles.length).toBe(2)

    const newWindowHandle = windowHandles.find(
      (handle) => handle !== originalWindowHandle
    )

    await browseTheWeb.browser.switchToWindow(newWindowHandle)

    const currentUrl = await browseTheWeb.browser.getUrl()
    await expect(currentUrl).toContain(
      'marinelicensing.marinemanagement.org.uk'
    )
    await expect(currentUrl).toContain('MMO_PUBLIC_REGISTER')

    await browseTheWeb.browser.switchToWindow(originalWindowHandle)
  }
}

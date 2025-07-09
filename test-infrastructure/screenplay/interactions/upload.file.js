import path from 'path'
import Task from '../base/task.js'

export default class UploadFile extends Task {
  static withPath(filePath) {
    return new UploadFile(filePath)
  }

  constructor(filePath) {
    super()
    this.filePath = filePath
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const absoluteFilePath = path.resolve(this.filePath)
    const remoteFilePath =
      await browseTheWeb.browser.uploadFile(absoluteFilePath)
    const fileInput = await browseTheWeb.browser.$('input[type="file"]')

    const isHidden =
      (await fileInput.getAttribute('hidden')) === 'true' ||
      (await fileInput.getAttribute('aria-hidden')) === 'true'

    if (isHidden) {
      await browseTheWeb.browser.execute((el) => {
        el.hidden = false
        el.removeAttribute('aria-hidden')
        el.style.position = 'absolute'
        el.style.opacity = '0'
      }, fileInput)
    }

    await fileInput.setValue(remoteFilePath)

    if (isHidden) {
      await browseTheWeb.browser.execute((el) => {
        el.hidden = true
        el.setAttribute('aria-hidden', 'true')
        el.style.position = ''
        el.style.opacity = ''
      }, fileInput)
    }
  }
}

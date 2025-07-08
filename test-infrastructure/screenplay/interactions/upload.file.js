import { expect } from 'chai'
import path from 'path'
import Task from '../base/task.js'

const HIDDEN_ELEMENT_STYLES = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '1px',
  height: '1px',
  opacity: '0',
  zIndex: '9999'
}

const FILE_INPUT_SELECTOR = 'input[type="file"]'

export default class UploadFile extends Task {
  static withPath(filePath) {
    return new UploadFile(filePath)
  }

  constructor(filePath) {
    super()
    this.filePath = filePath
  }

  async performAs(actor) {
    this.validateFilePath()

    const browseTheWeb = actor.ability
    const remoteFilePath = await this.prepareFileForUpload(browseTheWeb)
    const fileInput = await this.getFileInput(browseTheWeb)

    await this.uploadFileToInput(browseTheWeb, fileInput, remoteFilePath)
  }

  validateFilePath() {
    if (!this.filePath) {
      expect.fail('File path must be provided for upload')
    }
  }

  async prepareFileForUpload(browseTheWeb) {
    const absoluteFilePath = path.resolve(this.filePath)
    return await browseTheWeb.browser.uploadFile(absoluteFilePath)
  }

  async getFileInput(browseTheWeb) {
    return await browseTheWeb.browser.$(FILE_INPUT_SELECTOR)
  }

  async uploadFileToInput(browseTheWeb, fileInput, remoteFilePath) {
    if (await this.isElementHidden(fileInput)) {
      await this.uploadToHiddenInput(browseTheWeb, fileInput, remoteFilePath)
    } else {
      await fileInput.setValue(remoteFilePath)
    }
  }

  async isElementHidden(element) {
    const isHidden = await element.getAttribute('hidden')
    const isAriaHidden = await element.getAttribute('aria-hidden')
    return isHidden === 'true' || isAriaHidden === 'true'
  }

  async uploadToHiddenInput(browseTheWeb, fileInput, remoteFilePath) {
    await this.makeElementTemporarilyVisible(browseTheWeb, fileInput)

    try {
      await fileInput.setValue(remoteFilePath)
    } finally {
      await this.restoreElementVisibility(browseTheWeb)
    }
  }

  async makeElementTemporarilyVisible(browseTheWeb, element) {
    await browseTheWeb.browser.execute(
      (el, styles) => {
        const originalState = {
          hidden: el.hidden,
          ariaHidden: el.getAttribute('aria-hidden'),
          tabIndex: el.tabIndex,
          display: el.style.display,
          visibility: el.style.visibility
        }

        el.hidden = false
        el.removeAttribute('aria-hidden')
        el.style.display = 'block'
        el.style.visibility = 'visible'
        el.tabIndex = 0

        Object.assign(el.style, styles)

        window.restoreFileInput = () => {
          el.hidden = originalState.hidden
          if (originalState.ariaHidden) {
            el.setAttribute('aria-hidden', originalState.ariaHidden)
          }
          el.tabIndex = originalState.tabIndex
          el.style.display = originalState.display
          el.style.visibility = originalState.visibility
          el.style.position = ''
          el.style.top = ''
          el.style.left = ''
          el.style.width = ''
          el.style.height = ''
          el.style.opacity = ''
          el.style.zIndex = ''
        }
      },
      element,
      HIDDEN_ELEMENT_STYLES
    )
  }

  async restoreElementVisibility(browseTheWeb) {
    await browseTheWeb.browser.execute(() => {
      if (window.restoreFileInput) {
        window.restoreFileInput()
        delete window.restoreFileInput
      }
    })
  }
}

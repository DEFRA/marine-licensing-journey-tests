import Task from '../base/task.js'

import WhichTypeOfFileDoYouWantToUploadPage from '~/test-infrastructure/pages/which.type.of.file.do.you.want.to.upload.page'

export default class EnsureThatFileTypeSelected extends Task {
  static is(expectedFileType) {
    return new EnsureThatFileTypeSelected(expectedFileType)
  }

  constructor(expectedFileType) {
    super()
    this.expectedFileType = expectedFileType
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const selector = WhichTypeOfFileDoYouWantToUploadPage.getFileTypeSelector(
      this.expectedFileType
    )
    const element = await browseTheWeb.browser.$(selector)
    await expect(element).toBeSelected()
  }
}

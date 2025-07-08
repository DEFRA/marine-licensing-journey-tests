import UploadFilePage from '~/test-infrastructure/pages/upload.file.page.js'

export default class UploadFilePageInteractions {
  static async uploadFileAndContinue(browseTheWeb, filePath) {
    await browseTheWeb.uploadFile(UploadFilePage.fileUploadButton, filePath)
    await browseTheWeb.click(UploadFilePage.continueButton)
  }

  static async uploadFile(browseTheWeb, filePath) {
    await browseTheWeb.uploadFile(UploadFilePage.fileUploadButton, filePath)
  }

  static async clickContinue(browseTheWeb) {
    await browseTheWeb.click(UploadFilePage.continueButton)
  }

  static async clickCancel(browseTheWeb) {
    await browseTheWeb.click(UploadFilePage.cancelLink)
  }
}

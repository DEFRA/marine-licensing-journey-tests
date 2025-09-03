import WhichTypeOfFileDoYouWantToUploadPage from '~/test-infrastructure/pages/which.type.of.file.do.you.want.to.upload.page.js'

export default class WhichTypeOfFileDoYouWantToUploadPageInteractions {
  static async selectFileTypeAndContinue(browseTheWeb, fileType) {
    const selector =
      WhichTypeOfFileDoYouWantToUploadPage.getFileTypeSelector(fileType)
    await browseTheWeb.click(selector)
    await browseTheWeb.click(
      WhichTypeOfFileDoYouWantToUploadPage.saveAndContinue
    )
  }

  static async clickContinue(browseTheWeb) {
    await browseTheWeb.click(
      WhichTypeOfFileDoYouWantToUploadPage.saveAndContinue
    )
  }

  static async clickCancel(browseTheWeb) {
    await browseTheWeb.click(WhichTypeOfFileDoYouWantToUploadPage.cancelLink)
  }

  static async clickBack(browseTheWeb) {
    await browseTheWeb.click(WhichTypeOfFileDoYouWantToUploadPage.backLink)
  }
}

import CommonElementsPage from './common.elements.page.js'

export default class FileUploadPage extends CommonElementsPage {
  static fileUploadError = '#file-id-error'
  static backLink = '.govuk-back-link'
  static cancelLink = 'a[href*="cancel"]'
}

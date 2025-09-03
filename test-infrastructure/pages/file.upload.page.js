import CommonElementsPage from './common.elements.page.js'

export default class FileUploadPage extends CommonElementsPage {
  static fileInput = '#file-id'
  static fileUploadError = '#file-id-error'
  static spinner = '.app-loading-spinner'
  static backLink = '.govuk-back-link'
  static cancelLink = 'a[href*="cancel"]'
}

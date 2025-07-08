export default class UploadFilePage {
  static continueButton = 'button*=Continue'
  static cancelLink = 'a[href*="cancel=site-details"]'
  static fileUploadButton = 'input[type="file"]'
  static fileUploadComponent = 'button*=Choose file'
  static noFileChosenText = '*=No file chosen'
  static fileUploadError = '#file-error'
}

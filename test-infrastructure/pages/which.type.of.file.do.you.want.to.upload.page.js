import CommonElementsPage from './common.elements.page.js'

export default class WhichTypeOfFileDoYouWantToUploadPage extends CommonElementsPage {
  static shapefile = '#fileUploadType'
  static kml = '#fileUploadType-2'
  static saveAndContinue = 'button[type="submit"]'
  static cancelLink = 'a[href*="cancel"]'
  static backLink = '.govuk-back-link'
  static fileUploadTypeError = '#fileUploadType-error'
  static helpContent = 'details[data-module="govuk-details"]'
  static pageCaption = '.govuk-caption-l'

  static getFileTypeSelector(fileType) {
    if (fileType === 'Shapefile') return this.shapefile
    if (fileType === 'KML') return this.kml
    return fileType
  }
}

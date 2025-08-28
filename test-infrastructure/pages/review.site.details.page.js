import CommonElementsPage from './common.elements.page'

export default class ReviewSiteDetailsPage extends CommonElementsPage {
  static methodOfProvidingSiteLocationValue =
    '//dt[contains(text(), "Method of providing site location")]/following-sibling::dd'
  static coordinateSystemValue =
    '//dt[contains(text(), "Coordinate system")]/following-sibling::dd'
  static coordinatesAtCentreOfSiteValue =
    '//dt[contains(text(), "Coordinates at centre of site")]/following-sibling::dd'
  static widthValue = '//dt[contains(text(), "Width")]/following-sibling::dd'
  static fileTypeValue =
    '//dt[contains(text(), "File type")]/following-sibling::dd'
  static fileUploadedValue =
    '//dt[contains(text(), "File uploaded")]/following-sibling::dd'
  static siteDetailsDataScript = '#site-details-data'
  static startAndEndPointsValue =
    '//dt[contains(text(), "Start and end points")]/following-sibling::dd'

  static getPolygonPointValue(pointNumber) {
    return `//dt[contains(text(), "Point ${pointNumber}")]/following-sibling::dd`
  }

  static saveAndContinueButton = 'button*=Save and continue'
  static cancelLink = 'a*=Cancel'
  static backLink = 'a.govuk-back-link'
}

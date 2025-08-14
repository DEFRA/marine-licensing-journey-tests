import CommonElementsPage from './common.elements.page'

export default class ReviewSiteDetailsPage extends CommonElementsPage {
  static summaryList = 'dl.govuk-summary-list'
  static methodOfProvidingSiteLocationKey =
    'dt.govuk-summary-list__key*=Method of providing site location'
  static methodOfProvidingSiteLocationValue =
    '//dt[contains(text(), "Method of providing site location")]/following-sibling::dd'
  static coordinateSystemKey = 'dt.govuk-summary-list__key*=Coordinate system'
  static coordinateSystemValue =
    '//dt[contains(text(), "Coordinate system")]/following-sibling::dd'
  static coordinatesAtCentreOfSiteKey =
    'dt.govuk-summary-list__key*=Coordinates at centre of site'
  static coordinatesAtCentreOfSiteValue =
    '//dt[contains(text(), "Coordinates at centre of site")]/following-sibling::dd'
  static coordinatesKey = 'dt.govuk-summary-list__key*=Coordinates'
  static coordinatesValue =
    '//dt[contains(text(), "Coordinates")]/following-sibling::dd'
  static widthOfCircularSiteKey =
    'dt.govuk-summary-list__key*=Width of circular site'
  static widthOfCircularSiteValue =
    '//dt[contains(text(), "Width of circular site")]/following-sibling::dd'
  static widthKey = 'dt.govuk-summary-list__key*=Width'
  static widthValue = '//dt[contains(text(), "Width")]/following-sibling::dd'
  static fileTypeKey = 'dt.govuk-summary-list__key*=File type'
  static fileTypeValue =
    '//dt[contains(text(), "File type")]/following-sibling::dd'
  static fileUploadedKey = 'dt.govuk-summary-list__key*=File uploaded'
  static fileUploadedValue =
    '//dt[contains(text(), "File uploaded")]/following-sibling::dd'
  static extractedCoordinatesValue =
    '//dt[contains(text(), "Extracted")]/following-sibling::dd'
  static siteDetailsDataScript = '#site-details-data'
  static startAndEndPointsValue =
    '//dt[contains(text(), "Start and end points")]/following-sibling::dd'
  static point2Value = '//dt[contains(text(), "Point 2")]/following-sibling::dd'
  static point3Value = '//dt[contains(text(), "Point 3")]/following-sibling::dd'

  static getPolygonPointValue(pointNumber) {
    return `//dt[contains(text(), "Point ${pointNumber}")]/following-sibling::dd`
  }

  static saveAndContinueButton = 'button*=Save and continue'
  static cancelLink = 'a*=Cancel'
  static backLink = 'a.govuk-back-link'
}

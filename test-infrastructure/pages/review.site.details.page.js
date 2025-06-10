import CommonElementsPage from './common.elements.page'

export default class ReviewSiteDetailsPage extends CommonElementsPage {
  static summaryList = 'dl.govuk-summary-list'

  static methodOfProvidingSiteLocationKey =
    'dt.govuk-summary-list__key*=Method of providing site location'

  static methodOfProvidingSiteLocationValue =
    'dt.govuk-summary-list__key*=Method of providing site location + dd.govuk-summary-list__value'

  static coordinateSystemKey = 'dt.govuk-summary-list__key*=Coordinate system'

  static coordinateSystemValue =
    'dt.govuk-summary-list__key*=Coordinate system + dd.govuk-summary-list__value'

  static coordinatesAtCentreOfSiteKey =
    'dt.govuk-summary-list__key*=Coordinates at centre of site'

  static coordinatesAtCentreOfSiteValue =
    'dt.govuk-summary-list__key*=Coordinates at centre of site + dd.govuk-summary-list__value'

  static widthOfCircularSiteKey =
    'dt.govuk-summary-list__key*=Width of circular site'

  static widthOfCircularSiteValue =
    'dt.govuk-summary-list__key*=Width of circular site + dd.govuk-summary-list__value'

  static saveAndContinueButton = 'button*=Save and continue'

  static cancelLink = 'a*=Cancel'

  static backLink = 'a.govuk-back-link'
}

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

  static getSiteDetailsCardTitle(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]`
  }

  static getSiteCoordinateMethodValue(siteNumber) {
    return `(//dt[contains(normalize-space(text()), "Single or multiple sets of coordinates")]/following-sibling::dd)[${siteNumber}]`
  }

  static getSiteCoordinateSystemValue(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/following-sibling::*//dt[contains(normalize-space(text()), "Coordinate system")]/following-sibling::dd`
  }

  static providingTheSiteLocationCard =
    '//h2[contains(text(), "Providing the site location")]'
  static moreThanOneSiteValue =
    '//dt[contains(text(), "More than one site")]/following-sibling::dd'

  // Activity details card selectors
  static activityDetailsCard = '//h2[contains(text(), "Activity details")]'
  static activityDatesValue =
    '//dt[contains(text(), "Activity dates")]/following-sibling::dd'
  static activityDescriptionValue =
    '//dt[contains(text(), "Activity description")]/following-sibling::dd'

  // Site-specific selectors for individual site cards
  static getSiteName(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Site name")]/following-sibling::dd`
  }

  static getSiteActivityDates(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity dates")]/following-sibling::dd`
  }

  static getSiteActivityDescription(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity description")]/following-sibling::dd`
  }

  static saveAndContinueButton = 'button*=Save and continue'
  static cancelLink = 'a*=Cancel'
  static backLink = 'a.govuk-back-link'
}

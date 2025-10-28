import CommonElementsPage from './common.elements.page'

export default class ReviewSiteDetailsPage extends CommonElementsPage {
  static methodOfProvidingSiteLocationValue =
    '//dt[contains(text(), "Method of providing site location")]/following-sibling::dd[1]'
  static coordinateSystemValue =
    '//dt[contains(text(), "Coordinate system")]/following-sibling::dd[1]'
  static coordinatesAtCentreOfSiteValue =
    '//dt[contains(text(), "Coordinates at centre of site")]/following-sibling::dd[1]'
  static widthValue = '//dt[contains(text(), "Width")]/following-sibling::dd[1]'
  static fileTypeValue =
    '//dt[contains(text(), "File type")]/following-sibling::dd[1]'
  static fileUploadedValue =
    '//dt[contains(text(), "File uploaded")]/following-sibling::dd[1]'
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
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Single or multiple sets of coordinates")]/following-sibling::dd[1]`
  }

  static getSiteCoordinateSystemValue(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Coordinate system")]/following-sibling::dd[1]`
  }

  static providingTheSiteLocationCard =
    '//h2[contains(text(), "Providing the site location")]'
  static moreThanOneSiteValue =
    '//dt[contains(text(), "More than one site")]/following-sibling::dd'

  static activityDetailsCard = '//h2[contains(text(), "Activity details")]'
  static activityDatesValue =
    '//dt[contains(text(), "Activity dates")]/following-sibling::dd'
  static activityDescriptionValue =
    '//dt[contains(text(), "Activity description")]/following-sibling::dd'

  static getSiteName(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Site name")]/following-sibling::dd[1]`
  }

  static getSiteActivityDates(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity dates")]/following-sibling::dd[1]`
  }

  static getSiteActivityDescription(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity description")]/following-sibling::dd[1]`
  }

  static getSiteNameAddLink(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Site name")]/following-sibling::dd/following-sibling::dd//a[text()="Add"]`
  }

  static getSiteActivityDatesAddLink(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity dates")]/following-sibling::dd/following-sibling::dd//a[text()="Add"]`
  }

  static getSiteActivityDescriptionAddLink(siteNumber) {
    return `//h2[contains(text(), "Site ${siteNumber} details")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[contains(normalize-space(text()), "Activity description")]/following-sibling::dd/following-sibling::dd//a[text()="Add"]`
  }

  static saveAndContinueButton = 'button*=Save and continue'
  static cancelLink = 'a*=Cancel'
  static backLink = 'a.govuk-back-link'
}

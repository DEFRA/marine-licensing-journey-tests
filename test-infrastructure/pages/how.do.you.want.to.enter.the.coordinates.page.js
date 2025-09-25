export default class HowDoYouWantToEnterTheCoordinatesPage {
  static circularSite = 'input[name="coordinatesEntry"][value="single"]'
  static triangleSite = 'input[name="coordinatesEntry"][value="multiple"]'
  static saveAndContinue = 'button[type="submit"]'
  static coordinatesEntryError = '.govuk-error-message'

  static getSiteTypeSelector(siteType) {
    if (siteType === 'circle') return this.circularSite
    if (siteType === 'triangle') return this.triangleSite
    return siteType
  }
}

export default class HowDoYouWantToEnterTheCoordinatesPage {
  static circularSite = 'input[name="coordinatesEntry"][value="single"]'
  static boundarySite = 'input[name="coordinatesEntry"][value="multiple"]'
  static saveAndContinue = 'button[type="submit"]'
  static coordinatesEntryError = '.govuk-error-message'

  static getSiteTypeSelector(siteType) {
    if (siteType === 'circle') return this.circularSite
    if (siteType === 'boundary') return this.boundarySite
    return siteType
  }
}

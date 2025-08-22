export default class HowDoYouWantToEnterTheCoordinatesPage {
  static circularSite = '#coordinatesEntry'
  static triangleSite = '#coordinatesEntry-2'
  static saveAndContinue = 'button[type="submit"]'
  static coordinatesEntryError = '#coordinatesEntry-error'

  static getSiteTypeSelector(siteType) {
    if (siteType === 'circle') return this.circularSite
    if (siteType === 'triangle') return this.triangleSite
    return siteType
  }
}

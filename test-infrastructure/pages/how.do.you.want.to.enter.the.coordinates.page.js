export default class HowDoYouWantToEnterTheCoordinatesPage {
  static circularSite = '#coordinatesEntry'
  static boundarySite = '#coordinatesEntry-2'
  static saveAndContinue = 'button[type="submit"]'

  static getSiteTypeSelector(siteType) {
    if (siteType === 'circle') return this.circularSite
    if (siteType === 'boundary') return this.boundarySite
    return siteType
  }
}

export default class SiteDetailsModel {
  constructor(initialData = {}) {
    this._data = {
      coordinatesEntryMethod: null,
      siteType: null,
      coordinateSystem: null,
      circleData: {
        // For WGS84
        latitude: null,
        longitude: null,
        // For OSGB36
        easting: null,
        northing: null,
        // For all
        witdhMetres: null
      }
    }
  }

  getData() {
    return { ...this._data }
  }
}

export default class SiteDetailsModel {
  constructor(initialData = {}) {
    this._data = {
      coordinateEntryMethod: null, // 'file' or 'manual'
      siteType: null, // 'circle' or 'boundary'
      coordinateSystem: null, // 'WGS84' or 'OSGB36'
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

  setCoordinateEntryMethod(method) {
    if (!['file', 'manual'].includes(method)) {
      expect.fail('Coordinate entry method must be either "file" or "manual"')
    }
    this._data.coordinateEntryMethod = method
    return this
  }

  setSiteType(type) {
    if (!['circle', 'boundary'].includes(type)) {
      expect.fail('Site type must be either "circle" or "boundary"')
    }
    this._data.siteType = type
    return this
  }

  setCoordinateSystem(system) {
    if (!['WGS84', 'OSGB36'].includes(system)) {
      expect.fail('Coordinate system must be either "WGS84" or "OSGB36"')
    }
    this._data.coordinateSystem = system
    return this
  }

  setCircleWGS84(latitude, longitude, radiusMeters) {
    this._data.coordinateSystem = 'WGS84'
    this._data.siteType = 'circle'
    this._data.coordinateEntryMethod = 'manual'
    this._data.circleData = {
      latitude,
      longitude,
      radiusMeters,
      easting: null,
      northing: null
    }
    return this
  }

  setCircleOSGB36(easting, northing, radiusMeters) {
    this._data.coordinateSystem = 'OSGB36'
    this._data.siteType = 'circle'
    this._data.coordinateEntryMethod = 'manual'
    this._data.circleData = {
      easting,
      northing,
      radiusMeters,
      latitude: null,
      longitude: null
    }
    return this
  }

  getData() {
    return { ...this._data }
  }
}

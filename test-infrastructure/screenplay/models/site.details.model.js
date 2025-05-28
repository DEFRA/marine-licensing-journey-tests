import { expect } from 'chai'

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

  setCoordinatesEntryMethod(method) {
    if (!['file-upload', 'enter-manually'].includes(method)) {
      expect.fail('Coordinate entry method must be either "file" or "manual"')
    }
    this._data.coordinatesEntryMethod = method
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

  getData() {
    return { ...this._data }
  }
}

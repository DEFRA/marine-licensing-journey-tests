export default class SiteDetailsFactory {
  static createCircleWGS84() {
    return this._createSiteDetails('circle', 'WGS84', {
      circleData: this._getDefaultCircleWGS84()
    })
  }

  static createCircleOSGB36() {
    return this._createSiteDetails('circle', 'OSGB36', {
      circleData: this._getDefaultCircleOSGB36()
    })
  }

  static createBoundaryWGS84() {
    return this._createSiteDetails('boundary', 'WGS84')
  }

  static createBoundaryOSGB36() {
    return this._createSiteDetails('boundary', 'OSGB36')
  }

  static createTriangleWGS84() {
    return this._createSiteDetails('boundary', 'WGS84', {
      polygonData: this._getDefaultTriangleWGS84()
    })
  }

  static createTriangleOSGB36() {
    return this._createSiteDetails('boundary', 'OSGB36', {
      polygonData: this._getDefaultTriangleOSGB36()
    })
  }

  static createFileUpload() {
    return { coordinatesEntryMethod: 'file-upload' }
  }

  static _createSiteDetails(siteType, coordinateSystem, additionalData = {}) {
    return {
      coordinatesEntryMethod: 'enter-manually',
      siteType,
      coordinateSystem,
      ...additionalData
    }
  }

  static _getDefaultCircleWGS84() {
    return {
      latitude: 51.507412,
      longitude: -0.127812,
      width: 20,
      easting: null,
      northing: null
    }
  }

  static _getDefaultCircleOSGB36() {
    return {
      eastings: 432675,
      northings: 181310,
      width: 20,
      latitude: null,
      longitude: null
    }
  }

  static _getDefaultTriangleWGS84() {
    return {
      coordinates: [
        { latitude: '50.000000', longitude: '-1.000000' },
        { latitude: '50.001000', longitude: '-0.999000' },
        { latitude: '50.000500', longitude: '-0.999500' }
      ]
    }
  }

  static _getDefaultTriangleOSGB36() {
    return {
      coordinates: [
        { eastings: '432675', northings: '181310' },
        { eastings: '433000', northings: '181500' },
        { eastings: '432800', northings: '181700' }
      ]
    }
  }
}

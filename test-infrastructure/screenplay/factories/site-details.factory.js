export default class SiteDetailsFactory {
  static defaultData = {
    circle: {
      WGS84: {
        latitude: 51.507412,
        longitude: -0.127812,
        width: 20,
        easting: null,
        northing: null
      },
      OSGB36: {
        eastings: 432675,
        northings: 181310,
        width: 20,
        latitude: null,
        longitude: null
      }
    },
    triangle: {
      WGS84: [
        ['50.000000', '-1.000000'],
        ['50.001000', '-0.999000'],
        ['50.000500', '-0.999500']
      ],
      OSGB36: [
        ['432675', '181310'],
        ['433000', '181500'],
        ['432800', '181700']
      ]
    },
    quadrilateral: {
      WGS84: [
        ['50.000000', '-1.000000'],
        ['50.001000', '-1.000000'],
        ['50.001000', '-0.999000'],
        ['50.000000', '-0.999000']
      ],
      OSGB36: [
        ['432675', '181310'],
        ['433000', '181310'],
        ['433000', '181500'],
        ['432675', '181500']
      ]
    }
  }

  static create(shape, coordinateSystem) {
    const siteType = shape === 'circle' ? 'circle' : 'boundary'
    const data = this.defaultData[shape]?.[coordinateSystem]

    if (!data) return this._createSiteDetails(siteType, coordinateSystem)

    if (shape === 'circle') {
      return this._createSiteDetails(siteType, coordinateSystem, {
        circleData: data
      })
    }

    return this._createSiteDetails(siteType, coordinateSystem, {
      polygonData: this._createCoordinateSet(data, coordinateSystem)
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

  static _createCoordinateSet(coordinatePairs, system) {
    const coordinates = coordinatePairs.map(([first, second]) =>
      system === 'WGS84'
        ? { latitude: first, longitude: second }
        : { eastings: first, northings: second }
    )
    return { coordinates }
  }
}

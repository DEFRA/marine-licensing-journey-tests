import { expect } from 'chai'

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
    },
    pentagon: {
      WGS84: [
        ['50.000000', '-1.000000'],
        ['50.001000', '-1.000000'],
        ['50.001500', '-0.999500'],
        ['50.001000', '-0.999000'],
        ['50.000000', '-0.999000']
      ],
      OSGB36: [
        ['432675', '181310'],
        ['433000', '181310'],
        ['433200', '181400'],
        ['433000', '181500'],
        ['432675', '181500']
      ]
    }
  }

  static generateRandomWGS84Coordinate() {
    const minLatitude = 49.5
    const maxLatitude = 61.0
    const minLongitude = -11.0
    const maxLongitude = 2.0

    const latitude = (
      Math.random() * (maxLatitude - minLatitude) +
      minLatitude
    ).toFixed(6)
    const longitude = (
      Math.random() * (maxLongitude - minLongitude) +
      minLongitude
    ).toFixed(6)

    return [latitude, longitude]
  }

  static generateRandomPolygonCoordinates(
    coordinateCount,
    coordinateSystem = 'WGS84'
  ) {
    if (coordinateSystem !== 'WGS84') {
      expect.fail('Random coordinate generation only supports WGS84 currently')
    }

    const coordinates = []
    for (let i = 0; i < coordinateCount; i++) {
      coordinates.push(this.generateRandomWGS84Coordinate())
    }
    return coordinates
  }

  static createRandomPolygon(coordinateCount, coordinateSystem = 'WGS84') {
    const randomCoordinates = this.generateRandomPolygonCoordinates(
      coordinateCount,
      coordinateSystem
    )
    return this._createSiteDetails('boundary', coordinateSystem, {
      polygonData: this._createCoordinateSet(
        randomCoordinates,
        coordinateSystem
      )
    })
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

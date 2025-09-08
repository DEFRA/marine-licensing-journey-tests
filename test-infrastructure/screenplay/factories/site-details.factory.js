import {
  ActivityDatesModel,
  ActivityDescriptionModel
} from '../models/index.js'

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

  static create(shape, coordinateSystem) {
    const siteType = shape === 'circle' ? 'circle' : 'triangle'
    const data = this.defaultData[shape]?.[coordinateSystem]

    if (!data) return this._createSiteDetails(siteType, coordinateSystem)

    if (shape === 'circle') {
      const siteDetails = this._createSiteDetails(siteType, coordinateSystem, {
        circleData: data
      })
      return this._wrapInSitesArray(siteDetails)
    }

    const siteDetails = this._createSiteDetails(siteType, coordinateSystem, {
      polygonData: this._createCoordinateSet(data, coordinateSystem)
    })
    return this._wrapInSitesArray(siteDetails)
  }

  static createFileUpload() {
    return {
      coordinatesEntryMethod: 'file-upload',
      activityDates: ActivityDatesModel.generateValidActivityDates(),
      activityDescription:
        ActivityDescriptionModel.generateActivityDescription()
    }
  }

  static createMultipleSites() {
    return {
      multipleSitesEnabled: 'yes',
      sameActivityDates: 'yes',
      coordinatesEntryMethod: 'enter-manually',
      siteType: 'circle',
      coordinateSystem: 'WGS84',
      circleData: this.defaultData.circle.WGS84,
      activityDates: ActivityDatesModel.generateValidActivityDates(),
      activityDescription:
        ActivityDescriptionModel.generateActivityDescription(),
      sites: [
        {
          siteName: 'Main Research Site',
          siteNumber: 1,
          activityDescription:
            ActivityDescriptionModel.generateActivityDescription(),
          ...this._createSiteDetails('circle', 'WGS84', {
            circleData: this.defaultData.circle.WGS84
          })
        },
        {
          siteName: 'Marine Research Site Beta',
          siteNumber: 2,
          activityDescription:
            ActivityDescriptionModel.generateActivityDescription(),
          ...this._createSiteDetails('circle', 'WGS84', {
            circleData: {
              latitude: 51.51,
              longitude: -0.13,
              width: 25,
              easting: null,
              northing: null
            }
          })
        }
      ]
    }
  }

  static createKMLUpload() {
    return this._createFileUpload(
      'KML',
      'test/resources/EXE_2025_00009-LOCATIONS.kml'
    )
  }

  static createShapefileUpload() {
    return this._createFileUpload(
      'Shapefile',
      'test/resources/valid-shapefile.zip'
    )
  }

  static _createFileUpload(fileType, filePath) {
    const siteDetails = {
      coordinatesEntryMethod: 'file-upload',
      fileType,
      filePath,
      activityDates: ActivityDatesModel.generateValidActivityDates(),
      activityDescription:
        ActivityDescriptionModel.generateActivityDescription()
    }
    return this._wrapInSitesArray(siteDetails)
  }

  static _wrapInSitesArray(siteDetails, siteName = 'Main Research Site') {
    const { activityDescription, ...siteData } = siteDetails
    return {
      ...siteDetails,
      sites: [
        {
          siteName,
          siteNumber: 1,
          activityDescription,
          ...siteData
        }
      ]
    }
  }

  static _createSiteDetails(siteType, coordinateSystem, additionalData = {}) {
    return {
      coordinatesEntryMethod: 'enter-manually',
      siteType,
      coordinateSystem,
      activityDates: ActivityDatesModel.generateValidActivityDates(),
      activityDescription:
        ActivityDescriptionModel.generateActivityDescription(),
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

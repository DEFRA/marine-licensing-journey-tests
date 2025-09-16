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

    if (!data) {
      const baseData = this._createSiteDetails(siteType, coordinateSystem)
      return {
        coordinatesEntryMethod: 'enter-manually',
        sites: [
          {
            siteName: 'Main Research Site',
            siteNumber: 1,
            activityDescription:
              ActivityDescriptionModel.generateActivityDescription(),
            ...baseData
          }
        ]
      }
    }

    const baseData = this._createSiteDetails(
      siteType,
      coordinateSystem,
      shape === 'circle'
        ? { circleData: data }
        : { polygonData: this._createCoordinateSet(data, coordinateSystem) }
    )

    return {
      coordinatesEntryMethod: 'enter-manually',
      sites: [
        {
          siteName: 'Main Research Site',
          siteNumber: 1,
          activityDescription:
            ActivityDescriptionModel.generateActivityDescription(),
          ...baseData
        }
      ]
    }
  }

  static createFileUpload() {
    return this._createFileUpload()
  }

  static createMultipleSites() {
    return {
      multipleSitesEnabled: 'yes',
      sameActivityDates: 'yes',
      coordinatesEntryMethod: 'enter-manually',
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
            circleData: this.defaultData.circle.WGS84
          })
        }
      ]
    }
  }

  static createMixedMultipleSites() {
    const firstSiteActivityDates =
      ActivityDatesModel.generateValidActivityDates()
    const firstSiteActivityDescription =
      ActivityDescriptionModel.generateActivityDescription()

    return {
      multipleSitesEnabled: 'yes',
      sameActivityDates: 'no',
      sameActivityDescription: 'no',
      coordinatesEntryMethod: 'enter-manually',
      sites: [
        {
          siteName: 'Circular Research Area Alpha',
          siteNumber: 1,
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'circle',
          coordinateSystem: 'WGS84',
          activityDates: firstSiteActivityDates,
          activityDescription: firstSiteActivityDescription,
          circleData: this.defaultData.circle.WGS84
        },
        {
          siteName: 'Triangular Survey Zone Beta',
          siteNumber: 2,
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'triangle',
          coordinateSystem: 'WGS84',
          activityDates: ActivityDatesModel.generateValidActivityDates(),
          activityDescription:
            ActivityDescriptionModel.generateActivityDescription(),
          polygonData: this._createCoordinateSet(
            this.defaultData.triangle.WGS84,
            'WGS84'
          )
        },
        {
          siteName: 'Circular Monitoring Point Gamma',
          siteNumber: 3,
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'circle',
          coordinateSystem: 'OSGB36',
          activityDates: ActivityDatesModel.generateValidActivityDates(),
          activityDescription:
            ActivityDescriptionModel.generateActivityDescription(),
          circleData: this.defaultData.circle.OSGB36
        },
        {
          siteName: 'Quadrilateral Study Area Delta',
          siteNumber: 4,
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'triangle',
          coordinateSystem: 'OSGB36',
          activityDates: ActivityDatesModel.generateValidActivityDates(),
          activityDescription:
            ActivityDescriptionModel.generateActivityDescription(),
          polygonData: this._createCoordinateSet(
            this.defaultData.quadrilateral.OSGB36,
            'OSGB36'
          )
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

  static _createFileUpload(fileType = null, filePath = null) {
    const baseData = {
      coordinatesEntryMethod: 'file-upload'
    }

    if (fileType) baseData.fileType = fileType
    if (filePath) baseData.filePath = filePath

    const siteData = {
      siteName: 'Main Research Site',
      siteNumber: 1,
      coordinatesEntryMethod: 'file-upload',
      activityDates: ActivityDatesModel.generateValidActivityDates(),
      activityDescription:
        ActivityDescriptionModel.generateActivityDescription()
    }

    if (fileType) siteData.fileType = fileType
    if (filePath) siteData.filePath = filePath

    return {
      ...baseData,
      sites: [siteData]
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

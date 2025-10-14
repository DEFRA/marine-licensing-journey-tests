import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  ActivityDatesModel,
  ActivityDescriptionModel
} from '../models/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default class SiteDetailsFactory {
  static ENTRY_METHODS = {
    MANUAL: 'enter-manually',
    FILE_UPLOAD: 'file-upload'
  }

  static COORDINATE_SYSTEMS = {
    WGS84: 'WGS84',
    OSGB36: 'OSGB36'
  }

  static SITE_TYPES = {
    CIRCLE: 'circle',
    TRIANGLE: 'triangle'
  }

  static RESPONSES = {
    YES: 'yes',
    NO: 'no'
  }

  static MULTI_SITE_KML_FILE = 'test/resources/EXE_2025_00098-LOCATIONS.kml'
  static MULTI_SITE_SHAPEFILE = 'test/resources/Suffolk MMO shapefiles.zip'

  static DEFAULT_COORDINATES = {
    circle: {
      WGS84: { latitude: 51.507412, longitude: -0.127812, width: 20 },
      OSGB36: { eastings: 432675, northings: 181310, width: 20 }
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
    const siteType =
      shape === this.SITE_TYPES.CIRCLE
        ? this.SITE_TYPES.CIRCLE
        : this.SITE_TYPES.TRIANGLE
    const coordinateData = this._getCoordinateData(shape, coordinateSystem)

    return this._createSiteDetailsStructure([
      this._createSingleSite({
        siteName: 'Main Research Site',
        siteNumber: 1,
        siteType,
        coordinateSystem,
        coordinateData
      })
    ])
  }

  static createFileUpload() {
    return this._createFileUpload()
  }

  static createMixedMultipleSites() {
    return this._createMixedMultipleSites({
      sameActivityDates: false,
      sameActivityDescription: false
    })
  }

  static createMixedMultipleSitesWithSameActivityDatesAndDescriptions() {
    return this._createMixedMultipleSites({
      sameActivityDates: true,
      sameActivityDescription: true
    })
  }

  static createMixedMultipleSitesWithSameActivityDatesAndDifferentDescriptions() {
    return this._createMixedMultipleSites({
      sameActivityDates: true,
      sameActivityDescription: false
    })
  }

  static createMixedMultipleSitesWithDifferentActivityDatesAndSameDescriptions() {
    return this._createMixedMultipleSites({
      sameActivityDates: false,
      sameActivityDescription: true
    })
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

  static createMultiSiteFileUploadByType(
    fileType,
    { sameActivityDates = false, sameActivityDescription = false } = {}
  ) {
    const fileConfig = {
      KML: this.MULTI_SITE_KML_FILE,
      Shapefile: this.MULTI_SITE_SHAPEFILE
    }
    const filePath = fileConfig[fileType]
    if (!filePath) {
      throw new Error(`Unsupported file type: ${fileType}`)
    }
    return this._createMultiSiteFileUpload(fileType, filePath, {
      sameActivityDates,
      sameActivityDescription
    })
  }

  static createMultiSiteKMLUpload(options) {
    return this.createMultiSiteFileUploadByType('KML', options)
  }

  static createMultiSiteShapefileUpload(options) {
    return this.createMultiSiteFileUploadByType('Shapefile', options)
  }

  static _createMixedMultipleSites({
    sameActivityDates,
    sameActivityDescription
  }) {
    const sharedActivityDates = ActivityDatesModel.generateValidActivityDates()
    const sharedActivityDescription =
      ActivityDescriptionModel.generateActivityDescription()

    const siteDefinitions = [
      {
        name: 'Circular Research Area Alpha',
        number: 1,
        type: this.SITE_TYPES.CIRCLE,
        system: this.COORDINATE_SYSTEMS.WGS84
      },
      {
        name: 'Triangular Survey Zone Beta',
        number: 2,
        type: this.SITE_TYPES.TRIANGLE,
        system: this.COORDINATE_SYSTEMS.WGS84
      },
      {
        name: 'Circular Monitoring Point Gamma',
        number: 3,
        type: this.SITE_TYPES.CIRCLE,
        system: this.COORDINATE_SYSTEMS.OSGB36
      },
      {
        name: 'Quadrilateral Study Area Delta',
        number: 4,
        type: this.SITE_TYPES.TRIANGLE,
        system: this.COORDINATE_SYSTEMS.OSGB36
      }
    ]

    const sites = siteDefinitions.map((def) => {
      const coordinateData = this._getCoordinateData(
        def.number === 4 ? 'quadrilateral' : def.type,
        def.system
      )
      const activityDates = sameActivityDates
        ? sharedActivityDates
        : ActivityDatesModel.generateValidActivityDates()
      const activityDescription = sameActivityDescription
        ? sharedActivityDescription
        : ActivityDescriptionModel.generateActivityDescription()

      return this._createSingleSite({
        siteName: def.name,
        siteNumber: def.number,
        siteType: def.type,
        coordinateSystem: def.system,
        coordinateData,
        activityDates,
        activityDescription
      })
    })

    return this._createMultiSiteStructure({
      sameActivityDates,
      sameActivityDescription,
      sites
    })
  }

  static _createSiteDetailsStructure(sites) {
    return {
      coordinatesEntryMethod: this.ENTRY_METHODS.MANUAL,
      sites
    }
  }

  static _createMultiSiteStructure({
    sameActivityDates,
    sameActivityDescription,
    sites
  }) {
    return {
      multipleSitesEnabled: true,
      sameActivityDates,
      sameActivityDescription,
      coordinatesEntryMethod: this.ENTRY_METHODS.MANUAL,
      sites
    }
  }

  static _createSingleSite(options) {
    const {
      siteName,
      siteNumber,
      siteType,
      coordinateSystem,
      coordinateData,
      activityDates,
      activityDescription
    } = options
    return {
      siteName,
      siteNumber,
      coordinatesEntryMethod: this.ENTRY_METHODS.MANUAL,
      siteType,
      coordinateSystem,
      activityDates:
        activityDates || ActivityDatesModel.generateValidActivityDates(),
      activityDescription:
        activityDescription ||
        ActivityDescriptionModel.generateActivityDescription(),
      ...coordinateData
    }
  }

  static _getCoordinateData(shape, coordinateSystem) {
    const coordinates = this.DEFAULT_COORDINATES[shape]?.[coordinateSystem]
    if (!coordinates) return {}

    return shape === this.SITE_TYPES.CIRCLE
      ? { circleData: coordinates }
      : {
          polygonData: this._createCoordinateSet(coordinates, coordinateSystem)
        }
  }

  static _createFileUpload(fileType = null, filePath = null) {
    const siteData = {
      siteName: 'Main Research Site',
      siteNumber: 1,
      coordinatesEntryMethod: this.ENTRY_METHODS.FILE_UPLOAD,
      activityDates: ActivityDatesModel.generateValidActivityDates(),
      activityDescription:
        ActivityDescriptionModel.generateActivityDescription()
    }

    if (fileType) siteData.fileType = fileType
    if (filePath) siteData.filePath = filePath

    const baseData = { coordinatesEntryMethod: this.ENTRY_METHODS.FILE_UPLOAD }
    if (fileType) baseData.fileType = fileType
    if (filePath) baseData.filePath = filePath

    return { ...baseData, sites: [siteData] }
  }

  static _createMultiSiteFileUpload(
    fileType,
    filePath,
    { sameActivityDates, sameActivityDescription }
  ) {
    const sharedActivityDates = ActivityDatesModel.generateValidActivityDates()
    const sharedActivityDescription =
      ActivityDescriptionModel.generateActivityDescription()

    const expectedJsonPath = filePath.replace(/\.(kml|zip)$/, '.expected.json')
    let numberOfSites = 2 // Default to 2 sites

    try {
      const fullPath = path.resolve(__dirname, '../../..', expectedJsonPath)
      const expectedData = JSON.parse(fs.readFileSync(fullPath, 'utf8'))

      numberOfSites = expectedData.extractedSites.length
    } catch (error) {
      console.warn(
        `Could not read expected JSON file: ${expectedJsonPath}. Using default number of sites (2).`
      )
    }

    const siteNamePatterns = [
      'Kentish Flats and Kentish Flats Extension',
      'Thanet Offshore Wind Farm',
      'Greater Gabbard Wind Farm',
      'London Array Offshore Wind Farm',
      'Galloper Wind Farm',
      'Race Bank Wind Farm',
      'Dudgeon Offshore Wind Farm',
      'Sheringham Shoal Offshore Wind Farm'
    ]

    const sites = Array.from({ length: numberOfSites }, (_, index) => {
      const siteName = siteNamePatterns[index] || `Marine Site ${index + 1}`

      const activityDates = sameActivityDates
        ? sharedActivityDates
        : ActivityDatesModel.generateValidActivityDates()
      const activityDescription = sameActivityDescription
        ? sharedActivityDescription
        : ActivityDescriptionModel.generateActivityDescription()

      return {
        siteName,
        siteNumber: index + 1,
        coordinatesEntryMethod: this.ENTRY_METHODS.FILE_UPLOAD,
        fileType,
        filePath,
        activityDates,
        activityDescription
      }
    })

    return {
      multipleSitesEnabled: true,
      sameActivityDates,
      sameActivityDescription,
      coordinatesEntryMethod: this.ENTRY_METHODS.FILE_UPLOAD,
      fileType,
      filePath,
      sites
    }
  }

  static _createCoordinateSet(coordinatePairs, system) {
    const coordinates = coordinatePairs.map(([first, second]) =>
      system === this.COORDINATE_SYSTEMS.WGS84
        ? { latitude: first, longitude: second }
        : { eastings: first, northings: second }
    )
    return { coordinates }
  }
}

import {
  ActivityDatesModel,
  ActivityDescriptionModel,
  FileTypeModel,
  MarineProjectModel,
  PublicRegisterModel
} from '../models/index.js'

export default class ApplyForExemption {
  constructor(data) {
    this.data = { ...data }
  }

  static _createBaseExemption(overrides = {}) {
    return {
      projectName: MarineProjectModel.generateProjectName(),
      activityDescription:
        ActivityDescriptionModel.generateActivityDescription(),
      activityDates: null,
      publicRegister: null,
      fileType: null,
      projectNameTaskCompleted: false,
      activityDescriptionTaskCompleted: false,
      activityDatesTaskCompleted: false,
      publicRegisterTaskCompleted: false,
      ...overrides
    }
  }

  static withValidProjectName() {
    return new ApplyForExemption(this._createBaseExemption())
  }

  static withProjectName(projectName) {
    return new ApplyForExemption(this._createBaseExemption({ projectName }))
  }

  static withValidActivityDates() {
    return new ApplyForExemption(
      this._createBaseExemption({
        activityDates: ActivityDatesModel.generateValidActivityDates()
      })
    )
  }

  static withSameStartAndEndActivityDates() {
    return new ApplyForExemption(
      this._createBaseExemption({
        activityDates: ActivityDatesModel.generateSameStartAndEndDate()
      })
    )
  }

  static withCompletedActivityDates() {
    return new ApplyForExemption(
      this._createBaseExemption({
        activityDates: ActivityDatesModel.generateValidActivityDates(),
        activityDatesTaskCompleted: true
      })
    )
  }

  static withConsentToPublicRegister() {
    return new ApplyForExemption(
      this._createBaseExemption({
        publicRegister: { consent: true }
      })
    )
  }

  static withWithholdFromPublicRegister() {
    return new ApplyForExemption(
      this._createBaseExemption({
        publicRegister: {
          consent: false,
          reason: PublicRegisterModel.generateWithholdingReason()
        }
      })
    )
  }

  static withShapefileUpload() {
    return new ApplyForExemption(
      this._createBaseExemption({
        fileType: FileTypeModel.generateShapefile(),
        siteDetails: {
          coordinatesEntryMethod: 'file-upload'
        }
      })
    )
  }

  static withKMLUpload() {
    return new ApplyForExemption(
      this._createBaseExemption({
        fileType: FileTypeModel.generateKML(),
        siteDetails: {
          coordinatesEntryMethod: 'file-upload'
        }
      })
    )
  }

  static withFileUpload() {
    return new ApplyForExemption(
      this._createBaseExemption({
        siteDetails: {
          coordinatesEntryMethod: 'file-upload'
        }
      })
    )
  }

  getData() {
    return this.data
  }

  activityDates(dates) {
    this.data.activityDates = dates
    return this
  }

  activityDatesTaskCompleted(completed = true) {
    this.data.activityDatesTaskCompleted = completed
    return this
  }

  latitude(value) {
    if (this.data.siteDetails && this.data.siteDetails.circleData) {
      this.data.siteDetails.circleData.latitude = value
    }
    return this
  }

  longitude(value) {
    if (this.data.siteDetails && this.data.siteDetails.circleData) {
      this.data.siteDetails.circleData.longitude = value
    }
    return this
  }

  radius(value) {
    if (this.data.siteDetails && this.data.siteDetails.circleData) {
      this.data.siteDetails.circleData.radiusMeters = value
    }
    return this
  }

  eastings(value) {
    if (this.data.siteDetails && this.data.siteDetails.circleData) {
      this.data.siteDetails.circleData.eastings = value
    }
    return this
  }

  northings(value) {
    if (this.data.siteDetails && this.data.siteDetails.circleData) {
      this.data.siteDetails.circleData.northings = value
    }
    return this
  }

  width(value) {
    if (this.data.siteDetails && this.data.siteDetails.circleData) {
      this.data.siteDetails.circleData.width = value
    }
    return this
  }

  get andSiteDetails() {
    return {
      withCircleWGS84: () => {
        this.data.siteDetails = {
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'circle',
          coordinateSystem: 'WGS84',
          circleData: {
            latitude: 51.507412,
            longitude: -0.127812,
            width: 20,
            easting: null,
            northing: null
          }
        }
        return this
      },
      withCircleOSGB36: () => {
        this.data.siteDetails = {
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'circle',
          coordinateSystem: 'OSGB36',
          circleData: {
            eastings: 432675,
            northings: 181310,
            width: 20,
            latitude: null,
            longitude: null
          }
        }
        return this
      },
      withBoundaryWGS84: () => {
        this.data.siteDetails = {
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'boundary',
          coordinateSystem: 'WGS84'
        }
        return this
      },
      withBoundaryOSGB36: () => {
        this.data.siteDetails = {
          coordinatesEntryMethod: 'enter-manually',
          siteType: 'boundary',
          coordinateSystem: 'OSGB36'
        }
        return this
      }
    }
  }

  get andActivityDates() {
    return {
      withValidDates: () => {
        this.data.activityDates =
          ActivityDatesModel.generateValidActivityDates()
        return this
      },
      withSameStartAndEndDate: () => {
        this.data.activityDates =
          ActivityDatesModel.generateSameStartAndEndDate()
        return this
      },
      withShortDuration: () => {
        this.data.activityDates =
          ActivityDatesModel.generateShortDurationActivityDates()
        return this
      },
      withLongDuration: () => {
        this.data.activityDates =
          ActivityDatesModel.generateLongDurationActivityDates()
        return this
      },
      asCompleted: () => {
        this.data.activityDatesTaskCompleted = true
        return this
      }
    }
  }
}

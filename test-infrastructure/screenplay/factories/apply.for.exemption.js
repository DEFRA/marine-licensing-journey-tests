import {
  ActivityDescriptionModel,
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
      publicRegister: null,
      projectNameTaskCompleted: false,
      activityDescriptionTaskCompleted: false,
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

  getData() {
    return this.data
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
}

import { MarineProjectModel, PublicRegisterModel } from '../models/index.js'

export default class ApplyForExemption {
  constructor(data) {
    this.data = { ...data }
  }

  static withValidProjectName() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: null,
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withProjectName(projectName) {
    return new ApplyForExemption({
      projectName,
      publicRegister: null,
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withConsentToPublicRegister() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: { consent: true },
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  static withWithholdFromPublicRegister() {
    return new ApplyForExemption({
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: {
        consent: false,
        reason: PublicRegisterModel.generateWithholdingReason()
      },
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false
    })
  }

  getData() {
    return this.data
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
            radiusMeters: 20,
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
            easting: 432675,
            northing: 181310,
            radiusMeters: 20,
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

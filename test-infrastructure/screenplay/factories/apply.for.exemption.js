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
      }
    }
  }
}

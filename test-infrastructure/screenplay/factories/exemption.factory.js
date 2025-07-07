import {
  ActivityDescriptionModel,
  FileTypeModel,
  MarineProjectModel,
  PublicRegisterModel
} from '../models/index.js'
import ActivityDatesFactory from './activity-dates.factory.js'
import SiteDetailsFactory from './site-details.factory.js'

export default class ExemptionFactory {
  static createBaseExemption(overrides = {}) {
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

  static createValidProjectName() {
    return this.createBaseExemption()
  }

  static createWithProjectName(projectName) {
    return this.createBaseExemption({ projectName })
  }

  static createValidActivityDates() {
    return this.createBaseExemption({
      activityDates: ActivityDatesFactory.createValidDates()
    })
  }

  static createSameStartAndEndActivityDates() {
    return this.createBaseExemption({
      activityDates: ActivityDatesFactory.createSameStartAndEndDate()
    })
  }

  static createCompletedActivityDates() {
    const completedDates = ActivityDatesFactory.createCompletedDates()
    return this.createBaseExemption({
      activityDates: completedDates.dates,
      activityDatesTaskCompleted: completedDates.completed
    })
  }

  static createConsentToPublicRegister() {
    return this.createBaseExemption({
      publicRegister: { consent: true }
    })
  }

  static createWithholdFromPublicRegister() {
    return this.createBaseExemption({
      publicRegister: {
        consent: false,
        reason: PublicRegisterModel.generateWithholdingReason()
      }
    })
  }

  static createCompleteData() {
    return this.createBaseExemption({
      activityDates: ActivityDatesFactory.createValidDates(),
      publicRegister: { consent: true }
    })
  }

  static createShapefileUpload() {
    return this.createBaseExemption({
      fileType: FileTypeModel.generateShapefile(),
      siteDetails: SiteDetailsFactory.createFileUpload()
    })
  }

  static createKMLUpload() {
    return this.createBaseExemption({
      fileType: FileTypeModel.generateKML(),
      siteDetails: SiteDetailsFactory.createFileUpload()
    })
  }

  static createFileUpload() {
    return this.createBaseExemption({
      siteDetails: SiteDetailsFactory.createFileUpload()
    })
  }
}

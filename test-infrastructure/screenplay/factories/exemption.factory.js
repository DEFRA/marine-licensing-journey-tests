import FileGenerator from '../../helpers/file-generator.js'
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

  static createKMLUpload() {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateKML(),
        filePath: 'test/resources/EXE_2025_00009-LOCATIONS.kml'
      }
    })
  }

  static createKMLVirusUpload() {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateKML(),
        filePath: 'test/resources/nasty-virus-here.kml'
      }
    })
  }

  static createKMLFileUpload() {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateKML()
      }
    })
  }

  static createKMLWrongFileType() {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateKML(),
        filePath:
          'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html'
      }
    })
  }

  static createKMLLargeFile(filePath) {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateKML(),
        filePath
      }
    })
  }

  static createKMLEmptyFile(filePath) {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateKML(),
        filePath
      }
    })
  }

  static createShapefileUpload() {
    const filePath = FileGenerator.generateTemporaryValidShapefile()
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateShapefile(),
        filePath
      }
    })
  }

  static createShapefileVirusUpload() {
    const filePath = FileGenerator.generateTemporaryVirusShapefile()
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateShapefile(),
        filePath
      }
    })
  }

  static createShapefileFileUpload() {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateShapefile()
      }
    })
  }

  static createShapefileWrongFileType() {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateShapefile(),
        filePath:
          'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html'
      }
    })
  }

  static createShapefileLargeFile(filePath) {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateShapefile(),
        filePath
      }
    })
  }

  static createShapefileEmptyFile(filePath) {
    return this.createBaseExemption({
      siteDetails: {
        ...SiteDetailsFactory.createFileUpload(),
        fileType: FileTypeModel.generateShapefile(),
        filePath
      }
    })
  }

  static createVirusUpload() {
    return this.createKMLVirusUpload()
  }

  static createFileUpload() {
    return this.createKMLFileUpload()
  }

  static createWrongFileType() {
    return this.createKMLWrongFileType()
  }

  static createLargeFile(filePath) {
    return this.createKMLLargeFile(filePath)
  }

  static createEmptyFile(filePath) {
    return this.createKMLEmptyFile(filePath)
  }
}

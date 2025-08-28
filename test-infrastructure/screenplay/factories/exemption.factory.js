import CoordinateFiles from '../../helpers/coordinate-files.js'
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

  static createFileUploadBase(fileType, options = {}) {
    const { filePath, generateFile } = options
    const actualFilePath = generateFile ? generateFile() : filePath

    const siteDetails = {
      ...SiteDetailsFactory.createFileUpload(),
      fileType:
        fileType === 'kml'
          ? FileTypeModel.generateKML()
          : FileTypeModel.generateShapefile(),
      ...(actualFilePath && { filePath: actualFilePath })
    }

    if (actualFilePath) {
      const expectedData =
        CoordinateFiles.loadExpectedCoordinates(actualFilePath)
      if (expectedData?.extractedCoordinates) {
        siteDetails.expectedCoordinates = expectedData.extractedCoordinates
      }
    }

    return this.createBaseExemption({
      activityDates: ActivityDatesFactory.createValidDates(),
      publicRegister: { consent: true },
      siteDetails
    })
  }

  static createKMLUpload() {
    return this.createFileUploadBase('kml', {
      filePath: 'test/resources/EXE_2025_00009-LOCATIONS.kml'
    })
  }

  static createKMLVirusUpload() {
    return this.createFileUploadBase('kml', {
      filePath: 'test/resources/nasty-virus-here.kml'
    })
  }

  static createKMLFileUpload() {
    return this.createFileUploadBase('kml')
  }

  static createKMLWrongFileType() {
    return this.createFileUploadBase('kml', {
      filePath:
        'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html'
    })
  }

  static createKMLLargeFile(filePath) {
    return this.createFileUploadBase('kml', { filePath })
  }

  static createKMLEmptyFile(filePath) {
    return this.createFileUploadBase('kml', { filePath })
  }

  static createShapefileUpload() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/valid-shapefile.zip'
    })
  }

  static createShapefileVirusUpload() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/mygeodata-virus.zip'
    })
  }

  static createShapefileFileUpload() {
    return this.createFileUploadBase('shapefile')
  }

  static createShapefileWrongFileType() {
    return this.createFileUploadBase('shapefile', {
      filePath:
        'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html'
    })
  }

  static createShapefileLargeFile(filePath) {
    return this.createFileUploadBase('shapefile', { filePath })
  }

  static createShapefileEmptyFile(filePath) {
    return this.createFileUploadBase('shapefile', { filePath })
  }
}

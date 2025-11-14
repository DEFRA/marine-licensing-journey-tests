import CoordinateFiles from '../../helpers/coordinate-files.js'
import {
  FileTypeModel,
  MarineProjectModel,
  PublicRegisterModel
} from '../models/index.js'
import IatContextFactory from './iat-context.factory.js'
import SiteDetailsFactory from './site-details.factory.js'

export default class ExemptionFactory {
  static createBaseExemption(overrides = {}) {
    return {
      projectName: MarineProjectModel.generateProjectName(),
      publicRegister: null,
      fileType: null,
      cookiePreferences: 'accept',
      projectNameTaskCompleted: false,
      publicRegisterTaskCompleted: false,
      iatContext: IatContextFactory.generate(),
      ...overrides
    }
  }

  static createValidProjectName() {
    return this.createBaseExemption()
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
      publicRegister: { consent: true }
    })
  }

  static createFileUploadBase(fileType, options = {}) {
    const { filePath, generateFile, expectValidationError = false } = options
    const actualFilePath = generateFile ? generateFile() : filePath

    const siteDetails = {
      ...SiteDetailsFactory.createFileUpload(),
      fileType: this.generateFileTypeModel(fileType),
      ...(actualFilePath && { filePath: actualFilePath }),
      expectValidationError
    }

    this.loadExpectedDataIntoSiteDetails(siteDetails, actualFilePath)

    return this.createBaseExemption({
      publicRegister: { consent: true },
      siteDetails
    })
  }

  static generateFileTypeModel(fileType) {
    return fileType === 'kml'
      ? FileTypeModel.generateKML()
      : FileTypeModel.generateShapefile()
  }

  static loadExpectedDataIntoSiteDetails(siteDetails, filePath) {
    if (!filePath) return

    const expectedData = CoordinateFiles.loadExpectedCoordinates(filePath)
    if (expectedData?.extractedCoordinates) {
      siteDetails.expectedCoordinates = expectedData.extractedCoordinates
    }
    if (expectedData?.extractedSites) {
      siteDetails.expectedSites = expectedData.extractedSites
    }
  }

  static createKMLUpload() {
    return this.createFileUploadBase('kml', {
      filePath: 'test/resources/EXE_2025_00009-LOCATIONS.kml'
    })
  }

  static createKMLVirusUpload() {
    return this.createFileUploadBase('kml', {
      filePath: 'test/resources/nasty-virus-here.kml',
      expectValidationError: true
    })
  }

  static createKMLFileUpload() {
    return this.createFileUploadBase('kml')
  }

  static createKMLWrongFileType() {
    return this.createFileUploadBase('kml', {
      filePath:
        'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html',
      expectValidationError: true
    })
  }

  static createKMLLargeFile(filePath) {
    return this.createFileUploadBase('kml', {
      filePath,
      expectValidationError: true
    })
  }

  static createKMLEmptyFile(filePath) {
    return this.createFileUploadBase('kml', {
      filePath,
      expectValidationError: true
    })
  }

  static createShapefileUpload() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/valid-shapefile.zip'
    })
  }

  static createShapefileVirusUpload() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/mygeodata-virus.zip',
      expectValidationError: true
    })
  }

  static createShapefileFileUpload() {
    return this.createFileUploadBase('shapefile')
  }

  static createShapefileWrongFileType() {
    return this.createFileUploadBase('shapefile', {
      filePath:
        'test/resources/uk-government-gathers-business-and-environment-leaders-in-support-of-un-nature-agreement.html',
      expectValidationError: true
    })
  }

  static createShapefileLargeFile(filePath) {
    return this.createFileUploadBase('shapefile', {
      filePath,
      expectValidationError: true
    })
  }

  static createShapefileEmptyFile(filePath) {
    return this.createFileUploadBase('shapefile', {
      filePath,
      expectValidationError: true
    })
  }

  static createShapefileMissingShp() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/missing_shp_file.zip',
      expectValidationError: true
    })
  }

  static createShapefileMissingShx() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/missing_shx_file.zip',
      expectValidationError: true
    })
  }

  static createShapefileMissingDbf() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/missing_dbf_file.zip',
      expectValidationError: true
    })
  }

  static createShapefileMissingAllCoreFiles() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/missing_shp_shx_dbf_files.zip',
      expectValidationError: true
    })
  }

  static createShapefileMissingPrj() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/missing_prj_file.zip',
      expectValidationError: true
    })
  }

  static createShapefileLargePrj() {
    return this.createFileUploadBase('shapefile', {
      filePath: 'test/resources/shapefile-large-prj.zip',
      expectValidationError: true
    })
  }
}

import BaseBuilder from './base-builder.js'
import {
  activityDatesExtension,
  createExtensionGetter,
  siteDetailsExtension
} from './builder-extensions.js'
import ExemptionFactory from './exemption.factory.js'

export default class ApplyForExemption extends BaseBuilder {
  static withValidProjectName() {
    return new ApplyForExemption(ExemptionFactory.createValidProjectName())
  }

  static withConsentToPublicRegister() {
    return new ApplyForExemption(
      ExemptionFactory.createConsentToPublicRegister()
    )
  }

  static withWithholdFromPublicRegister() {
    return new ApplyForExemption(
      ExemptionFactory.createWithholdFromPublicRegister()
    )
  }

  static withCompleteData() {
    return new ApplyForExemption(ExemptionFactory.createCompleteData())
  }

  static withKMLUpload() {
    return new ApplyForExemption(ExemptionFactory.createKMLUpload())
  }

  static withKMLVirusUpload() {
    return new ApplyForExemption(ExemptionFactory.createKMLVirusUpload())
  }

  static withKMLFileUpload() {
    return new ApplyForExemption(ExemptionFactory.createKMLFileUpload())
  }

  static withKMLWrongFileType() {
    return new ApplyForExemption(ExemptionFactory.createKMLWrongFileType())
  }

  static withKMLLargeFile(filePath) {
    return new ApplyForExemption(ExemptionFactory.createKMLLargeFile(filePath))
  }

  static withKMLEmptyFile(filePath) {
    return new ApplyForExemption(ExemptionFactory.createKMLEmptyFile(filePath))
  }

  static withShapefileUpload() {
    return new ApplyForExemption(ExemptionFactory.createShapefileUpload())
  }

  static withShapefileVirusUpload() {
    return new ApplyForExemption(ExemptionFactory.createShapefileVirusUpload())
  }

  static withShapefileFileUpload() {
    return new ApplyForExemption(ExemptionFactory.createShapefileFileUpload())
  }

  static withShapefileWrongFileType() {
    return new ApplyForExemption(
      ExemptionFactory.createShapefileWrongFileType()
    )
  }

  static withShapefileLargeFile(filePath) {
    return new ApplyForExemption(
      ExemptionFactory.createShapefileLargeFile(filePath)
    )
  }

  static withShapefileEmptyFile(filePath) {
    return new ApplyForExemption(
      ExemptionFactory.createShapefileEmptyFile(filePath)
    )
  }

  activityDates(dates) {
    return this.setProperty('activityDates', dates)
  }

  latitude(value) {
    return this.setSafeProperty('siteDetails.circleData.latitude', value)
  }

  longitude(value) {
    return this.setSafeProperty('siteDetails.circleData.longitude', value)
  }

  eastings(value) {
    return this.setSafeProperty('siteDetails.circleData.eastings', value)
  }

  northings(value) {
    return this.setSafeProperty('siteDetails.circleData.northings', value)
  }

  width(value) {
    return this.setSafeProperty('siteDetails.circleData.width', value)
  }

  withCoordinatePoints(points) {
    return this.setSafeProperty('siteDetails.polygonData.coordinates', points)
  }

  get andSiteDetails() {
    return createExtensionGetter(this, siteDetailsExtension)
  }

  get andActivityDates() {
    return createExtensionGetter(this, activityDatesExtension)
  }
}

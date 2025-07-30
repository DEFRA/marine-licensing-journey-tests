import BaseBuilder from './base-builder.js'
import {
  activityDatesExtension,
  createExtensionGetter,
  siteDetailsExtension
} from './builder-extensions.js'
import ExemptionFactory from './exemption.factory.js'
import SiteDetailsFactory from './site-details.factory.js'

export default class ApplyForExemption extends BaseBuilder {
  static withValidProjectName() {
    return new ApplyForExemption(ExemptionFactory.createValidProjectName())
  }

  static withProjectName(projectName) {
    return new ApplyForExemption(
      ExemptionFactory.createWithProjectName(projectName)
    )
  }

  static withValidActivityDates() {
    return new ApplyForExemption(ExemptionFactory.createValidActivityDates())
  }

  static withSameStartAndEndActivityDates() {
    return new ApplyForExemption(
      ExemptionFactory.createSameStartAndEndActivityDates()
    )
  }

  static withCompletedActivityDates() {
    return new ApplyForExemption(
      ExemptionFactory.createCompletedActivityDates()
    )
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

  static withVirusUpload() {
    return new ApplyForExemption(ExemptionFactory.createVirusUpload())
  }

  static withFileUpload() {
    return new ApplyForExemption(ExemptionFactory.createFileUpload())
  }

  static withWrongFileType() {
    return new ApplyForExemption(ExemptionFactory.createWrongFileType())
  }

  static withLargeFile(filePath) {
    return new ApplyForExemption(ExemptionFactory.createLargeFile(filePath))
  }

  static withEmptyFile(filePath) {
    return new ApplyForExemption(ExemptionFactory.createEmptyFile(filePath))
  }

  activityDates(dates) {
    return this.setProperty('activityDates', dates)
  }

  activityDatesTaskCompleted(completed = true) {
    return this.setTaskCompleted('activityDates', completed)
  }

  latitude(value) {
    return this.setSafeProperty('siteDetails.circleData.latitude', value)
  }

  longitude(value) {
    return this.setSafeProperty('siteDetails.circleData.longitude', value)
  }

  radius(value) {
    return this.setSafeProperty('siteDetails.circleData.radiusMeters', value)
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

  withLatitude(value) {
    return this.latitude(value)
  }

  withLongitude(value) {
    return this.longitude(value)
  }

  withEastings(value) {
    return this.eastings(value)
  }

  withNorthings(value) {
    return this.northings(value)
  }

  withWidth(value) {
    return this.width(value)
  }

  withCoordinatePoints(points) {
    return this.setSafeProperty('siteDetails.polygonData.coordinates', points)
  }

  withRandomCoordinateCount(coordinateCount) {
    const coordinateSystem = this.data?.siteDetails?.coordinateSystem || 'WGS84'
    const randomSiteDetails = SiteDetailsFactory.createRandomPolygon(
      coordinateCount,
      coordinateSystem
    )
    return this.setProperty('siteDetails', randomSiteDetails)
  }

  get andSiteDetails() {
    return createExtensionGetter(this, siteDetailsExtension)
  }

  get andActivityDates() {
    return createExtensionGetter(this, activityDatesExtension)
  }
}

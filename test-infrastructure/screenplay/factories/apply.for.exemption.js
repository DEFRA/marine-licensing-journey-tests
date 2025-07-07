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

  static withShapefileUpload() {
    return new ApplyForExemption(ExemptionFactory.createShapefileUpload())
  }

  static withKMLUpload() {
    return new ApplyForExemption(ExemptionFactory.createKMLUpload())
  }

  static withFileUpload() {
    return new ApplyForExemption(ExemptionFactory.createFileUpload())
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

  get andSiteDetails() {
    return createExtensionGetter(this, siteDetailsExtension)
  }

  get andActivityDates() {
    return createExtensionGetter(this, activityDatesExtension)
  }
}

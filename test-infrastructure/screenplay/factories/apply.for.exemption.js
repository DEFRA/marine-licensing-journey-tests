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

  static withNoPreviousCookieDecision() {
    const exemption = ExemptionFactory.createValidProjectName()
    exemption.cookiePreferences = 'none'
    exemption.noPreviousCookieDecision = true
    return new ApplyForExemption(exemption)
  }

  activityDates(dates) {
    if (this.data.siteDetails?.sites?.[0]) {
      this.data.siteDetails.sites[0].activityDates = dates
    }
    return this
  }

  latitude(value) {
    if (this.data.siteDetails?.sites?.[0]?.circleData) {
      this.data.siteDetails.sites[0].circleData.latitude = value
    }
    return this
  }

  longitude(value) {
    if (this.data.siteDetails?.sites?.[0]?.circleData) {
      this.data.siteDetails.sites[0].circleData.longitude = value
    }
    return this
  }

  eastings(value) {
    if (this.data.siteDetails?.sites?.[0]?.circleData) {
      this.data.siteDetails.sites[0].circleData.eastings = value
    }
    return this
  }

  northings(value) {
    if (this.data.siteDetails?.sites?.[0]?.circleData) {
      this.data.siteDetails.sites[0].circleData.northings = value
    }
    return this
  }

  width(value) {
    if (this.data.siteDetails?.sites?.[0]?.circleData) {
      this.data.siteDetails.sites[0].circleData.width = value
    }
    return this
  }

  withCoordinatePoints(points) {
    if (this.data.siteDetails?.sites?.[0]?.polygonData) {
      this.data.siteDetails.sites[0].polygonData.coordinates = points
    }
    return this
  }

  get andSiteDetails() {
    return createExtensionGetter(this, siteDetailsExtension)
  }

  get andActivityDates() {
    return createExtensionGetter(this, activityDatesExtension)
  }
}

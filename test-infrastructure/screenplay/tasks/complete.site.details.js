import Task from '../base/task.js'
import FileUploadSiteDetailsTask from './file-upload-site-details-task.js'
import ManualCoordinatesSiteDetailsTask from './manual-coordinates-site-details-task.js'
import MultiSiteSiteDetailsTask from './multi-site-site-details-task.js'
import { SiteDetailsConfig } from './site-details-config.js'

export default class CompleteSiteDetails extends Task {
  static now() {
    return new CompleteSiteDetails(new SiteDetailsConfig())
  }

  static coordinatesOnly() {
    return new CompleteSiteDetails(SiteDetailsConfig.coordinatesOnly())
  }

  static coordinatesWithAddAnotherPoint() {
    return new CompleteSiteDetails(
      SiteDetailsConfig.coordinatesWithAddAnotherPoint()
    )
  }

  static andSave() {
    return new CompleteSiteDetails(SiteDetailsConfig.withSaveAndContinue())
  }

  static toReview() {
    return new CompleteSiteDetails(SiteDetailsConfig.toReviewOnly())
  }

  constructor(config) {
    super()
    this.config = config
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const siteDetails = exemption?.siteDetails

    const taskDelegate = this.createTaskDelegate(siteDetails)
    await actor.attemptsTo(taskDelegate)
  }

  createTaskDelegate(siteDetails) {
    if (this.isFileUploadFlow(siteDetails)) {
      return FileUploadSiteDetailsTask.withConfig(this.config)
    }

    if (this.isMultiSiteFlow(siteDetails)) {
      return MultiSiteSiteDetailsTask.withConfig(this.config)
    }

    return ManualCoordinatesSiteDetailsTask.withConfig(this.config)
  }

  isFileUploadFlow(siteDetails) {
    return siteDetails?.coordinatesEntryMethod === 'file-upload'
  }

  isMultiSiteFlow(siteDetails) {
    return siteDetails?.multipleSitesEnabled === 'yes'
  }
}

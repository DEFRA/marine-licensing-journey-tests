import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import { UploadFileAndContinue } from '../interactions/index.js'
import {
  ActivityDescriptionPageInteractions,
  WhichTypeOfFileDoYouWantToUploadPageInteractions
} from '../page-interactions/index.js'
import BaseSiteDetailsTask from './base-site-details-task.js'
import CompleteActivityDates from './complete.activity.dates.js'

export default class FileUploadSiteDetailsTask extends BaseSiteDetailsTask {
  static withConfig(config) {
    return new FileUploadSiteDetailsTask(config)
  }

  async executeFlow() {
    await this.navigateToSiteDetailsStart()
    await this.selectFileType()
    await this.uploadFile()

    // Only provide dates and description if we don't expect validation errors
    // This is set in the test data factory for error scenarios
    if (!this.siteDetails.expectValidationError) {
      await this.provideActivityDates()
      await this.provideActivityDescription()
      await this.saveIfRequired()
    }
  }

  async selectFileType() {
    await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
      this.browseTheWeb,
      this.siteDetails.fileType
    )
  }

  async uploadFile() {
    if (!this.siteDetails.filePath) {
      expect.fail(ERROR_MESSAGES.MISSING_DATA('File path', 'site details'))
    }

    await this.actor.attemptsTo(
      UploadFileAndContinue.withPath(this.siteDetails.filePath)
    )
  }

  async provideActivityDates() {
    // ML-389: For single site file uploads, provide activity dates directly
    await this.actor.attemptsTo(CompleteActivityDates.now())
  }

  async provideActivityDescription() {
    // ML-390: For single site file uploads, provide activity description directly
    const firstSiteDescription = this.siteDetails.sites[0].activityDescription
    await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
      this.browseTheWeb,
      firstSiteDescription
    )
  }
}

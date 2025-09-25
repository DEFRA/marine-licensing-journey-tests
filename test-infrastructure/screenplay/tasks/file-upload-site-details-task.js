import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import { UploadFileAndContinue } from '../interactions/index.js'
import { WhichTypeOfFileDoYouWantToUploadPageInteractions } from '../page-interactions/index.js'
import BaseSiteDetailsTask from './base-site-details-task.js'

export default class FileUploadSiteDetailsTask extends BaseSiteDetailsTask {
  static withConfig(config) {
    return new FileUploadSiteDetailsTask(config)
  }

  async executeFlow() {
    await this.navigateToSiteDetailsStart()
    await this.selectFileType()
    await this.uploadFile()
    await this.saveIfRequired()
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
}

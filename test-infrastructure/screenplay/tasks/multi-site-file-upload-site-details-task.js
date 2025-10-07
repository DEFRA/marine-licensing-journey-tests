import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import { UploadFileAndContinue } from '../interactions/index.js'
import {
  ActivityDescriptionPageInteractions,
  SameActivityDatesPageInteractions,
  SameActivityDescriptionPageInteractions,
  WhichTypeOfFileDoYouWantToUploadPageInteractions
} from '../page-interactions/index.js'
import BaseSiteDetailsTask from './base-site-details-task.js'
import CompleteActivityDates from './complete.activity.dates.js'

export default class MultiSiteFileUploadSiteDetailsTask extends BaseSiteDetailsTask {
  static withConfig(config) {
    return new MultiSiteFileUploadSiteDetailsTask(config)
  }

  async executeFlow() {
    await this.navigateToSiteDetailsStart()
    await this.selectFileType()
    await this.uploadFile()
    await this.handleActivityDatesPreference()
    await this.handleActivityDescriptionPreference()
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

  async handleActivityDatesPreference() {
    const isSharedActivityDates = this.siteDetails.sameActivityDates === true

    await SameActivityDatesPageInteractions.selectSameActivityDatesAndContinue(
      this.browseTheWeb,
      this.siteDetails.sameActivityDates
    )

    if (isSharedActivityDates) {
      // Enter dates once for all sites
      await this.actor.attemptsTo(CompleteActivityDates.now())
    }
    // If false, dates will be added manually on review page (future feature)
  }

  async handleActivityDescriptionPreference() {
    const isSharedActivityDescription =
      this.siteDetails.sameActivityDescription === true

    await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
      this.browseTheWeb,
      this.siteDetails.sameActivityDescription
    )

    if (isSharedActivityDescription) {
      // Enter description once for all sites
      const firstSiteDescription = this.siteDetails.sites[0].activityDescription
      await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
        this.browseTheWeb,
        firstSiteDescription
      )
    }
    // If false, descriptions will be added manually on review page (future feature)
  }
}

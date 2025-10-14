import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import {
  AddMissingActivityDates,
  AddMissingActivityDescription,
  AddMissingSiteName,
  UploadFileAndContinue
} from '../interactions/index.js'
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
    await this.addMissingDataFromReviewPage()
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
      await this.actor.attemptsTo(CompleteActivityDates.now())
    }
  }

  async handleActivityDescriptionPreference() {
    const isSharedActivityDescription =
      this.siteDetails.sameActivityDescription === true

    await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
      this.browseTheWeb,
      this.siteDetails.sameActivityDescription
    )

    if (isSharedActivityDescription) {
      const firstSiteDescription = this.siteDetails.sites[0].activityDescription
      await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
        this.browseTheWeb,
        firstSiteDescription
      )
    }
    // If false, descriptions will be added manually on review page (ML-364)
  }

  /**
   * ML-364: Add missing site name, dates, and descriptions from Review Site Details page
   * Site names are ALWAYS incomplete for multi-site file uploads
   * Dates/descriptions are only incomplete if sameActivityDates/sameActivityDescription = false
   */
  async addMissingDataFromReviewPage() {
    const hasDifferentDates = this.siteDetails.sameActivityDates === false
    const hasDifferentDescriptions =
      this.siteDetails.sameActivityDescription === false

    const numberOfSites = this.siteDetails.sites.length

    for (let i = 0; i < numberOfSites; i++) {
      const siteNumber = i + 1
      const site = this.siteDetails.sites[i]

      // Site names are always incomplete for multi-site file uploads (ML-364 AC1)
      await this.actor.attemptsTo(
        AddMissingSiteName.forSite(siteNumber, site.siteName)
      )

      // Add activity dates if different dates were selected (ML-364 AC2)
      if (hasDifferentDates) {
        await this.actor.attemptsTo(AddMissingActivityDates.forSite(siteNumber))
      }

      // Add activity description if different descriptions were selected (ML-364 AC3)
      if (hasDifferentDescriptions) {
        await this.actor.attemptsTo(
          AddMissingActivityDescription.forSite(
            siteNumber,
            site.activityDescription
          )
        )
      }
    }
  }
}

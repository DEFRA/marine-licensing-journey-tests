import { expect } from 'chai'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
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

  async addMissingDataFromReviewPage() {
    const hasDifferentDates = this.siteDetails.sameActivityDates === false
    const hasDifferentDescriptions =
      this.siteDetails.sameActivityDescription === false

    const numberOfSites = this.siteDetails.sites.length

    for (let i = 0; i < numberOfSites; i++) {
      const siteNumber = i + 1
      const site = this.siteDetails.sites[i]

      await this.addMissingSiteName(siteNumber, site.siteName)

      if (hasDifferentDates) {
        await this.addMissingActivityDates(siteNumber, site.activityDates)
      }

      if (hasDifferentDescriptions) {
        await this.addMissingActivityDescription(
          siteNumber,
          site.activityDescription
        )
      }
    }
  }

  async addMissingSiteName(siteNumber, siteName) {
    const addLink = await this.browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteNameAddLink(siteNumber)
    )
    await addLink.click()
    await this.browseTheWeb.waitForNavigationTo(
      '/exemption/site-name',
      '#siteName'
    )
    await this.browseTheWeb.setValue('#siteName', siteName)
    await this.browseTheWeb.click('button[type="submit"]')
  }

  async addMissingActivityDates(siteNumber, activityDates) {
    const addLink = await this.browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteActivityDatesAddLink(siteNumber)
    )
    await addLink.click()
    await this.actor.attemptsTo(CompleteActivityDates.now())
  }

  async addMissingActivityDescription(siteNumber, activityDescription) {
    const addLink = await this.browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteActivityDescriptionAddLink(siteNumber)
    )
    await addLink.click()
    await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
      this.browseTheWeb,
      activityDescription
    )
  }

  async saveAndContinueFromReview() {
    const saveButton = await this.browseTheWeb.getElement(
      ReviewSiteDetailsPage.saveAndContinueButton
    )
    await saveButton.click()
  }
}

import {
  SameActivityDatesPageInteractions,
  SameActivityDescriptionPageInteractions,
  SiteDetailsReviewPageInteractions
} from '../page-interactions/index.js'
import BaseSiteDetailsTask from './base-site-details-task.js'
import CompleteActivityDates from './complete.activity.dates.js'
import CompleteActivityDescription from './complete.activity.description.js'
import CompleteSiteName from './complete.site.name.js'
import { CoordinateEntryStrategy } from './coordinate-entry-strategy.js'

export default class MultiSiteSiteDetailsTask extends BaseSiteDetailsTask {
  static withConfig(config) {
    return new MultiSiteSiteDetailsTask(config)
  }

  async executeFlow() {
    await this.navigateToSiteDetailsStart()
    await this.handleSingleOrMultipleSites()
    await this.processSites()
    await this.saveIfRequired()
  }

  async processSites() {
    const sites = this.siteDetails.sites
    const isSharedActivityDates = this.siteDetails.sameActivityDates === true
    const isSharedActivityDescription =
      this.siteDetails.sameActivityDescription === true

    for (let siteIndex = 0; siteIndex < sites.length; siteIndex++) {
      const currentSite = sites[siteIndex]
      const siteNumber = siteIndex + 1
      const isFirstSite = siteIndex === 0
      const isLastSite = siteIndex === sites.length - 1

      await this.actor.attemptsTo(CompleteSiteName.forSite(siteNumber))

      if (isFirstSite) {
        await this.handleFirstSitePreferences(
          isSharedActivityDates,
          isSharedActivityDescription
        )
      }

      if (!isSharedActivityDates) {
        await this.handleSiteSpecificDates(
          siteNumber,
          isFirstSite,
          isSharedActivityDescription
        )
      }

      if (!isSharedActivityDescription) {
        await this.actor.attemptsTo(
          CompleteActivityDescription.forSite(siteNumber)
        )
      }

      const strategy = new CoordinateEntryStrategy(this.browseTheWeb)
      await strategy.enterCoordinates(currentSite, this.config)

      if (!isLastSite) {
        await SiteDetailsReviewPageInteractions.addAnotherSite(
          this.browseTheWeb
        )
      }
    }
  }

  async handleFirstSitePreferences(
    isSharedActivityDates,
    isSharedActivityDescription
  ) {
    await SameActivityDatesPageInteractions.selectSameActivityDatesAndContinue(
      this.browseTheWeb,
      this.siteDetails.sameActivityDates
    )

    if (isSharedActivityDates) {
      await this.actor.attemptsTo(CompleteActivityDates.now())

      await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
        this.browseTheWeb,
        this.siteDetails.sameActivityDescription
      )

      if (isSharedActivityDescription) {
        await this.actor.attemptsTo(CompleteActivityDescription.now())
      }
    }
  }

  async handleSiteSpecificDates(
    siteNumber,
    isFirstSite,
    isSharedActivityDescription
  ) {
    await this.actor.attemptsTo(CompleteActivityDates.forSite(siteNumber))

    if (isFirstSite) {
      await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
        this.browseTheWeb,
        this.siteDetails.sameActivityDescription
      )

      if (isSharedActivityDescription) {
        await this.actor.attemptsTo(CompleteActivityDescription.now())
      }
    }
  }
}

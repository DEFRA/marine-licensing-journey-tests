import {
  ActivityDescriptionPageInteractions,
  SameActivityDatesPageInteractions,
  SameActivityDescriptionPageInteractions,
  SiteDetailsReviewPageInteractions
} from '../page-interactions/index.js'
import BaseSiteDetailsTask from './base-site-details-task.js'
import CompleteActivityDates from './complete.activity.dates.js'
import { CoordinateEntryStrategy } from './coordinate-entry-strategy.js'

export default class MultiSiteSiteDetailsTask extends BaseSiteDetailsTask {
  static withConfig(config) {
    return new MultiSiteSiteDetailsTask(config)
  }

  async executeFlow() {
    await this.navigateToSiteDetailsStart()
    await this.handleSingleOrMultipleSites() // Will select 'yes' for multiple sites
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
      const isFirstSite = siteIndex === 0
      const isLastSite = siteIndex === sites.length - 1

      await this.enterSiteName(currentSite.siteName, isFirstSite)

      if (isFirstSite) {
        await this.handleFirstSitePreferences(
          isSharedActivityDates,
          isSharedActivityDescription
        )
      }

      await this.handleSiteActivityDates(
        currentSite,
        isSharedActivityDates,
        isFirstSite,
        isSharedActivityDescription
      )
      await this.handleSiteActivityDescription(
        currentSite,
        isSharedActivityDescription
      )
      await this.handleSiteCoordinates(currentSite)

      if (!isLastSite) {
        await this.addAnotherSite()
      }
    }
  }

  async enterSiteName(siteName, isFirstSite = false) {
    // For sites after the first, wait for navigation to complete
    if (!isFirstSite) {
      await this.browseTheWeb.waitForNavigationTo(
        '/exemption/site-name',
        '#siteName'
      )
    }

    await this.browseTheWeb.setValue('#siteName', siteName)
    await this.browseTheWeb.click('button[type="submit"]')
  }

  async handleFirstSitePreferences(
    isSharedActivityDates,
    isSharedActivityDescription
  ) {
    await this.selectActivityDatesPreference()

    if (isSharedActivityDates) {
      await this.enterSharedActivityDates()
      await this.selectActivityDescriptionPreference()

      if (isSharedActivityDescription) {
        await this.enterSharedActivityDescription()
      }
    }
  }

  async selectActivityDatesPreference() {
    await SameActivityDatesPageInteractions.selectSameActivityDatesAndContinue(
      this.browseTheWeb,
      this.siteDetails.sameActivityDates
    )
  }

  async enterSharedActivityDates() {
    await this.actor.attemptsTo(CompleteActivityDates.now())
  }

  async selectActivityDescriptionPreference() {
    await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
      this.browseTheWeb,
      this.siteDetails.sameActivityDescription
    )
  }

  async enterSharedActivityDescription() {
    const firstSiteDescription = this.siteDetails.sites[0].activityDescription
    await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
      this.browseTheWeb,
      firstSiteDescription
    )
  }

  async handleSiteActivityDates(
    currentSite,
    isSharedActivityDates,
    isFirstSite,
    isSharedActivityDescription
  ) {
    if (!isSharedActivityDates) {
      await this.enterSiteSpecificActivityDates(currentSite)

      if (isFirstSite) {
        await this.selectActivityDescriptionPreference()

        if (this.siteDetails.sameActivityDescription === true) {
          await this.enterSharedActivityDescription()
        }
      }
    }
  }

  async enterSiteSpecificActivityDates(currentSite) {
    // Temporarily update actor memory with site-specific dates
    const originalActivityDates = this.actor.recalls('exemption').activityDates

    this.actor.updates((exemption) => {
      exemption.activityDates = currentSite.activityDates
    })

    await this.actor.attemptsTo(CompleteActivityDates.now())

    // Restore original activity dates
    this.actor.updates((exemption) => {
      exemption.activityDates = originalActivityDates
    })
  }

  async handleSiteActivityDescription(
    currentSite,
    isSharedActivityDescription
  ) {
    if (!isSharedActivityDescription) {
      await this.browseTheWeb.waitForNavigationTo(
        '/exemption/site-details-activity-description',
        '#activityDescription'
      )
      await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
        this.browseTheWeb,
        currentSite.activityDescription
      )
    }
  }

  async handleSiteCoordinates(currentSite) {
    const strategy = new CoordinateEntryStrategy(this.browseTheWeb)
    await strategy.enterCoordinates(currentSite, this.config)
  }

  async addAnotherSite() {
    await SiteDetailsReviewPageInteractions.addAnotherSite(this.browseTheWeb)
  }
}

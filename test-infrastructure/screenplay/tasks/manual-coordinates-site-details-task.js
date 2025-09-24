import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import {
  ActivityDatesPageInteractions,
  ActivityDescriptionPageInteractions
} from '../page-interactions/index.js'
import BaseSiteDetailsTask from './base-site-details-task.js'
import { CoordinateEntryStrategy } from './coordinate-entry-strategy.js'

export default class ManualCoordinatesSiteDetailsTask extends BaseSiteDetailsTask {
  static withConfig(config) {
    return new ManualCoordinatesSiteDetailsTask(config)
  }

  async executeFlow() {
    await this.navigateToSiteDetailsStart()

    const isMultipleSites = await this.handleSingleOrMultipleSites()

    if (!isMultipleSites) {
      await this.handleSingleSiteFlow()
    }

    await this.handleCoordinateEntry()
    await this.saveIfRequired()
  }

  async handleSingleSiteFlow() {
    const firstSite = this.siteDetails.sites[0]

    await this.enterSiteActivityDates(firstSite)
    await this.enterSiteActivityDescription(firstSite)
  }

  async handleCoordinateEntry() {
    if (this.config.coordinatesOnly || this.config.toReviewOnly) {
      await this.enterCoordinatesOnly()
    } else {
      await this.enterCoordinatesForFirstSite()
    }
  }

  async enterCoordinatesOnly() {
    const firstSite = this.siteDetails.sites[0]
    await this.enterCoordinatesForSite(firstSite)
  }

  async enterCoordinatesForFirstSite() {
    const firstSite = this.siteDetails.sites[0]
    this.validateSiteType(firstSite.siteType)
    await this.enterCoordinatesForSite(firstSite)
  }

  async enterCoordinatesForSite(site) {
    const strategy = new CoordinateEntryStrategy(this.browseTheWeb)
    await strategy.enterCoordinates(site, this.config)
  }

  async enterSiteActivityDates(site) {
    await ActivityDatesPageInteractions.enterActivityDatesAndContinue(
      this.browseTheWeb,
      site.activityDates
    )
  }

  async enterSiteActivityDescription(site) {
    await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
      this.browseTheWeb,
      site.activityDescription
    )
  }

  validateSiteType(siteType) {
    const validTypes = ['circle', 'triangle']
    if (!validTypes.includes(siteType)) {
      expect.fail(ERROR_MESSAGES.INVALID_COORDINATES_METHOD)
    }
  }
}

import { expect } from 'chai'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import BaseSiteDetailsTask from './base-site-details-task.js'
import CompleteActivityDates from './complete.activity.dates.js'
import CompleteActivityDescription from './complete.activity.description.js'
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
    // ML-416: For single manual site entry, provide activity dates directly
    await this.actor.attemptsTo(CompleteActivityDates.now())
  }

  async enterSiteActivityDescription(site) {
    // ML-417: For single manual site entry, provide activity description directly
    await this.actor.attemptsTo(CompleteActivityDescription.now())
  }

  validateSiteType(siteType) {
    const validTypes = ['circle', 'boundary']
    if (!validTypes.includes(siteType)) {
      expect.fail(ERROR_MESSAGES.INVALID_COORDINATES_METHOD)
    }
  }
}

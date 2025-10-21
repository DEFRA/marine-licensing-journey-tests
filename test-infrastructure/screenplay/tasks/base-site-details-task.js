import { expect } from 'chai'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import { ClickButton } from '../interactions/index.js'
import Memory from '../memory.js'
import {
  BeforeYouStartSiteDetailsPageInteractions,
  DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions,
  HowDoYouWantToProvideCoordinatesPageInteractions
} from '../page-interactions/index.js'

export default class BaseSiteDetailsTask extends Task {
  constructor(config) {
    super()
    this.config = config
  }

  async performAs(actor) {
    this.actor = actor
    this.exemption = this.validateTestData(actor)
    this.siteDetails = this.exemption.siteDetails
    this.browseTheWeb = actor.ability

    await this.executeFlow()
  }

  async executeFlow() {
    throw new Error('Subclasses must implement executeFlow method')
  }

  async navigateToSiteDetailsStart() {
    await BeforeYouStartSiteDetailsPageInteractions.clickContinue(
      this.browseTheWeb
    )
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.browseTheWeb,
      this.siteDetails.coordinatesEntryMethod
    )
  }

  async handleSingleOrMultipleSites() {
    const multipleSitesEnabled = this.siteDetails.multipleSitesEnabled === true

    if (multipleSitesEnabled) {
      await DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions.selectMoreThanOneSiteAndContinue(
        this.browseTheWeb,
        'yes'
      )
      return true
    } else {
      await DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions.selectNoAndContinue(
        this.browseTheWeb
      )
      return false
    }
  }

  async saveIfRequired() {
    if (this.config.saveAndContinue) {
      await this.actor.attemptsTo(ClickButton.withText('Continue'))
      this.actor.updates(Memory.markTaskCompleted('siteDetails'))
    }
  }

  validateTestData(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.MISSING_EXEMPTION('site details'))
    }
    if (!exemption.siteDetails) {
      expect.fail(ERROR_MESSAGES.MISSING_DATA('Site details', 'site details'))
    }
    return exemption
  }
}

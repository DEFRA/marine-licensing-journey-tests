import { expect } from 'chai'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import { ClickSaveAndContinue } from '../interactions/index.js'
import Memory from '../memory.js'
import {
  EnterCoordinatesCentrePointPageInteractions,
  EnterMultipleCoordinatesPageInteractions,
  HowDoYouWantToEnterTheCoordinatesPageInteractions,
  HowDoYouWantToProvideCoordinatesPageInteractions,
  WhatCoordinateSystemPageInteractions,
  WidthOfCircularSitePageInteractions
} from '../page-interactions/index.js'

export default class CompleteSiteDetails extends Task {
  static now() {
    return new CompleteSiteDetails()
  }

  static coordinatesOnly() {
    return new CompleteSiteDetails(false, true)
  }

  static andSave() {
    return new CompleteSiteDetails(true, false)
  }

  constructor(saveAndContinue = false, coordinatesOnly = false) {
    super()
    this.saveAndContinue = saveAndContinue
    this.coordinatesOnly = coordinatesOnly
  }

  async performAs(actor) {
    const exemption = this.validateTestData(actor)
    const siteDetails = exemption.siteDetails
    const browseTheWeb = actor.ability

    if (siteDetails.coordinatesEntryMethod === 'file-upload') {
      await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
        browseTheWeb,
        siteDetails.coordinatesEntryMethod
      )
    } else if (this.coordinatesOnly) {
      await this.completePolygonFlow(browseTheWeb, siteDetails)
    } else if (siteDetails.siteType === 'circle') {
      await this.completeCircleFlow(browseTheWeb, siteDetails, actor)

      if (this.saveAndContinue) {
        await actor.attemptsTo(ClickSaveAndContinue.now())
        actor.updates(Memory.markTaskCompleted('siteDetails'))
      }
    } else if (siteDetails.siteType === 'boundary') {
      await this.completePolygonFlow(browseTheWeb, siteDetails)
    } else {
      expect.fail(ERROR_MESSAGES.INVALID_COORDINATES_METHOD)
    }
  }

  async completeCircleFlow(browseTheWeb, siteDetails, actor) {
    await this.completeFlowUpToCoordinates(browseTheWeb, siteDetails)
    await EnterCoordinatesCentrePointPageInteractions.enterCircleCoordinates(
      browseTheWeb,
      siteDetails
    )
    await this.enterWidthOfCircleIfOnWidthPage(browseTheWeb, siteDetails)
  }

  async completePolygonFlow(browseTheWeb, siteDetails) {
    await this.completeFlowUpToCoordinates(browseTheWeb, siteDetails)
    await EnterMultipleCoordinatesPageInteractions.enterPolygonCoordinates(
      browseTheWeb,
      siteDetails
    )
  }

  async completeFlowUpToCoordinates(browseTheWeb, siteDetails) {
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      browseTheWeb,
      siteDetails.coordinatesEntryMethod
    )
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
      browseTheWeb,
      siteDetails.siteType
    )
    await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
      browseTheWeb,
      siteDetails.coordinateSystem
    )
  }

  async enterWidthOfCircleIfOnWidthPage(browseTheWeb, siteDetails) {
    try {
      const widthElement = await browseTheWeb.browser.$('#width')
      await widthElement.waitForExist({ timeout: 1000 })
      await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
        browseTheWeb,
        siteDetails.circleData.width
      )
    } catch {}
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

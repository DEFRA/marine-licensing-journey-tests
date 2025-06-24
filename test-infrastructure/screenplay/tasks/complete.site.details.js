import { expect } from 'chai'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import {
  EnterCoordinatesCentrePointPageInteractions,
  HowDoYouWantToEnterTheCoordinatesPageInteractions,
  HowDoYouWantToProvideCoordinatesPageInteractions,
  WhatCoordinateSystemPageInteractions,
  WidthOfCircularSitePageInteractions
} from '../page-interactions/index.js'

export default class CompleteSiteDetails extends Task {
  static now() {
    return new CompleteSiteDetails()
  }

  async performAs(actor) {
    const exemption = this.validateTestData(actor)
    const siteDetails = exemption.siteDetails
    const browseTheWeb = actor.ability

    if (siteDetails.coordinatesEntryMethod === 'file-upload') {
      await this.completeFileUploadFlow(browseTheWeb, siteDetails, actor)
    } else if (siteDetails.coordinatesEntryMethod === 'enter-manually') {
      await this.completeManualEntryFlow(browseTheWeb, siteDetails)
    } else {
      expect.fail(ERROR_MESSAGES.INVALID_COORDINATES_METHOD)
    }
  }

  async completeManualEntryFlow(browseTheWeb, siteDetails) {
    await this.completeManualEntryFlowUpToCoordinates(browseTheWeb, siteDetails)
    await this.enterWidthOfCircleIfOnWidthPage(browseTheWeb, siteDetails)
  }

  async completeManualEntryFlowUpToCoordinates(browseTheWeb, siteDetails) {
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
    await this.enterCoordinateData(browseTheWeb, siteDetails)
  }

  async enterCoordinateData(browseTheWeb, siteDetails) {
    if (this.isCircleSite(siteDetails)) {
      await EnterCoordinatesCentrePointPageInteractions.enterCircleCoordinates(
        browseTheWeb,
        siteDetails
      )
    }
  }

  isCircleSite(siteDetails) {
    return siteDetails.siteType === 'circle'
  }

  async completeFileUploadFlow(browseTheWeb, siteDetails, actor) {
    // Navigate to file upload by selecting "Upload a file" option
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      browseTheWeb,
      siteDetails.coordinatesEntryMethod
    )

    // Stop here - the test steps will handle the file type selection
    // TODO: When more of the file upload flow is implemented, we can complete the flow here
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

  async enterWidthOfCircle(browseTheWeb, siteDetails) {
    await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
      browseTheWeb,
      siteDetails.circleData.width
    )
  }

  async enterWidthOfCircleIfOnWidthPage(browseTheWeb, siteDetails) {
    try {
      const widthElement = await browseTheWeb.browser.$('#width')
      await widthElement.waitForExist({ timeout: 1000 })
      await this.enterWidthOfCircle(browseTheWeb, siteDetails)
    } catch (error) {
      // Do nothing
    }
  }
}

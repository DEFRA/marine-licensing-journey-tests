import { expect } from 'chai'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import Task from '../base/task.js'

export default class CompleteSiteDetails extends Task {
  static now() {
    return new CompleteSiteDetails()
  }

  async performAs(actor) {
    const exemption = this.validateTestData(actor)
    const siteDetails = exemption.siteDetails
    const browseTheWeb = actor.ability

    if (siteDetails.coordinatesEntryMethod === 'file-upload') {
      await this.completeFileUploadFlow(browseTheWeb, siteDetails)
    } else if (siteDetails.coordinatesEntryMethod === 'enter-manually') {
      await this.completeManualEntryFlow(browseTheWeb, siteDetails)
    } else {
      expect.fail(ERROR_MESSAGES.INVALID_COORDINATES_METHOD)
    }
  }

  async completeManualEntryFlow(browseTheWeb, siteDetails) {
    await browseTheWeb.click(
      HowDoYouWantToProvideCoordinatesPage.getCoordinatesInputMethodSelector(
        siteDetails.coordinatesEntryMethod
      )
    )
    await browseTheWeb.click(
      HowDoYouWantToProvideCoordinatesPage.saveAndContinue
    )

    await browseTheWeb.click(
      HowDoYouWantToEnterTheCoordinatesPage.getSiteTypeSelector(
        siteDetails.siteType
      )
    )
    await browseTheWeb.click(
      HowDoYouWantToEnterTheCoordinatesPage.saveAndContinue
    )
    await browseTheWeb.click(
      WhatCoordinateSystemPage.getCoordinateSystemSelector(
        siteDetails.coordinateSystem
      )
    )
    await browseTheWeb.click(
      HowDoYouWantToEnterTheCoordinatesPage.saveAndContinue
    )
  }

  async completeFileUploadFlow(browseTheWeb, siteDetails) {
    await Promise.resolve()
    expect.fail(ERROR_MESSAGES.FILE_UPLOAD_NOT_IMPLEMENTED)
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

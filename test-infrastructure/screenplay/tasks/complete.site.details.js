import { expect } from 'chai'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import EnterCoordinatesCentrePointPage from '~/test-infrastructure/pages/enter.coordinates.centre.point.js'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
import WhatCoordinateSystemPage from '~/test-infrastructure/pages/what.coordinate.system.page.js'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'

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
    await this.selectCoordinatesInputMethod(browseTheWeb, siteDetails)
    await this.selectSiteType(browseTheWeb, siteDetails)
    await this.selectCoordinateSystem(browseTheWeb, siteDetails)
    await this.enterCoordinateData(browseTheWeb, siteDetails)
  }

  async selectCoordinatesInputMethod(browseTheWeb, siteDetails) {
    await this.selectOptionAndContinue(
      browseTheWeb,
      HowDoYouWantToProvideCoordinatesPage.getCoordinatesInputMethodSelector(
        siteDetails.coordinatesEntryMethod
      ),
      HowDoYouWantToProvideCoordinatesPage.saveAndContinue
    )
  }

  async selectSiteType(browseTheWeb, siteDetails) {
    await this.selectOptionAndContinue(
      browseTheWeb,
      HowDoYouWantToEnterTheCoordinatesPage.getSiteTypeSelector(
        siteDetails.siteType
      ),
      HowDoYouWantToEnterTheCoordinatesPage.saveAndContinue
    )
  }

  async selectCoordinateSystem(browseTheWeb, siteDetails) {
    await this.selectOptionAndContinue(
      browseTheWeb,
      WhatCoordinateSystemPage.getCoordinateSystemSelector(
        siteDetails.coordinateSystem
      ),
      HowDoYouWantToEnterTheCoordinatesPage.saveAndContinue
    )
  }

  async enterCoordinateData(browseTheWeb, siteDetails) {
    if (this.isCircleSite(siteDetails)) {
      await this.enterCircleCoordinates(browseTheWeb, siteDetails)
    }
  }

  async enterCircleCoordinates(browseTheWeb, siteDetails) {
    const coordinateMapping = this.getCoordinateFieldMapping(
      siteDetails.coordinateSystem
    )
    const siteCoordinateData = siteDetails.circleData

    await this.enterCoordinatePair(browseTheWeb, [
      {
        input: coordinateMapping.primaryCoordinate.inputSelector,
        value:
          siteCoordinateData[coordinateMapping.primaryCoordinate.dataProperty]
      },
      {
        input: coordinateMapping.secondaryCoordinate.inputSelector,
        value:
          siteCoordinateData[coordinateMapping.secondaryCoordinate.dataProperty]
      }
    ])
  }

  getCoordinateFieldMapping(coordinateSystem) {
    const coordinateSystemMappings = {
      WGS84: {
        primaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.latitudeInput,
          dataProperty: 'latitude'
        },
        secondaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.longitudeInput,
          dataProperty: 'longitude'
        }
      },
      OSGB36: {
        primaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.eastingsInput,
          dataProperty: 'eastings'
        },
        secondaryCoordinate: {
          inputSelector: EnterCoordinatesCentrePointPage.northingsInput,
          dataProperty: 'northings'
        }
      }
    }

    const mapping = coordinateSystemMappings[coordinateSystem]
    if (!mapping) {
      expect.fail(`Unsupported coordinate system: ${coordinateSystem}`)
    }

    return mapping
  }

  async selectOptionAndContinue(browseTheWeb, optionSelector, continueButton) {
    await browseTheWeb.click(optionSelector)
    await browseTheWeb.click(continueButton)
  }

  async enterCoordinatePair(browseTheWeb, coordinateInputs) {
    for (const coordinate of coordinateInputs) {
      await browseTheWeb.sendKeys(coordinate.input, coordinate.value)
    }
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)
  }

  isCircleSite(siteDetails) {
    return siteDetails.siteType === 'circle'
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

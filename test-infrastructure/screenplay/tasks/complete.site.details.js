import { expect } from 'chai'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import {
  ClickSaveAndContinue,
  UploadFileAndContinue
} from '../interactions/index.js'
import Memory from '../memory.js'
import {
  EnterCoordinatesCentrePointPageInteractions,
  EnterMultipleCoordinatesPageInteractions,
  HowDoYouWantToEnterTheCoordinatesPageInteractions,
  HowDoYouWantToProvideCoordinatesPageInteractions,
  WhatCoordinateSystemPageInteractions,
  WhichTypeOfFileDoYouWantToUploadPageInteractions,
  WidthOfCircularSitePageInteractions
} from '../page-interactions/index.js'

export default class CompleteSiteDetails extends Task {
  static now() {
    return new CompleteSiteDetails()
  }

  static coordinatesOnly() {
    return new CompleteSiteDetails(false, true)
  }

  static coordinatesWithAddAnotherPoint() {
    return new CompleteSiteDetails(false, true, true)
  }

  static andSave() {
    return new CompleteSiteDetails(true, false)
  }

  constructor(
    saveAndContinue = false,
    coordinatesOnly = false,
    useAddAnotherPoint = false
  ) {
    super()
    this.saveAndContinue = saveAndContinue
    this.coordinatesOnly = coordinatesOnly
    this.useAddAnotherPoint = useAddAnotherPoint
  }

  async performAs(actor) {
    this.actor = actor
    this.exemption = this.validateTestData(actor)
    this.siteDetails = this.exemption.siteDetails
    this.browseTheWeb = actor.ability

    if (this.siteDetails.coordinatesEntryMethod === 'file-upload') {
      await this.completeFileUploadFlow()
    } else if (this.coordinatesOnly) {
      await this.completePolygonFlow()
    } else {
      await this.completeManualCoordinatesFlow()
    }
  }

  async completeFileUploadFlow() {
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.browseTheWeb,
      this.siteDetails.coordinatesEntryMethod
    )

    await WhichTypeOfFileDoYouWantToUploadPageInteractions.selectFileTypeAndContinue(
      this.browseTheWeb,
      this.siteDetails.fileType
    )

    if (this.siteDetails.filePath) {
      await this.actor.attemptsTo(
        UploadFileAndContinue.withPath(this.siteDetails.filePath)
      )
    } else {
      expect.fail(ERROR_MESSAGES.MISSING_DATA('File path', 'site details'))
    }

    if (this.saveAndContinue) {
      await this.actor.attemptsTo(ClickSaveAndContinue.now())
      this.actor.updates(Memory.markTaskCompleted('siteDetails'))
    }
  }

  async completeManualCoordinatesFlow() {
    if (this.siteDetails.siteType === 'circle') {
      await this.completeCircleFlow()
      if (this.saveAndContinue) {
        await this.actor.attemptsTo(ClickSaveAndContinue.now())
        this.actor.updates(Memory.markTaskCompleted('siteDetails'))
      }
    } else if (this.siteDetails.siteType === 'boundary') {
      await this.completePolygonFlow()
    } else {
      expect.fail(ERROR_MESSAGES.INVALID_COORDINATES_METHOD)
    }
  }

  async completeCircleFlow() {
    await this.completeFlowUpToCoordinates()
    await EnterCoordinatesCentrePointPageInteractions.enterCircleCoordinates(
      this.browseTheWeb,
      this.siteDetails
    )
    await this.enterWidthOfCircleIfOnWidthPage()
  }

  async completePolygonFlow() {
    await this.completeFlowUpToCoordinates()
    await EnterMultipleCoordinatesPageInteractions.enterPolygonCoordinates(
      this.browseTheWeb,
      this.siteDetails,
      this.useAddAnotherPoint
    )
  }

  async completeFlowUpToCoordinates() {
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.browseTheWeb,
      this.siteDetails.coordinatesEntryMethod
    )
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
      this.browseTheWeb,
      this.siteDetails.siteType
    )
    await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
      this.browseTheWeb,
      this.siteDetails.coordinateSystem
    )
  }

  async enterWidthOfCircleIfOnWidthPage() {
    try {
      const widthElement = await this.browseTheWeb.browser.$('#width')
      await widthElement.waitForExist({ timeout: 1000 })
      await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
        this.browseTheWeb,
        this.siteDetails.circleData.width
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

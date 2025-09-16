import { expect } from 'chai'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import {
  ClickSaveAndContinue,
  UploadFileAndContinue
} from '../interactions/index.js'
import Memory from '../memory.js'
import {
  ActivityDatesPageInteractions,
  ActivityDescriptionPageInteractions,
  BeforeYouStartSiteDetailsPageInteractions,
  DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions,
  EnterCoordinatesCentrePointPageInteractions,
  EnterMultipleCoordinatesPageInteractions,
  HowDoYouWantToEnterTheCoordinatesPageInteractions,
  HowDoYouWantToProvideCoordinatesPageInteractions,
  SameActivityDatesPageInteractions,
  SameActivityDescriptionPageInteractions,
  SiteDetailsReviewPageInteractions,
  WhatCoordinateSystemPageInteractions,
  WhichTypeOfFileDoYouWantToUploadPageInteractions,
  WidthOfCircularSitePageInteractions
} from '../page-interactions/index.js'
import CompleteActivityDates from './complete.activity.dates.js'

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

  static toReview() {
    return new CompleteSiteDetails(false, false, false, true)
  }

  constructor(
    saveAndContinue = false,
    coordinatesOnly = false,
    useAddAnotherPoint = false,
    toReviewOnly = false
  ) {
    super()
    this.saveAndContinue = saveAndContinue
    this.coordinatesOnly = coordinatesOnly
    this.useAddAnotherPoint = useAddAnotherPoint
    this.toReviewOnly = toReviewOnly
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
    } else if (this.toReviewOnly) {
      await this.completePolygonToReviewFlow()
    } else {
      await this.completeManualCoordinatesFlow()
    }
  }

  async completeFileUploadFlow() {
    await BeforeYouStartSiteDetailsPageInteractions.clickContinue(
      this.browseTheWeb
    )
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

      if (this.saveAndContinue) {
        await this.actor.attemptsTo(ClickSaveAndContinue.now())
        this.actor.updates(Memory.markTaskCompleted('siteDetails'))
      }
    } else {
      expect.fail(ERROR_MESSAGES.MISSING_DATA('File path', 'site details'))
    }
  }

  async completeManualCoordinatesFlow() {
    if (this.siteDetails.siteType === 'circle') {
      await this.completeCircleFlow()
    } else if (this.siteDetails.siteType === 'triangle') {
      await this.completePolygonFlow()
    } else {
      expect.fail(ERROR_MESSAGES.INVALID_COORDINATES_METHOD)
    }

    await this._saveIfRequired()
  }

  async _saveIfRequired() {
    if (this.saveAndContinue) {
      await this.actor.attemptsTo(ClickSaveAndContinue.now())
      this.actor.updates(Memory.markTaskCompleted('siteDetails'))
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
    await EnterMultipleCoordinatesPageInteractions.enterPolygonCoordinatesAndContinue(
      this.browseTheWeb,
      this.siteDetails,
      this.useAddAnotherPoint
    )
  }

  async completePolygonToReviewFlow() {
    await this.completeFlowUpToCoordinates()
    await EnterMultipleCoordinatesPageInteractions.enterPolygonCoordinatesAndContinue(
      this.browseTheWeb,
      this.siteDetails,
      this.useAddAnotherPoint
    )
  }

  async completeFlowUpToCoordinates() {
    await BeforeYouStartSiteDetailsPageInteractions.clickContinue(
      this.browseTheWeb
    )
    await HowDoYouWantToProvideCoordinatesPageInteractions.selectCoordinatesInputMethodAndContinue(
      this.browseTheWeb,
      this.siteDetails.coordinatesEntryMethod
    )

    if (this.siteDetails.multipleSitesEnabled === 'yes') {
      await DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions.selectMoreThanOneSiteAndContinue(
        this.browseTheWeb,
        'yes'
      )
      await this.handleMultiSiteFlow()
      return
    } else {
      await DoYouNeedToTellUsAboutMoreThanOneSitePageInteractions.selectNoAndContinue(
        this.browseTheWeb
      )
      await this.handleSingleSiteActivityDates()
    }

    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
      this.browseTheWeb,
      this.siteDetails.siteType
    )
    await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
      this.browseTheWeb,
      this.siteDetails.coordinateSystem
    )
  }

  async handleMultiSiteFlow() {
    const isSharedActivityDates = this.siteDetails.sameActivityDates === 'yes'
    const isSharedActivityDescription =
      this.siteDetails.sameActivityDescription === 'yes'

    for (
      let siteIndex = 0;
      siteIndex < this.siteDetails.sites.length;
      siteIndex++
    ) {
      const currentSite = this.siteDetails.sites[siteIndex]
      const isFirstSite = siteIndex === 0
      const isLastSite = siteIndex === this.siteDetails.sites.length - 1

      await this.browseTheWeb.setValue('#siteName', currentSite.siteName)
      await this.browseTheWeb.click('button[type="submit"]')

      if (isFirstSite) {
        await SameActivityDatesPageInteractions.selectSameActivityDatesAndContinue(
          this.browseTheWeb,
          this.siteDetails.sameActivityDates
        )
      }

      if (isSharedActivityDates && isFirstSite) {
        await this.actor.attemptsTo(CompleteActivityDates.now())
      } else if (!isSharedActivityDates) {
        const originalActivityDates =
          this.actor.recalls('exemption').activityDates
        this.actor.updates((exemption) => {
          exemption.activityDates = currentSite.activityDates
        })
        await this.actor.attemptsTo(CompleteActivityDates.now())
        this.actor.updates((exemption) => {
          exemption.activityDates = originalActivityDates
        })
      }

      if (isFirstSite) {
        await SameActivityDescriptionPageInteractions.selectSameActivityDescriptionAndContinue(
          this.browseTheWeb,
          this.siteDetails.sameActivityDescription
        )
      }

      if (isSharedActivityDescription && isFirstSite) {
        await this.handleMultiSiteActivityDescription()
      } else if (!isSharedActivityDescription) {
        await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
          this.browseTheWeb,
          currentSite.activityDescription
        )
      }

      await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
        this.browseTheWeb,
        currentSite.siteType
      )
      await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
        this.browseTheWeb,
        currentSite.coordinateSystem
      )

      if (currentSite.siteType === 'circle') {
        await EnterCoordinatesCentrePointPageInteractions.enterCircleCoordinates(
          this.browseTheWeb,
          currentSite
        )
        await this.enterWidthOfCircleIfOnWidthPage(currentSite)
      } else {
        await EnterMultipleCoordinatesPageInteractions.enterPolygonCoordinatesAndContinue(
          this.browseTheWeb,
          currentSite,
          false
        )
      }

      if (!isLastSite) {
        await SiteDetailsReviewPageInteractions.addAnotherSite(
          this.browseTheWeb
        )
      }
    }
  }

  async handleMultiSiteActivityDescription() {
    if (this.siteDetails.activityDescription) {
      await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
        this.browseTheWeb,
        this.siteDetails.activityDescription
      )
    } else {
      await ActivityDescriptionPageInteractions.clickContinue(this.browseTheWeb)
    }
  }

  async handleSingleSiteActivityDates() {
    if (this.siteDetails.activityDates) {
      await ActivityDatesPageInteractions.enterActivityDatesAndContinue(
        this.browseTheWeb,
        this.siteDetails.activityDates
      )
    } else {
      await ActivityDatesPageInteractions.clickContinue(this.browseTheWeb)
    }
    await this.handleSingleSiteActivityDescription()
  }

  async handleSingleSiteActivityDescription() {
    if (this.siteDetails.activityDescription) {
      await ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue(
        this.browseTheWeb,
        this.siteDetails.activityDescription
      )
    } else {
      await ActivityDescriptionPageInteractions.clickContinue(this.browseTheWeb)
    }
  }

  async enterWidthOfCircleIfOnWidthPage(site = null) {
    try {
      const widthElement = await this.browseTheWeb.browser.$('#width')
      await widthElement.waitForExist({ timeout: 1000 })
      const width = site
        ? site.circleData.width
        : this.siteDetails.circleData.width
      await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
        this.browseTheWeb,
        width
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

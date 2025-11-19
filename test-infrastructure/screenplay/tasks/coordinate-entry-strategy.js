import {
  EnterCoordinatesCentrePointPageInteractions,
  EnterMultipleCoordinatesPageInteractions,
  HowDoYouWantToEnterTheCoordinatesPageInteractions,
  WhatCoordinateSystemPageInteractions,
  WidthOfCircularSitePageInteractions
} from '../page-interactions/index.js'

export class CoordinateEntryStrategy {
  constructor(browseTheWeb) {
    this.browseTheWeb = browseTheWeb
  }

  async enterCoordinates(siteDetails, config = {}) {
    await this.selectSiteType(siteDetails.siteType)
    await this.selectCoordinateSystem(siteDetails.coordinateSystem)
    await this.performCoordinateEntry(siteDetails, config)
  }

  async selectSiteType(siteType) {
    await HowDoYouWantToEnterTheCoordinatesPageInteractions.selectSiteTypeAndContinue(
      this.browseTheWeb,
      siteType
    )
  }

  async selectCoordinateSystem(coordinateSystem) {
    await WhatCoordinateSystemPageInteractions.selectCoordinateSystemAndContinue(
      this.browseTheWeb,
      coordinateSystem
    )
  }

  async performCoordinateEntry(siteDetails, config) {
    if (siteDetails.siteType === 'circle') {
      await this.enterCircleCoordinates(siteDetails)
    } else {
      await this.enterPolygonCoordinates(siteDetails, config)
    }
  }

  async enterCircleCoordinates(siteDetails) {
    await EnterCoordinatesCentrePointPageInteractions.enterCircleCoordinates(
      this.browseTheWeb,
      siteDetails
    )
    await this.enterCircleWidthIfRequired(siteDetails)
  }

  async enterPolygonCoordinates(siteDetails, config) {
    const useAddAnotherPoint =
      config.useAddAnotherPoint || this.shouldUseAddAnotherPoint(siteDetails)
    await EnterMultipleCoordinatesPageInteractions.enterPolygonCoordinatesAndContinue(
      this.browseTheWeb,
      siteDetails,
      useAddAnotherPoint
    )
  }

  shouldUseAddAnotherPoint(siteDetails) {
    const coordinateCount = siteDetails.polygonData?.coordinates?.length || 0
    return coordinateCount > 3
  }

  async enterCircleWidthIfRequired(siteDetails) {
    try {
      const widthElement = await this.browseTheWeb.browser.$('#width')
      await widthElement.waitForExist({ timeout: 1000 })

      const width = siteDetails.circleData?.width
      await WidthOfCircularSitePageInteractions.enterWidthOfCircleAndContinue(
        this.browseTheWeb,
        width || ''
      )
    } catch {
      // Width page not present - continue without entering width
    }
  }
}

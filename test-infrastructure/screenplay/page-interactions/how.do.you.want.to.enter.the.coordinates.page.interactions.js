import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import HowDoYouWantToEnterTheCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.enter.the.coordinates.page.js'

export default class HowDoYouWantToEnterTheCoordinatesPageInteractions {
  static async selectSiteTypeAndContinue(browseTheWeb, siteType) {
    const selector =
      HowDoYouWantToEnterTheCoordinatesPage.getSiteTypeSelector(siteType)
    await browseTheWeb.click(selector)
    await browseTheWeb.click(
      HowDoYouWantToEnterTheCoordinatesPage.saveAndContinue
    )
  }

  static async selectCircularSiteAndContinue(browseTheWeb) {
    await browseTheWeb.click(HowDoYouWantToEnterTheCoordinatesPage.circularSite)
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)
  }
}

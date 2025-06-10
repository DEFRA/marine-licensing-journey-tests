import WidthOfCircularSitePage from '~/test-infrastructure/pages/width.of.circular.site.page.js'

export default class WidthOfCircularSitePageInteractions {
  static async enterWidthOfCircleAndContinue(browseTheWeb, circleWidth) {
    const selector = WidthOfCircularSitePage.widthInput
    await browseTheWeb.sendKeys(selector, circleWidth)
    await browseTheWeb.click(WidthOfCircularSitePage.saveAndContinueButton)
  }
}

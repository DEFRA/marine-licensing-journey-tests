import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import WidthOfCircularSitePage from '../../pages/width.of.circular.site.page.js'
import Task from '../base/task.js'

export default class ChangeCircleWidth extends Task {
  static now() {
    return new ChangeCircleWidth()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const browseTheWeb = actor.ability
    const newWidth = Math.floor(Math.random() * 50) + 10

    if (exemption.siteDetails?.sites?.[0]) {
      exemption.siteDetails.sites[0].circleWidth = newWidth
    }

    await browseTheWeb.click(
      ReviewSiteDetailsPage.widthValue +
        '/following-sibling::dd//a[text()="Change"]'
    )
    await browseTheWeb.sendKeys(
      WidthOfCircularSitePage.widthInput,
      newWidth.toString()
    )
    await browseTheWeb.click(WidthOfCircularSitePage.saveAndContinueButton)
  }
}

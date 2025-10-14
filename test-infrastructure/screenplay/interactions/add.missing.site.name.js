import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import SiteNamePage from '../../pages/site.name.page.js'
import Task from '../base/task.js'

export default class AddMissingSiteName extends Task {
  constructor(siteNumber, siteName) {
    super()
    this.siteNumber = siteNumber
    this.siteName = siteName
  }

  static forSite(siteNumber, siteName) {
    return new AddMissingSiteName(siteNumber, siteName)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    const addLink = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteNameAddLink(this.siteNumber)
    )
    await addLink.click()

    await browseTheWeb.waitForNavigationTo(
      SiteNamePage.url,
      SiteNamePage.siteNameInput
    )
    await browseTheWeb.setValue(SiteNamePage.siteNameInput, this.siteName)
    await browseTheWeb.click(SiteNamePage.saveAndContinue)
  }
}

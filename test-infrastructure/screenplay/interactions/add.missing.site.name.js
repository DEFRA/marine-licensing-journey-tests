import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import CompleteSiteName from '../tasks/complete.site.name.js'

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

    // Update the actor's memory with the site name for this site
    actor.updates((exemption) => {
      if (!exemption.siteDetails?.sites?.[this.siteNumber - 1]) {
        throw new Error(`Site ${this.siteNumber} does not exist in exemption`)
      }
      exemption.siteDetails.sites[this.siteNumber - 1].siteName = this.siteName
    })

    const addLink = await browseTheWeb.getElement(
      ReviewSiteDetailsPage.getSiteNameAddLink(this.siteNumber)
    )
    await addLink.click()

    await actor.attemptsTo(CompleteSiteName.forSite(this.siteNumber))
  }
}

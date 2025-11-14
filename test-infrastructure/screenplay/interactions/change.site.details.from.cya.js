import CheckYourAnswersPage from '../../pages/check.your.answers.page.js'
import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import CompleteSiteName from '../tasks/complete.site.name.js'
import { Click, ClickButton } from './index.js'

export default class ChangeSiteDetails extends Task {
  constructor(siteNumber) {
    super()
    this.siteNumber = siteNumber
  }

  static fromCheckYourAnswers(siteNumber) {
    return new ChangeSiteDetails(siteNumber)
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const { faker } = await import('@faker-js/faker')
    const siteIndex = this.siteNumber - 1
    const newSiteName = faker.location.city()

    exemption.siteDetails.sites[siteIndex].siteName = newSiteName

    const totalSites = exemption.siteDetails.sites?.length || 1

    await actor.attemptsTo(
      Click.on(
        CheckYourAnswersPage.getSiteDetailsCardChangeLink(
          this.siteNumber,
          totalSites
        )
      )
    )
    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.getSiteNameChangeLink(this.siteNumber))
    )
    await actor.attemptsTo(CompleteSiteName.forSite(this.siteNumber))
    await actor.attemptsTo(ClickButton.withText('Continue'))
  }
}

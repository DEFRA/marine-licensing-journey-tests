import { expect } from 'chai'
import SiteNamePage from '~/test-infrastructure/pages/site.name.page.js'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import { SiteNamePageInteractions } from '../page-interactions/index.js'

export default class CompleteSiteName extends Task {
  constructor(siteNumber = 1) {
    super()
    this.siteNumber = siteNumber
  }

  static now() {
    return new CompleteSiteName(1)
  }

  static forSite(siteNumber) {
    return new CompleteSiteName(siteNumber)
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.MISSING_EXEMPTION('site name'))
    }

    const siteIndex = this.siteNumber - 1
    const siteName = exemption.siteDetails?.sites?.[siteIndex]?.siteName

    if (!siteName) {
      expect.fail(ERROR_MESSAGES.MISSING_DATA('Site name', 'site details'))
    }

    const browseTheWeb = actor.ability

    // Wait for navigation if needed (the task calling this should handle navigation timing)
    // For sites after the first, we expect the navigation to already be in progress
    if (this.siteNumber > 1) {
      await browseTheWeb.waitForNavigationTo(
        `/${SiteNamePage.url}`,
        SiteNamePage.siteNameInput
      )
    }

    await SiteNamePageInteractions.enterSiteNameAndContinue(
      browseTheWeb,
      siteName
    )
  }
}

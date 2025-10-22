import SiteNamePage from '~/test-infrastructure/pages/site.name.page.js'

export default class SiteNamePageInteractions {
  static async enterSiteNameAndContinue(browseTheWeb, siteName) {
    await browseTheWeb.setValue(SiteNamePage.siteNameInput, siteName)
    await browseTheWeb.click(SiteNamePage.saveAndContinue)
  }
}

import BeforeYouStartSiteDetailsPage from '~/test-infrastructure/pages/before.you.start.site.details.page.js'

export default class BeforeYouStartSiteDetailsPageInteractions {
  static async clickContinue(browseTheWeb) {
    await browseTheWeb.click(BeforeYouStartSiteDetailsPage.continueButton)
  }
}

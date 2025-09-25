export default class SiteDetailsReviewPageInteractions {
  static async addAnotherSite(browseTheWeb) {
    await browseTheWeb.click('button[name="add"]')
  }
}

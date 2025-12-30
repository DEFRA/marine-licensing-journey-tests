// Reuses locators from test-infrastructure/pages/do.you.need.to.tell.us.about.more.than.one.site.page.js
export class DoYouNeedToTellUsAboutMoreThanOneSitePage {
  static selectors = {
    yes: '#multipleSitesEnabled',
    no: '#multipleSitesEnabled-2',
    saveAndContinue: 'button[type="submit"]'
  }

  static async selectYes(page) {
    await page.check(this.selectors.yes)
  }

  static async selectNo(page) {
    await page.check(this.selectors.no)
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

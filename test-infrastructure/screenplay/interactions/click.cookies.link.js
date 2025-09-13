import FooterPage from '~/test-infrastructure/pages/footer.page.js'
import Task from '../base/task.js'

export default class ClickCookiesLink extends Task {
  static now() {
    return new ClickCookiesLink()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isDisplayed(FooterPage.locators.cookiesLink)
    await browseTheWeb.click(FooterPage.locators.cookiesLink)
  }
}

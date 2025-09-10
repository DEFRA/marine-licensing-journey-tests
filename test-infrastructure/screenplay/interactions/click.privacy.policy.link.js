import FooterPage from '~/test-infrastructure/pages/footer.page.js'
import Task from '../base/task.js'

export default class ClickPrivacyPolicyLink extends Task {
  static now() {
    return new ClickPrivacyPolicyLink()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.isDisplayed(FooterPage.locators.privacyLink)
    const element = await browseTheWeb.getElement(
      FooterPage.locators.privacyLink
    )
    await element.scrollIntoView()
    await browseTheWeb.click(FooterPage.locators.privacyLink)
  }
}

import HeaderPage from '~/test-infrastructure/pages/header.page.js'
import Task from '../base/task.js'

export default class ClickDefraAccount extends Task {
  static now() {
    return new ClickDefraAccount()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(HeaderPage.locators.defraAccountLink)
  }
}

import Task from '../base/task.js'
import WithdrawProjectPage from '../../pages/withdraw.project.page.js'

export default class EnsureWithdrawPage extends Task {
  #check

  constructor(check) {
    super()
    this.#check = check
  }

  static hasCorrectHeading(expectedHeading) {
    return new EnsureWithdrawPage({ type: 'heading', expectedHeading })
  }

  static hasLink(linkName) {
    return new EnsureWithdrawPage({ type: 'link', linkName })
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    switch (this.#check.type) {
      case 'heading':
        await browseTheWeb.expectElementToContainText(
          WithdrawProjectPage.locators.pageHeading,
          this.#check.expectedHeading
        )
        break
      case 'link':
        if (this.#check.linkName === 'Cancel') {
          await browseTheWeb.isDisplayed(
            WithdrawProjectPage.locators.cancelLink
          )
        } else if (this.#check.linkName === 'Back') {
          await browseTheWeb.isDisplayed(WithdrawProjectPage.locators.backLink)
        }
        break
    }
  }
}

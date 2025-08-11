import DefraAccountPage from '~/test-infrastructure/pages/defra.account.page.js'
import Task from '../base/task.js'

export default class EnsureDefraAccountPage extends Task {
  static isDisplayed() {
    return new EnsureDefraAccountPage()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.expectElementToContainText(
      DefraAccountPage.locators.pageHeading,
      DefraAccountPage.expectedContent.pageTitle
    )

    await browseTheWeb.expectElementToContainText(
      DefraAccountPage.locators.yourAccountsHeading,
      DefraAccountPage.expectedContent.yourAccountsSection
    )

    await browseTheWeb.expectElementToBePresent(
      DefraAccountPage.locators.marineLicensingServiceLink
    )
  }
}

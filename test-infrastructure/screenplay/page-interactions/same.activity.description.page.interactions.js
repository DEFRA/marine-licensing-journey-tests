import SameActivityDescriptionPage from '~/test-infrastructure/pages/same.activity.description.page.js'

export default class SameActivityDescriptionPageInteractions {
  static async selectSameActivityDescriptionAndContinue(
    browseTheWeb,
    sameActivityDescription
  ) {
    const selector = sameActivityDescription
      ? SameActivityDescriptionPage.locators.yesRadioButton
      : SameActivityDescriptionPage.locators.noRadioButton

    await browseTheWeb.click(selector)
    await browseTheWeb.click(
      SameActivityDescriptionPage.locators.continueButton
    )
  }
}

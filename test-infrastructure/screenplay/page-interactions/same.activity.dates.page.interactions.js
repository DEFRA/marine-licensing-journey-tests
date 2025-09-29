import SameActivityDatesPage from '~/test-infrastructure/pages/same.activity.dates.page.js'

export default class SameActivityDatesPageInteractions {
  static async selectSameActivityDatesAndContinue(
    browseTheWeb,
    sameActivityDates
  ) {
    const selector = sameActivityDates
      ? SameActivityDatesPage.locators.yesRadioButton
      : SameActivityDatesPage.locators.noRadioButton

    await browseTheWeb.click(selector)
    await browseTheWeb.click(SameActivityDatesPage.locators.continueButton)
  }
}

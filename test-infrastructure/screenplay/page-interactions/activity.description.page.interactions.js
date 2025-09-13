import ActivityDescriptionPage from '~/test-infrastructure/pages/activity.description.page.js'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'

export default class ActivityDescriptionPageInteractions {
  static async enterActivityDescriptionAndContinue(
    browseTheWeb,
    activityDescription
  ) {
    await browseTheWeb.setValue(
      ActivityDescriptionPage.activityDescriptionInput,
      activityDescription
    )
    await browseTheWeb.click(CommonElementsPage.submitButton)
  }

  static async clickContinue(browseTheWeb) {
    await browseTheWeb.click(CommonElementsPage.submitButton)
  }

  static async clickBack(browseTheWeb) {
    await browseTheWeb.click(CommonElementsPage.backLink)
  }

  static async clickCancel(browseTheWeb) {
    await browseTheWeb.click(CommonElementsPage.cancelLink)
  }
}

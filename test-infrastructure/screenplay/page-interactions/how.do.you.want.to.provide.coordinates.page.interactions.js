import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page.js'

export default class HowDoYouWantToProvideCoordinatesPageInteractions {
  static async selectCoordinatesInputMethodAndContinue(
    browseTheWeb,
    coordinatesInputMethod
  ) {
    const selector =
      HowDoYouWantToProvideCoordinatesPage.getCoordinatesInputMethodSelector(
        coordinatesInputMethod
      )
    await browseTheWeb.click(selector)
    await browseTheWeb.click(
      HowDoYouWantToProvideCoordinatesPage.saveAndContinue
    )
  }

  static async navigateToCoordinatesEntryMethod(browseTheWeb) {
    await browseTheWeb.click(
      HowDoYouWantToProvideCoordinatesPage.enterCoordinates
    )
    await browseTheWeb.click(CommonElementsPage.saveAndContinueButton)
  }
}

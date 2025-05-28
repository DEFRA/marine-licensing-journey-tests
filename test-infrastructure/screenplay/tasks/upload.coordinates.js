import { expect } from 'chai'
import HowDoYouWantToProvideCoordinatesPage from '~/test-infrastructure/pages/how.do.you.want.to.provide.coordinates.page'
import Task from '../base/task.js'

export default class UploadCoordinates extends Task {
  static now() {
    return new UploadCoordinates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(
        'Exemption data must be initialized before completing project name'
      )
    }
    const browseTheWeb = actor.ability
    await browseTheWeb.click(
      HowDoYouWantToProvideCoordinatesPage.uploadCoordinates
    )
    await browseTheWeb.click(
      HowDoYouWantToProvideCoordinatesPage.saveAndContinue
    )
  }
}

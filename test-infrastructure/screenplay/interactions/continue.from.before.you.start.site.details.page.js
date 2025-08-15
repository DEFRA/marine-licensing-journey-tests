import Task from '../base/task.js'
import { BeforeYouStartSiteDetailsPageInteractions } from '../page-interactions'

export default class ContinueFromBeforeYouStartSiteDetailsPage extends Task {
  async performAs(actor) {
    const browseTheWeb = actor.ability
    await BeforeYouStartSiteDetailsPageInteractions.clickContinue(browseTheWeb)
  }

  static now() {
    return new ContinueFromBeforeYouStartSiteDetailsPage()
  }
}

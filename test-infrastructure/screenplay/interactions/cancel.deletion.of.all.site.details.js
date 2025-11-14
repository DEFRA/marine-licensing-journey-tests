import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import DeleteAllSiteDetailsPage from '../../pages/delete.all.site.details.page.js'
import Task from '../base/task.js'
import { Click } from './index.js'

export default class CancelDeletionOfAllSiteDetails extends Task {
  static now() {
    return new CancelDeletionOfAllSiteDetails()
  }

  async performAs(actor) {
    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.deleteAllSiteDetailsLink)
    )
    await actor.attemptsTo(Click.on(DeleteAllSiteDetailsPage.cancelLink))
  }
}

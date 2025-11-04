import ReviewSiteDetailsPage from '../../pages/review.site.details.page.js'
import Task from '../base/task.js'
import ActivityDescriptionModel from '../models/activity.description.model.js'
import CompleteActivityDescription from '../tasks/complete.activity.description.js'
import { Click } from './index.js'

export default class ChangeProjectLevelActivityDescription extends Task {
  static now() {
    return new ChangeProjectLevelActivityDescription()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    const newActivityDescription =
      ActivityDescriptionModel.generateActivityDescription()

    exemption.activityDescription = newActivityDescription

    await actor.attemptsTo(
      Click.on(ReviewSiteDetailsPage.activityDescriptionChangeLink)
    )
    await actor.attemptsTo(CompleteActivityDescription.now())
  }
}

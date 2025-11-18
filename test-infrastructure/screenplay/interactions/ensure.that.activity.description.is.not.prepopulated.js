import ActivityDescriptionPage from '../../pages/activity.description.page.js'
import Task from '../base/task.js'

export default class EnsureThatActivityDescriptionIsNotPrepopulated extends Task {
  static now() {
    return new EnsureThatActivityDescriptionIsNotPrepopulated()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.expectInputToBeEmpty(
      ActivityDescriptionPage.activityDescriptionInput
    )
  }
}

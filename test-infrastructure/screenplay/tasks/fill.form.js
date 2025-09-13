import Task from '../base/task.js'

import ActivityDescriptionPage from '~/test-infrastructure/pages/activity.description.page'

export default class FillForm extends Task {
  static activityDescription(description) {
    return new FillForm(async (actor) => {
      const browseTheWeb = actor.ability

      if (description && description.length > 0) {
        await browseTheWeb.sendKeys(
          ActivityDescriptionPage.activityDescriptionInput,
          description
        )
      }
    })
  }

  constructor(formFiller) {
    super()
    this.formFiller = formFiller
  }

  async performAs(actor) {
    await this.formFiller(actor)
  }
}

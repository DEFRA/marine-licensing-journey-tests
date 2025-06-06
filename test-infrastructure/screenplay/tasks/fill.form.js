import Task from '../base/task.js'

import ActivityDescriptionPage from '~/test-infrastructure/pages/activity.description.page'
import PublicRegisterPage from '~/test-infrastructure/pages/public.register.page'

export default class FillForm extends Task {
  static withInteractions(formFiller) {
    return new FillForm(formFiller)
  }

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

  static publicRegisterWithhold(reason) {
    return new FillForm(async (actor) => {
      const browseTheWeb = actor.ability

      await browseTheWeb.click(PublicRegisterPage.withhold)

      if (reason && reason.length > 0) {
        await browseTheWeb.sendKeys(PublicRegisterPage.withholdReason, reason)
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

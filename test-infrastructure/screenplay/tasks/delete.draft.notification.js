import DeleteProjectPage from '~/test-infrastructure/pages/delete.project.page.js'
import Task from '../base/task.js'
import ClickDeleteLink from '../interactions/click.delete.link.js'
import Click from '../interactions/click.js'

export default class DeleteDraftNotification extends Task {
  static withProjectName(projectName) {
    return new DeleteDraftNotification(projectName)
  }

  constructor(projectName) {
    super()
    this.projectName = projectName
  }

  async performAs(actor) {
    await actor.attemptsTo(
      ClickDeleteLink.forExemptionWithProjectName(this.projectName)
    )
    await actor.attemptsTo(Click.on(DeleteProjectPage.locators.deleteButton))
  }
}

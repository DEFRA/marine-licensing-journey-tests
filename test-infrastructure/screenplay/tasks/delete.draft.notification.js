import Task from '../base/task.js'
import ClickDeleteLink from '../interactions/click.delete.link.js'
import ConfirmDeleteProject from '../interactions/confirm.delete.project.js'

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
    await actor.attemptsTo(ConfirmDeleteProject.now())
  }
}

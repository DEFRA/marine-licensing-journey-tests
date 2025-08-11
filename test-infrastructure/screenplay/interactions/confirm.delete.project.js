import DeleteProjectPage from '~/test-infrastructure/pages/delete.project.page.js'
import Task from '../base/task.js'

export default class ConfirmDeleteProject extends Task {
  static now() {
    return new ConfirmDeleteProject()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.click(DeleteProjectPage.locators.deleteButton)
  }
}

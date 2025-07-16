import TaskListPage from '~/test-infrastructure/pages/task.list.page'
import Task from '../../base/task.js'

export default class ClickReviewAndSend extends Task {
  static now() {
    return new ClickReviewAndSend()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const selectors = TaskListPage.getReviewAndSendButton()

    try {
      await browseTheWeb.click(selectors.primary)
    } catch (error) {
      await browseTheWeb.click(selectors.fallback)
    }
  }
}

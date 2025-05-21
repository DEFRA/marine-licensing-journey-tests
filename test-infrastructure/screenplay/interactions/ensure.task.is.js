import Task from '../tasks/task'
import TaskListPage from '~/test-infrastructure/pages/task.list.page'

export default class EnsureTaskStatus extends Task {
  static is(taskName, expectation) {
    return new EnsureTaskStatus(taskName, expectation)
  }

  constructor(taskName, expectation) {
    super()
    this.taskName = taskName
    this.expectation = expectation
  }

  async performAs(actor) {
    await actor.ability.expectElementToContainText(
      TaskListPage.getTaskStatus(this.taskName),
      this.expectation
    )
  }
}

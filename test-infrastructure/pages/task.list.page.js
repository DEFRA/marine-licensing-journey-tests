export default class TaskListPage {
  static getTaskStatus(taskName) {
    return `//a[contains(text(), "${taskName}")]/ancestor::li//div[contains(@class, "govuk-task-list__status")]`
  }

  static getTaskLink(taskName) {
    return `//a[normalize-space(text()) = "${taskName}"]`
  }
}

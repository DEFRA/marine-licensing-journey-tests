export default class TaskListPage {
  static url = '/task-list'

  static getTaskStatus(taskName) {
    return {
      primary: `//a[normalize-space(text()) = "${taskName}"]/ancestor::li//div[contains(@class, "govuk-task-list__status")]`,
      fallback: `//a[contains(text(), "${taskName}")]/ancestor::li//div[contains(@class, "govuk-task-list__status")]`
    }
  }

  static getTaskLink(taskName) {
    return {
      primary: `//a[normalize-space(text()) = "${taskName}"]`,
      fallback: `//a[contains(normalize-space(text()), "${taskName}")]`
    }
  }

  static getReviewAndSendButton() {
    return {
      primary: `//a[normalize-space(text()) = "Review and send your information"]`,
      fallback: `#review-and-send`
    }
  }
}

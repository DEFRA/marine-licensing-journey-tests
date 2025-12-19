// Reuses locators from test-infrastructure/pages/task.list.page.js
export class TaskListPage {
  static selectors = {
    taskLink: (taskName) => `//a[normalize-space(text()) = "${taskName}"]`,
    reviewAndSendButton:
      '//a[normalize-space(text()) = "Review and send your information"]',
    taskStatus: (taskName) =>
      `//a[normalize-space(text()) = "${taskName}"]/ancestor::li//div[contains(@class, "govuk-task-list__status")]`
  }

  static async clickTask(page, taskName) {
    await page.click(this.selectors.taskLink(taskName))
  }

  static async clickReviewAndSend(page) {
    await page.click(this.selectors.reviewAndSendButton)
  }

  static async verifyTaskStatus(page, taskName, expectedStatus) {
    const statusLocator = page.locator(this.selectors.taskStatus(taskName))
    await expect(statusLocator).toContainText(expectedStatus)
  }
}

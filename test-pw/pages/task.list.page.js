import { expect } from '@playwright/test'

export default class TaskListPage {
  static path = '/task-list'

  constructor(page) {
    this.page = page
  }

  getTaskStatus(taskName) {
    return this.page.locator(
      `//a[normalize-space(text()) = "${taskName}"]/ancestor::li//div[contains(@class, "govuk-task-list__status")]`
    )
  }

  getTaskLink(taskName) {
    return this.page.locator(`//a[normalize-space(text()) = "${taskName}"]`)
  }

  getReviewAndSendButton() {
    return this.page.locator(
      '//a[normalize-space(text()) = "Review and send your information"]'
    )
  }

  async selectTask(taskName) {
    await this.getTaskLink(taskName).click()
  }

  async expectTaskStatus(taskName, status) {
    await expect(this.getTaskStatus(taskName)).toContainText(status)
  }
}

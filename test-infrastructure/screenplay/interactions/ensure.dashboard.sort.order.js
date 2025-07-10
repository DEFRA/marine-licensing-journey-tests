import DashboardPage from '../../pages/dashboard.page.js'
import Task from '../base/task.js'
import { expect } from 'chai'

export default class EnsureDashboardSortOrder extends Task {
  static now() {
    return new EnsureDashboardSortOrder()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const rowCount = await browseTheWeb.countElements(
      DashboardPage.locators.tableRows
    )

    if (rowCount === 0) {
      expect.fail(
        'No notifications found in dashboard table for sort order verification'
      )
    }

    const notifications = []
    for (let i = 0; i < rowCount; i++) {
      const nameSelector = `tbody tr:nth-child(${i + 1}) td:nth-child(1)`
      const statusSelector = `tbody tr:nth-child(${i + 1}) td:nth-child(4)`

      const name = await browseTheWeb.getText(nameSelector)
      const status = await browseTheWeb.getText(statusSelector)

      notifications.push({ name: name.trim(), status: status.trim() })
    }

    this.verifySortOrder(notifications)
  }

  verifySortOrder(notifications) {
    const drafts = notifications.filter((n) => n.status === 'Draft')
    const closed = notifications.filter((n) => n.status === 'Closed')

    const draftIndices = notifications
      .map((n, i) => (n.status === 'Draft' ? i : -1))
      .filter((i) => i !== -1)
    const closedIndices = notifications
      .map((n, i) => (n.status === 'Closed' ? i : -1))
      .filter((i) => i !== -1)

    if (draftIndices.length > 0 && closedIndices.length > 0) {
      const lastDraftIndex = Math.max(...draftIndices)
      const firstClosedIndex = Math.min(...closedIndices)

      if (lastDraftIndex > firstClosedIndex) {
        expect.fail(
          'Sort order incorrect: Draft notifications should appear before Closed notifications'
        )
      }
    }

    this.verifyAlphabeticalOrder(drafts, 'Draft')
    this.verifyAlphabeticalOrder(closed, 'Closed')
  }

  verifyAlphabeticalOrder(notifications, status) {
    if (notifications.length <= 1) return

    for (let i = 0; i < notifications.length - 1; i++) {
      const current = notifications[i].name.toLowerCase()
      const next = notifications[i + 1].name.toLowerCase()

      if (current > next) {
        expect.fail(
          `Sort order incorrect within ${status} status: "${notifications[i].name}" should come after "${notifications[i + 1].name}"`
        )
      }
    }
  }
}

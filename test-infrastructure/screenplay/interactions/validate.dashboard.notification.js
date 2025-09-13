import { expect } from 'chai'
import Task from '../base/task.js'

export default class ValidateDashboardNotification extends Task {
  static matches(expectedValues) {
    return new ValidateDashboardNotification(expectedValues)
  }

  constructor(expectedValues) {
    super()
    this.expectedValues = expectedValues
  }

  async performAs(actor) {
    const notifications = actor.recalls('dashboardNotifications')
    if (!notifications || notifications.length === 0) {
      expect.fail(
        'No dashboard notifications found in memory. Call ReadDashboardNotifications.all() first.'
      )
    }

    // Find notification by name or use first one
    const notification = this.expectedValues.name
      ? notifications.find((n) => n.name === this.expectedValues.name)
      : notifications[0]

    if (!notification) {
      expect.fail(
        `Notification with name "${this.expectedValues.name}" not found in dashboard`
      )
    }

    this.validateNotification(notification)
  }

  validateNotification(notification) {
    if (this.expectedValues.name) {
      expect(notification.name).to.equal(
        this.expectedValues.name,
        `Expected name "${this.expectedValues.name}" but got "${notification.name}"`
      )
    }

    if (this.expectedValues.type) {
      expect(notification.type).to.equal(
        this.expectedValues.type,
        `Expected type "${this.expectedValues.type}" but got "${notification.type}"`
      )
    }

    if (this.expectedValues.reference) {
      expect(notification.reference).to.equal(
        this.expectedValues.reference,
        `Expected reference "${this.expectedValues.reference}" but got "${notification.reference}"`
      )
    }

    if (this.expectedValues.status) {
      expect(notification.status).to.equal(
        this.expectedValues.status,
        `Expected status "${this.expectedValues.status}" but got "${notification.status}" for notification "${notification.name}"`
      )
    }

    if (this.expectedValues.dateSubmitted) {
      expect(notification.dateSubmitted).to.equal(
        this.expectedValues.dateSubmitted,
        `Expected date submitted "${this.expectedValues.dateSubmitted}" but got "${notification.dateSubmitted}"`
      )
    }
  }
}

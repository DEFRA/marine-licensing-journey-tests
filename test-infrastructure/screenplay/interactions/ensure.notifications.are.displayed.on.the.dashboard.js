import { expect } from 'chai'
import { format } from 'date-fns'
import DashboardPage from '~/test-infrastructure/pages/dashboard.page.js'
import Task from '../base/task.js'

export default class EnsureNotificationsAreDisplayedOnTheDashboard extends Task {
  static correctly() {
    return new EnsureNotificationsAreDisplayedOnTheDashboard()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    const rowCount = await browseTheWeb.countElements(
      DashboardPage.locators.tableRows
    )

    if (rowCount === 0) {
      expect.fail('No notifications found in dashboard table')
    }

    // Read all notifications from the table
    const tableNotifications = await this.readAllTableRows(
      browseTheWeb,
      rowCount
    )

    // Get expected notifications from actor memory
    const completedExemptions = actor.recalls('completedExemptions') || []

    // Validate submitted notifications if they exist
    if (completedExemptions.length > 0) {
      this.validateSubmittedNotifications(
        tableNotifications,
        completedExemptions
      )
    }

    // Always validate all submitted notifications have "Active" status
    this.validateAllSubmittedNotificationsActive(tableNotifications)

    // Always validate all draft notifications have "Draft" status
    this.validateAllDraftNotificationsDraft(tableNotifications)
  }

  async readAllTableRows(browseTheWeb, rowCount) {
    const notifications = []
    for (let i = 0; i < rowCount; i++) {
      const rowNumber = i + 1
      const nameSelector = `tbody tr:nth-child(${rowNumber}) td:nth-child(1)`
      const typeSelector = `tbody tr:nth-child(${rowNumber}) td:nth-child(2)`
      const referenceSelector = `tbody tr:nth-child(${rowNumber}) td:nth-child(3)`
      const statusSelector = `tbody tr:nth-child(${rowNumber}) td:nth-child(4)`
      const dateSubmittedSelector = `tbody tr:nth-child(${rowNumber}) td:nth-child(5)`

      const [name, type, reference, status, dateSubmitted] = await Promise.all([
        browseTheWeb.getText(nameSelector),
        browseTheWeb.getText(typeSelector),
        browseTheWeb.getText(referenceSelector),
        browseTheWeb.getText(statusSelector),
        browseTheWeb.getText(dateSubmittedSelector)
      ])

      notifications.push({
        name: name.trim(),
        type: type.trim(),
        reference: reference.trim(),
        status: status.trim(),
        dateSubmitted: dateSubmitted.trim(),
        isSubmitted: reference.trim() !== '-'
      })
    }
    return notifications
  }

  validateSubmittedNotifications(tableNotifications, completedExemptions) {
    const latestExemption = completedExemptions[completedExemptions.length - 1]
    const matchingNotification = tableNotifications.find(
      (n) => n.name === latestExemption.projectName && n.isSubmitted
    )

    if (!matchingNotification) {
      expect.fail(
        `Could not find submitted notification for project "${latestExemption.projectName}"`
      )
    }

    expect(matchingNotification.type).to.equal('Exempt activity notification')
    expect(matchingNotification.reference).to.equal(
      latestExemption.applicationReference
    )
    expect(matchingNotification.status).to.equal('Active')

    const today = format(new Date(), 'd MMM yyyy')
    expect(matchingNotification.dateSubmitted).to.equal(today)
  }

  validateAllDraftNotificationsDraft(tableNotifications) {
    const draftNotifications = tableNotifications.filter((n) => !n.isSubmitted)

    draftNotifications.forEach((notification) => {
      expect(notification.status).to.equal(
        'Draft',
        `Draft notification "${notification.name}" should have "Draft" status but has "${notification.status}"`
      )
      expect(notification.reference).to.equal('-')
    })

    if (draftNotifications.length > 0) {
      console.log(
        `✓ Validated ${draftNotifications.length} draft notification(s) all have "Draft" status`
      )
    }
  }

  validateAllSubmittedNotificationsActive(tableNotifications) {
    const submittedNotifications = tableNotifications.filter(
      (n) => n.isSubmitted
    )

    submittedNotifications.forEach((notification) => {
      expect(notification.status).to.equal(
        'Active',
        `Submitted notification "${notification.name}" (${notification.reference}) should have "Active" status but has "${notification.status}"`
      )
    })

    if (submittedNotifications.length > 0) {
      console.log(
        `✓ Validated ${submittedNotifications.length} submitted notification(s) all have "Active" status`
      )
    }
  }
}

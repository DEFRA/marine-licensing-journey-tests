import { expect } from 'chai'
import { ActivityDatesPage } from '../../../test-infrastructure/pages/index.js'
import Task from '../base/task.js'
import { ERROR_MESSAGES } from '../constants/error-messages.js'
import Memory from '../memory.js'

export default class CompleteActivityDates extends Task {
  constructor(actionType = 'saveAndContinue') {
    super()
    this.actionType = actionType
  }

  static now() {
    return new CompleteActivityDates()
  }

  async performAs(actor) {
    const exemption = actor.recalls('exemption')
    if (!exemption) {
      expect.fail(ERROR_MESSAGES.MISSING_EXEMPTION('activity description'))
    }
    const activityDates =
      exemption.siteDetails?.sites?.[0]?.activityDates ||
      exemption.activityDates
    if (!activityDates) {
      expect.fail(ERROR_MESSAGES.MISSING_ACTIVITY_DATES)
    }

    await this.fillActivityDates(actor.ability, activityDates)
    await this.handleAction(actor)
  }

  async fillActivityDates(browseTheWeb, activityDates) {
    await browseTheWeb.sendKeys(
      ActivityDatesPage.activityStartDateDay,
      activityDates.startDate.day
    )
    await browseTheWeb.sendKeys(
      ActivityDatesPage.activityStartDateMonth,
      activityDates.startDate.month
    )
    await browseTheWeb.sendKeys(
      ActivityDatesPage.activityStartDateYear,
      activityDates.startDate.year
    )
    await browseTheWeb.sendKeys(
      ActivityDatesPage.activityEndDateDay,
      activityDates.endDate.day
    )
    await browseTheWeb.sendKeys(
      ActivityDatesPage.activityEndDateMonth,
      activityDates.endDate.month
    )
    await browseTheWeb.sendKeys(
      ActivityDatesPage.activityEndDateYear,
      activityDates.endDate.year
    )
  }

  async handleAction(actor) {
    const browseTheWeb = actor.ability
    switch (this.actionType) {
      case 'back':
        await browseTheWeb.click(ActivityDatesPage.backLink)
        break
      case 'cancel':
        await browseTheWeb.click(ActivityDatesPage.cancelLink)
        break
      case 'saveAndContinue':
      default:
        await browseTheWeb.click(ActivityDatesPage.saveAndContinueButton)
        actor.updates(Memory.markTaskCompleted('activityDates'))
        break
    }
  }
}

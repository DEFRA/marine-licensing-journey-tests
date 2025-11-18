import ActivityDatesPage from '../../pages/activity.dates.page.js'
import Task from '../base/task.js'

export default class EnsureThatActivityDatesAreNotPrepopulated extends Task {
  static now() {
    return new EnsureThatActivityDatesAreNotPrepopulated()
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability

    await browseTheWeb.expectInputToBeEmpty(
      ActivityDatesPage.activityStartDateDay
    )
    await browseTheWeb.expectInputToBeEmpty(
      ActivityDatesPage.activityStartDateMonth
    )
    await browseTheWeb.expectInputToBeEmpty(
      ActivityDatesPage.activityStartDateYear
    )
    await browseTheWeb.expectInputToBeEmpty(
      ActivityDatesPage.activityEndDateDay
    )
    await browseTheWeb.expectInputToBeEmpty(
      ActivityDatesPage.activityEndDateMonth
    )
    await browseTheWeb.expectInputToBeEmpty(
      ActivityDatesPage.activityEndDateYear
    )
  }
}

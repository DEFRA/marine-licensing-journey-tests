import ActivityDatesPage from '~/test-infrastructure/pages/activity.dates.page.js'
import CommonElementsPage from '~/test-infrastructure/pages/common.elements.page.js'

export default class ActivityDatesPageInteractions {
  static async enterActivityDatesAndContinue(browseTheWeb, activityDates) {
    await browseTheWeb.setValue(
      ActivityDatesPage.activityStartDateDay,
      activityDates.startDate.day
    )
    await browseTheWeb.setValue(
      ActivityDatesPage.activityStartDateMonth,
      activityDates.startDate.month
    )
    await browseTheWeb.setValue(
      ActivityDatesPage.activityStartDateYear,
      activityDates.startDate.year
    )
    await browseTheWeb.setValue(
      ActivityDatesPage.activityEndDateDay,
      activityDates.endDate.day
    )
    await browseTheWeb.setValue(
      ActivityDatesPage.activityEndDateMonth,
      activityDates.endDate.month
    )
    await browseTheWeb.setValue(
      ActivityDatesPage.activityEndDateYear,
      activityDates.endDate.year
    )
    const button = await browseTheWeb.browser.$('button[type="submit"]')
    await button.click()
  }

  static async clickCancel(browseTheWeb) {
    await browseTheWeb.click(CommonElementsPage.cancelLink)
  }
}

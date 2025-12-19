// Reuses locators from test-infrastructure/pages/activity.dates.page.js
export class ActivityDatesPage {
  static selectors = {
    startDateDay: '#activity-start-date-day',
    startDateMonth: '#activity-start-date-month',
    startDateYear: '#activity-start-date-year',
    endDateDay: '#activity-end-date-day',
    endDateMonth: '#activity-end-date-month',
    endDateYear: '#activity-end-date-year',
    saveAndContinue: 'button[type="submit"]'
  }

  static async enterDates(page, startDate, endDate) {
    await page.fill(this.selectors.startDateDay, startDate.day.toString())
    await page.fill(this.selectors.startDateMonth, startDate.month.toString())
    await page.fill(this.selectors.startDateYear, startDate.year.toString())
    await page.fill(this.selectors.endDateDay, endDate.day.toString())
    await page.fill(this.selectors.endDateMonth, endDate.month.toString())
    await page.fill(this.selectors.endDateYear, endDate.year.toString())
  }

  static async clickSaveAndContinue(page) {
    await page.click(this.selectors.saveAndContinue)
  }
}

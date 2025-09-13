import NotificationSummaryBasePage from './notification.summary.base.page.js'

export default class ViewDetailsPage extends NotificationSummaryBasePage {
  static url = '/exemption/view-details'

  static locators = {
    // Inherit all shared locators
    ...NotificationSummaryBasePage.sharedLocators,

    // View Details specific locators
    mainHeading: 'h1#view-details-heading'
  }
}
